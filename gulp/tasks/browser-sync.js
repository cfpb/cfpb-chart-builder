'use strict';

var gulp = require( 'gulp' );
var util = require( 'gulp-util' );
var browserSync = require( 'browser-sync' );
var cors = require( 'cors' );
var compression = require( 'compression' );

gulp.task( 'browserSync', function() {
  var port = util.env.port || '8081';
  browserSync.init( {
    proxy: 'localhost:' + port,
    middleware: [ compression(), cors() ]
  } );
} );
