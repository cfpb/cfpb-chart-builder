'use strict';

var configTest = require( '../config' ).test;
var gulp = require( 'gulp' );
var gulpIstanbul = require( 'gulp-istanbul' );
var gulpMocha = require( 'gulp-mocha' );
var gulpUtil = require( 'gulp-util' );
var spawn = require( 'child_process' ).spawn;

/**
 * Run Mocha JavaScript unit tests.
 * @param {Function} cb - Callback function to call on completion.
 */
function testUnitScripts( cb ) {
  gulp.src( configTest.src )
    .pipe( gulpIstanbul( {
      includeUntested: false
    } ) )
    .pipe( gulpIstanbul.hookRequire() )
    .on( 'finish', function() {
      gulp.src( configTest.tests + '/unit_tests/**/*.js' )
        .pipe( gulpMocha( {
          reporter: configTest.reporter ? 'spec' : 'nyan'
        } ) )
        .pipe( gulpIstanbul.writeReports( {
          dir: configTest.tests + '/unit_test_coverage'
        } ) )

        /* TODO: we want this but it breaks because we don't have good coverage
        .pipe( gulpIstanbul.enforceThresholds( {
          thresholds: { global: 90 }
        } ) )
        */

        .on( 'end', cb );
    } );
}



/**
 * Run the Sauce Labs browser tests.
 */
function testBrowserSauceLabs( ) {
  // TBA
  spawn(
    'echo "HELLO"'
    // 'CI_ENVIRONMENT=true node test/browser-tests.js'
    // [ paths.unprocessed + '/js',
    //   '--recurse',
    //   '--destination',
    //   './docs/scripts' ],
    // { stdio: 'inherit' }
  )
  .on('error', (err) => {
  console.log(err);
  });
  // .once( 'close', function() {
  //   gulpUtil.log( 'Sauce Labs browser tests finished!' );
  // } );
}

gulp.task( 'test:unit', testUnitScripts );

gulp.task( 'test',
  [
    'lint',
    'test:unit',
    'test:browser'
  ]
);

gulp.task( 'test:browser', function() {
  testBrowserSauceLabs();
} );
