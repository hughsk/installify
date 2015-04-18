var spawn = require('child_process').spawn
var resolve = require('browser-resolve')
var detective = require('detective')
var through = require('through')
var map = require('map-async')
var path = require('path')

module.exports = installify

function truthy(a) { return a }

function installify(filename) {
  var stream = through(write, resolver)
  var buffer = ''

  function write(data) {
    buffer += data
  }

  function resolver() {
    var requires
    try {
      requires = detective(buffer)
    } catch (e) {
      stream.emit('error', e)
      return
    }

    var deps = requires.filter(function(pkg) {
      return pkg[0] !== '.' && pkg[0] !== '/'
    })

    map(deps, function(pkg, next) {
      pkg = pkg.replace(/\/.*$/g, '')

      resolve(pkg, {
        filename: filename
      }, function(err, path) {
        return next(err, path ? false : pkg)
      })
    }, function(err, deps) {
      if (err) return stream.emit('error')

      var dir = path.dirname(filename)
      deps = deps.filter(truthy)

      install(dir, deps)
    })
  }

  function install(dir, deps) {
    var deptext = ''
    var args = ['install'].concat(deps)
    var cmd = process.platform === 'win32'
        ? 'npm.cmd'
        : 'npm'

    if (!deps.length) {
      stream.queue(buffer)
      return stream.queue(null)
    }

    var proc = spawn(cmd, args, {
        cwd: dir
      , env: process.env
    })

    proc.stdout.on('data', function(data) {
      deptext += data
    })

    proc.once('exit', function() {
      if (deptext) {
        stream.queue('console.log("new dependencies installed:\\n" +')
        stream.queue(JSON.stringify(deptext))
        stream.queue(');\n')
      }
      stream.queue(buffer)
      stream.queue(null)
    })
  }

  return stream
}
