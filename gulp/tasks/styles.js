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

gulp.task( 'styles:chartsConcat', function() {
  return gulp.src( config.chartStyles.cwd + config.chartStyles.src )
    .pipe( plugins.sourcemaps.init() )
    .pipe( plugins.less(
    {

        paths: config.chartStyles.settings.paths,
        compress: false

      }
       ) )
    .on( 'error', handleErrors )
    .pipe( plugins.autoprefixer( {
      browsers: [ 'last 2 version',
                  'not ie <= 8',
                  'android 4',
                  'BlackBerry 7',
                  'BlackBerry 10' ]
    } ) )
    .pipe( gulp.dest( config.chartStyles.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
} );

gulp.task( 'styles:chartsMinify', function() {
  return gulp.src( config.chartStyles.cwd + config.chartStyles.src )
    .pipe( plugins.sourcemaps.init() )
    .pipe( plugins.less( config.chartStyles.settings ) )
    .on( 'error', handleErrors )
    .pipe( plugins.autoprefixer( {
      browsers: [ 'last 2 version',
                  'not ie <= 8',
                  'android 4',
                  'BlackBerry 7',
                  'BlackBerry 10' ]
    } ) )
    .pipe( plugins.rename( {
      suffix: '.min'
    } ) )
    .pipe( gulp.dest( config.chartStyles.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
} );

gulp.task( 'styles:demo', function() {
  return gulp.src( config.styles.demo.src )
    .pipe( plugins.sourcemaps.init() )
    .pipe( plugins.less(
    {

        paths: config.chartStyles.settings.paths,
        compress: false

      }
       ) )
    .on( 'error', handleErrors )
    .pipe( plugins.autoprefixer( {
      browsers: [ 'last 2 version',
                  'not ie <= 8',
                  'android 4',
                  'BlackBerry 7',
                  'BlackBerry 10' ]
    } ) )
    .pipe( gulp.dest( config.styles.demo.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
} );

gulp.task( 'styles', [
  'styles:chartsConcat',
  'styles:chartsMinify',
  'styles:demo'
] );
