'use strict';

var configTest = require( '../config' ).test;
var gulp = require( 'gulp' );
var gulpIstanbul = require( 'gulp-istanbul' );
var gulpMocha = require( 'gulp-mocha' );

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

        .pipe( gulpIstanbul.enforceThresholds( {
          thresholds: { global: 90 }
        } ) )

        .on( 'end', cb );
    } );
}

gulp.task( 'test:unit', testUnitScripts );

gulp.task( 'test',
  [
    'lint',
    'test:unit'
  ]
);

gulp.task( 'test:browser', function() {
  testBrowserSauceLabs();
} );
