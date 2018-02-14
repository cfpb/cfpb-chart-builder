/* Notes:
   - watch.js watches the source files for changes, then calls the needed task.
   - gulp/tasks/browserSync.js reloads the browser with the compiled files.
*/

const gulp = require( 'gulp' );
const config = require( '../config' );
const browserSync = require( 'browser-sync' ).create();

gulp.task( 'watch:scripts', function( done ) {
  gulp.watch( [ config.test.src, config.demoScripts.src ], gulp.series( 'scripts:concat', 'scripts:demo', 'test:unit' ) );
  done();
} );

gulp.task( 'watch:styles', function( done ) {
  gulp.watch( [ config.styles.cwd + config.styles.src, config.demoStyles.cwd + config.demoStyles.src ], gulp.series( 'styles' ) );
  done();
} );

gulp.task( 'watch:tests', function( done ) {
  gulp.watch( config.test.unit, gulp.series( 'test:unit' ) );
  done();
} );


/**
 * browserSyncInit - Initialize browser sync
 *
 * @param {type} done Async callback
 */
function browserSyncInit( done ) {
  browserSync.init( config.browserSync );
  done();
}

gulp.task( 'browser-sync', browserSyncInit );

gulp.task( 'watch', gulp.parallel( 'watch:scripts', 'watch:styles', 'watch:tests', 'connect', 'browser-sync' ) );
