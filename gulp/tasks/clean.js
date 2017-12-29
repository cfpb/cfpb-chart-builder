const gulp = require( 'gulp' );
const del = require( 'del' );
const configClean = require( '../config' ).clean;

gulp.task( 'clean', function() {
  del( configClean.dest );
} );
