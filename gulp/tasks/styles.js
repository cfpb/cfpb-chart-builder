const gulp = require( 'gulp' );
const gulpAutoprefixer = require( 'gulp-autoprefixer' );
const gulpCssmin = require( 'gulp-cssmin' );
const gulpHeader = require( 'gulp-header' );
const gulpLess = require( 'gulp-less' );
const gulpSourcemaps = require( 'gulp-sourcemaps' );
const gulpRename = require( 'gulp-rename' );
const mqr = require( 'gulp-mq-remove' );
const config = require( '../config' );
const configPkg = config.pkg;
const configBanner = config.banner;
const handleErrors = require( '../utils/handle-errors' );
const browserSync = require( 'browser-sync' );

/**
 * Process legacy CSS for IE9 only.
 * @returns {PassThrough} A source stream.
 */
function stylesDemo() {
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
}

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

gulp.task( 'styles:demo', stylesDemo );
gulp.task( 'styles:demoStylesIE9', demoStylesIE9 );

gulp.task( 'styles:demoIE',
  gulp.series(
    'styles:demoStylesIE8',
    'styles:demoStylesIE9'
  )
);

gulp.task( 'styles:charts',
  gulp.series(
    'styles:chartsConcat',
    'styles:chartsMinify'
  )
);

gulp.task( 'styles',
  gulp.series(
    'styles:demo',
    'styles:demoIE',
    'styles:charts'
  )
);
