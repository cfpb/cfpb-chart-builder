'use strict';

var gulp = require( 'gulp' );
var gulpEslint = require( 'gulp-eslint' );
var gulpUtil = require( 'gulp-util' );
var configLint = require( '../config' ).lint;
var handleErrors = require( '../utils/handle-errors' );
var minimist = require( 'minimist' );

/**
 * Generic lint a script source.
 * @param {string} src The path to the source JavaScript.
 * @returns {Object} An output stream from gulp.
 */
function _genericLint( src ) {
  // Pass all command line flags to EsLint.
  const options = minimist( process.argv.slice( 2 ) );

  return gulp.src( src, { base: './' } )
    .pipe( gulpEslint( options ) )
    .pipe( gulpEslint.format() )
    .pipe( ( () => {
      if ( options.travis ) {
        return gulpEslint.failAfterError();
      }

      return gulpUtil.noop();
    } )( ) )
    .pipe( gulp.dest( './' ) )
    .on( 'error', handleErrors );
}

/**
 * Lints the gulpfile for errors
 */
gulp.task( 'lint:build', function() {
  return _genericLint( configLint.gulp );
} );

/**
 * Lints the source js files for errors
 */
gulp.task( 'lint:scripts', function() {
  return _genericLint( configLint.src );
} );

/**
 * Lints all the js files for errors
 */
gulp.task( 'lint', [
  'lint:build',
  'lint:scripts'
] );
