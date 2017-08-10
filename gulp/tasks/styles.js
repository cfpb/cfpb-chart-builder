'use strict';

var gulp = require( 'gulp' );
var gulpAutoprefixer = require( 'gulp-autoprefixer' );
var gulpCssmin = require( 'gulp-cssmin' );
var gulpHeader = require( 'gulp-header' );
var gulpLess = require( 'gulp-less' );
var gulpSourcemaps = require( 'gulp-sourcemaps' );
var gulpRename = require( 'gulp-rename' );
var gulpUglify = require( 'gulp-uglify' );
var mqr = require( 'gulp-mq-remove' );
var config = require( '../config' );
var configPkg = config.pkg;
var configBanner = config.banner;
var handleErrors = require( '../utils/handle-errors' );
var browserSync = require( 'browser-sync' );

gulp.task( 'styles:demo', function() {
  return gulp.src( config.demoStyles.cwd + config.demoStyles.src )
    .pipe( gulpSourcemaps.init() )
    .pipe( gulpLess( config.demoStyles.settings ) )
    .on( 'error', handleErrors )
    .pipe( gulpAutoprefixer( {
      browsers: [
        'last 2 version',
        'not ie <= 8',
        'android 4',
        'BlackBerry 7',
        'BlackBerry 10' ]
    } ) )
    .pipe( gulpHeader( configBanner, { pkg: configPkg } ) )
    .pipe( gulpSourcemaps.write( '.' ) )
    .pipe( gulp.dest( config.demoStyles.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
} );

/**
 * Process legacy CSS for IE9 only.
 * @returns {PassThrough} A source stream.
 */
function demoStylesIE9() {
  return gulp.src( config.demoStyles.cwd + config.demoStyles.src )
    .pipe( gulpLess( config.demoStyles.settings ) )
    .on( 'error', handleErrors )
    .pipe( gulpAutoprefixer( {
      browsers: [ 'ie 9' ]
    } ) )
    .pipe( gulpCssmin() )
    .pipe( gulpRename( {
      suffix:  '.ie9',
      extname: '.css'
    } ) )
    .pipe( gulp.dest( config.demoStyles.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
}
gulp.task( 'styles:demoStylesIE9', demoStylesIE9 );

gulp.task( 'styles:demoStylesIE8', function() {
  return gulp.src( config.demoStyles.cwd + config.demoStyles.src )
    .pipe( gulpLess( config.demoStyles.settings ) )
    .on( 'error', handleErrors )
    .pipe( gulpAutoprefixer( {
      browsers: [ 'ie 7-8' ]
    } ) )
    .pipe( mqr( {
      width: '75em'
    } ) )
    .pipe( gulpCssmin() )
    .pipe( gulpRename( {
      suffix:  '.ie8',
      extname: '.css'
    } ) )
    .pipe( gulp.dest( config.demoStyles.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
} );

gulp.task( 'styles:chartsConcat', function() {
  return gulp.src( config.styles.cwd + config.styles.src )
    .pipe( gulpSourcemaps.init() )
    .pipe( gulpLess( {
      paths: config.styles.settings.paths,
      compress: false
    } ) )
    .on( 'error', handleErrors )
    .pipe( gulpAutoprefixer( {
      browsers: [
        'last 2 version',
        'not ie <= 8',
        'android 4',
        'BlackBerry 7',
        'BlackBerry 10' ]
    } ) )
    .pipe( gulp.dest( config.styles.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
} );

gulp.task( 'styles:chartsMinify', function() {
  return gulp.src( config.styles.cwd + config.styles.src )
    .pipe( gulpSourcemaps.init() )
    .pipe( gulpLess( config.styles.settings ) )
    .on( 'error', handleErrors )
    .pipe( gulpAutoprefixer( {
      browsers: [
        'last 2 version',
        'not ie <= 8',
        'android 4',
        'BlackBerry 7',
        'BlackBerry 10' ]
    } ) )
    .pipe( gulpRename( {
      suffix: '.min'
    } ) )
    .pipe( gulp.dest( config.styles.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
} );

gulp.task( 'styles:demoIE', [
  'styles:demoStylesIE8',
  'styles:demoStylesIE9'
] );

gulp.task( 'styles:charts', [
  'styles:chartsConcat',
  'styles:chartsMinify'
] );

gulp.task( 'styles', [
  'styles:demo',
  'styles:demoIE',
  'styles:charts'
] );
