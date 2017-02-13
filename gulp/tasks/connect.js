'use strict';

var gulp = require( 'gulp' );
var connect = require( 'gulp-connect' );

gulp.task( 'connect', function() {
  connect.server( {
    port: 8081,
    root: 'dist'
  } );
} );

gulp.task( 'default', [ 'connect' ] );
