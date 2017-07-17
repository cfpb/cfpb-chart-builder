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
  // Grab the --fix flag from the command-line, if available.
  const commandLineParams = minimist( process.argv.slice( 2 ) );
  const willFix = commandLineParams.fix || false;

  return gulp.src( src, { base: './' } )
    .pipe( gulpEslint( { fix: willFix } ) )
    .pipe( gulpEslint.format() )
    .pipe( ( () => {
      if ( commandLineParams.travis ) {
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
