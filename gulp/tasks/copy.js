const gulp = require( 'gulp' );
const gulpChanged = require( 'gulp-changed' );
const configCopy = require( '../config' ).copy;
const handleErrors = require( '../utils/handle-errors' );
const browserSync = require( 'browser-sync' );

gulp.task( 'copy:files', function() {
  const files = configCopy.files;
  return gulp.src( files.src )
    .pipe( gulpChanged( files.dest ) )
    .on( 'error', handleErrors )
    .pipe( gulp.dest( files.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
} );

gulp.task( 'copy:icons', function() {
  const icons = configCopy.icons;
  return gulp.src( icons.src )
    .pipe( gulpChanged( icons.dest ) )
    .on( 'error', handleErrors )
    .pipe( gulp.dest( icons.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
} );

gulp.task( 'copy:vendorjs', function() {
  const vendorJs = configCopy.vendorJs;
  return gulp.src( vendorJs.src )
    .pipe( gulpChanged( vendorJs.dest ) )
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
