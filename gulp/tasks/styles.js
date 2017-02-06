'use strict';

var gulp = require( 'gulp' );
var plugins = require( 'gulp-load-plugins' )();
var mqr = require( 'gulp-mq-remove' );
var config = require( '../config' );
var configPkg = config.pkg;
var configBanner = config.banner;
var configStyles = config.styles;
var handleErrors = require( '../utils/handle-errors' );
var browserSync = require( 'browser-sync' );

gulp.task( 'styles:modern', function() {
  return gulp.src( configStyles.cwd + configStyles.src )
    .pipe( plugins.sourcemaps.init() )
    .pipe( plugins.less( configStyles.settings ) )
    .on( 'error', handleErrors )
    .pipe( plugins.autoprefixer( {
      browsers: [ 'last 2 version',
                  'not ie <= 8',
                  'android 4',
                  'BlackBerry 7',
                  'BlackBerry 10' ]
    } ) )
    .pipe( plugins.header( configBanner, { pkg: configPkg } ) )
    .pipe( plugins.rename( {
      suffix: '.min'
    } ) )
    .pipe( plugins.sourcemaps.write( '.' ) )
    .pipe( gulp.dest( configStyles.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
} );

gulp.task( 'styles:ie', function() {
  return gulp.src( configStyles.cwd + configStyles.src )
    .pipe( plugins.less( configStyles.settings ) )
    .on( 'error', handleErrors )
    .pipe( plugins.autoprefixer( {
      browsers: [ 'ie 7-8' ]
    } ) )
    .pipe( mqr( {
      width: '75em'
    } ) )
    .pipe( plugins.cssmin() )
    .pipe( plugins.rename( {
      suffix:  '.ie',
      extname: '.css'
    } ) )
    .pipe( gulp.dest( configStyles.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
} );

gulp.task( 'styles', [
  'styles:modern',
  'styles:ie'
] );
