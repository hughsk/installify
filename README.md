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

Enjoy!
