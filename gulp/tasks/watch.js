/* Notes:
   Watches the source files for changes, then calls the needed task.
   The browser-sync module reloads the browser with the compiled files.
*/

const browserSync = require( 'browser-sync' ).create();
const config = require( '../config' );
const gulp = require( 'gulp' );

gulp.task( 'watch:scripts', done => {
  gulp.watch(
    [ config.test.src, config.demoScripts.src ],
    gulp.series( 'scripts', 'test:unit' )
  ).on( 'change', browserSync.reload );
  done();
} );

gulp.task( 'watch:styles', done => {
  gulp.watch(
    [
      config.styles.cwd + '/*.less',
      config.demoStyles.cwd + config.demoStyles.src
    ],
    gulp.series( 'styles' )
  );
  done();
} );

gulp.task( 'watch:tests', done => {
  gulp.watch( config.test.unit, gulp.series( 'test:unit' ) );
  done();
} );

/**
 * browserSyncInit - Initialize browser sync
 *
 * @param {type} done Async callback
 */
function browserSyncInit( done ) {
  const browserSyncSettings = {
    proxy: 'localhost:8081',
    port: 5000,
    files: [ './dist' ],
    notify: true
  };

  // eslint-disable-next-line no-sync
  browserSync.init( browserSyncSettings );
  done();
}

gulp.task( 'watch',
  gulp.parallel(
    'watch:scripts',
    'watch:styles',
    'watch:tests',
    browserSyncInit
  )
);
