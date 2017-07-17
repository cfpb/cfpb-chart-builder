'use strict';

var gulp = require( 'gulp' );
var gulpChanged = require( 'gulp-changed' );
var gulpImagemin = require( 'gulp-imagemin' );
var configImages = require( '../config' ).images;
var handleErrors = require( '../utils/handle-errors' );
var browserSync = require( 'browser-sync' );

gulp.task( 'images', function() {
  return gulp.src( configImages.src )
    .pipe( gulpChanged( configImages.dest ) )
    .pipe( gulpImagemin() )
    .on( 'error', handleErrors )
    .pipe( gulp.dest( configImages.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
} );
