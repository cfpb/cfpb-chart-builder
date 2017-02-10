'use strict';

var gulp = require( 'gulp' );
var plugins = require( 'gulp-load-plugins' )();
var configCopy = require( '../config' ).copy;
var handleErrors = require( '../utils/handle-errors' );
var browserSync = require( 'browser-sync' );

gulp.task( 'copy:files', function() {
  var files = configCopy.files;
  return gulp.src( files.src )
    .pipe( plugins.changed( files.dest ) )
    .on( 'error', handleErrors )
    .pipe( gulp.dest( files.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
} );

gulp.task( 'copy:icons', function() {
  var icons = configCopy.icons;
  return gulp.src( icons.src )
    .pipe( plugins.changed( icons.dest ) )
    .on( 'error', handleErrors )
    .pipe( gulp.dest( icons.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
} );

gulp.task( 'copy:vendorjs', function() {
  var vendorJs = configCopy.vendorJs;
  return gulp.src( vendorJs.src )
    .pipe( plugins.changed( vendorJs.dest ) )
    .on( 'error', handleErrors )
    .pipe( gulp.dest( vendorJs.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
} );

gulp.task( 'copy',
  [
    'copy:files',
    'copy:icons',
    'copy:vendorjs'
  ]
);
