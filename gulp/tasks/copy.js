'use strict';

var gulp = require( 'gulp' );
var plugins = require( 'gulp-load-plugins' )();
var configCopy = require( '../config' ).copy;
var handleErrors = require( '../utils/handle-errors' );
var browserSync = require( 'browser-sync' );

gulp.task( 'copy:html', function() {
  var html = configCopy.html;
  return gulp.src( html.src )
    .pipe( plugins.changed( html.dest ) )
    .on( 'error', handleErrors )
    .pipe( gulp.dest( html.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
} );

gulp.task( 'copy',
  [
    'copy:html'
  ]
);
