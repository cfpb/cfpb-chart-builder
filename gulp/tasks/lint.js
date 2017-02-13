'use strict';

var gulp = require( 'gulp' );
var plugins = require( 'gulp-load-plugins' )();
var configLint = require( '../config' ).lint;
var handleErrors = require( '../utils/handle-errors' );

/**
 * Lints the gulpfile for errors
 */
gulp.task( 'lint:build', function() {
  return gulp.src( configLint.gulp )
    .pipe( plugins.eslint() )
    .pipe( plugins.eslint.format() )
    .on( 'error', handleErrors );
} );

/**
 * Lints the source js files for errors
 */
gulp.task( 'lint:scripts', function() {
  return gulp.src( configLint.src )
    .pipe( plugins.eslint() )
    .pipe( plugins.eslint.format() )
    .on( 'error', handleErrors );
} );

/**
 * Lints all the js files for errors
 */
gulp.task( 'lint', [
  'lint:build',
  'lint:scripts'
] );
