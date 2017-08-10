'use strict';

var gulp = require( 'gulp' );
var connect = require( 'gulp-connect' );
var cors = require('cors');

gulp.task( 'connect', function() {
  connect.server( {
    port: 8081,
    root: ['test', 'dist'],
    middleware: function() {
      return [ cors() ];
    }
  } );
} );

gulp.task( 'default', [ 'connect' ] );
