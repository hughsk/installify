# installify #


A [browserify](http://browserify.org/) transform for the lazy JavaScripter: installify automatically installs missing dependencies when bundling for quick
and dirty prototyping.

## Installation ##

``` bash
npm install -g installify
```

## Usage ##

Just include `-t installify` when using browserify from the command-line:

``` bash
browserify -t installify index.js
```

If you want a really quick project, you should install
[beefy](http://github.com/chrisdickinson/beefy). Then starting a new project is
as simple as:

``` bash
npm init
touch index.js
beefy index.js -- -t installify
```

## Options ##

```
  --save-dev, -D       This will install a <package> in your devDependencies.
  --save-exact, -E     This installs the package as an exact version.
  --save-optional, -O  This will install a <package> in your optionalDependencies.
  --save, -S           save installs as a dependency
  --save-dev, -D       save installs as a devDependency
  --yarn               use yarn instead of npm
```

Please note when using yarn the `package.json` will always be updated.

## yarn add options ##

All [yarn add](https://yarnpkg.com/en/docs/cli/add) options are supported:

```
  --save-dev, -D       This will install a <package> in your devDependencies.
  --save-exact, -E     This installs the package as an exact version.
  --save-optional, -O  This will install a <package> in your optionalDependencies.
  --peer               This will install a <package> in your peerDependencies.
  --tilde              This installs the most recent release of the package that has the same minor version.
```

You can use the subarg syntax for CLI options, like this:

``` bash
beefy index.js -- -t [ installify --save ]
```

Enjoy!
