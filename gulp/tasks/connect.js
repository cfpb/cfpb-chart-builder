'use strict';

var gulp = require( 'gulp' );
var connect = require( 'gulp-connect' );
var cors = require( 'cors' );
var compression = require( 'compression' );

gulp.task( 'connect', function() {
  connect.server( {
    port: 8081,
    root: ['test', 'dist'],
    middleware: function() {
      return [ compression(), cors() ];
    }
  } );
} );

gulp.task( 'default', [ 'connect' ] );
