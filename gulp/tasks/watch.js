/* Notes:
   - watch.js watches the source files for changes, then calls the needed task.
   - gulp/tasks/browserSync.js reloads the browser with the compiled files.
*/

const gulp = require( 'gulp' );
const config = require( '../config' );

gulp.task( 'watch', [ 'connect', 'browserSync' ], function() {
  gulp.watch( [ config.test.src, config.demoScripts.src ], [ 'scripts:concat', 'scripts:demo', 'test:unit' ] );
  gulp.watch( config.styles.cwd + config.styles.src, [ 'styles' ] );
  gulp.watch( config.test.unit, [ 'test:unit' ] );
  gulp.watch( config.demoStyles.cwd + config.demoStyles.src, [ 'styles' ] );
} );
