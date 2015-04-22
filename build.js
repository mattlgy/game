var fs = require('fs')
var browserify = require('browserify')
var babelify = require('babelify')
var watchify = require('watchify')

var b = watchify(browserify({ cache: {}, packageCache: {}, fullPaths: true, debug: true }))
  .transform(babelify)
  .require(__dirname + '/src/index.js', { entry: true })
  .on('update', bundle)
  .on('log', console.log)

function bundle () {
  b.bundle()
  .on('error', function (err) { console.log('Error: ' + err.message) })
  .pipe(fs.createWriteStream(__dirname + '/assets/game.js'))
}

bundle()
