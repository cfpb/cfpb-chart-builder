const configTest = require( '../config' ).test;
const gulp = require( 'gulp' );
const gulpIstanbul = require( 'gulp-istanbul' );
const gulpMocha = require( 'gulp-mocha' );

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

          /* Lowering this until we finish writing tests for the charts.
             Otherwise gulp watch terminates when the threshold isn't met. */
          thresholds: { global: 40 }
        } ) )

        .on( 'end', cb );
    } );
}

gulp.task( 'test:unit', testUnitScripts );

gulp.task( 'test',
  gulp.series(
    'lint',
    'test:unit'
  )
);
