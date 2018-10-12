const autoprefixer = require( 'autoprefixer' );
const config = require( '../config' );
const configPkg = config.pkg;
const configBanner = config.banner;
const handleErrors = require( '../utils/handle-errors' );
const gulp = require( 'gulp' );
const gulpHeader = require( 'gulp-header' );
const gulpLess = require( 'gulp-less' );
const gulpPostcss = require( 'gulp-postcss' );
const gulpSourcemaps = require( 'gulp-sourcemaps' );
const gulpRename = require( 'gulp-rename' );

/**
 * @returns {PassThrough} A source stream.
 */
function stylesDemo() {
  return gulp.src( config.demoStyles.cwd + config.demoStyles.src )
    .pipe( gulpSourcemaps.init() )
    .pipe( gulpLess( config.demoStyles.settings ) )
    .on( 'error', handleErrors )
    .pipe( gulpPostcss( [
      autoprefixer( {
        browsers: [
          'last 2 version'
        ]
      } )
    ] ) )
    .pipe( gulpHeader( configBanner, { pkg: configPkg } ) )
    .pipe( gulpSourcemaps.write( '.' ) )
    .pipe( gulp.dest( config.demoStyles.dest ) );
}

gulp.task( 'styles:chartsConcat', () => {
  const stream = gulp.src( config.styles.cwd + config.styles.src )
    .pipe( gulpSourcemaps.init() )
    .pipe( gulpLess( {
      paths: config.styles.settings.paths,
      compress: false
    } ) )
    .on( 'error', handleErrors )
    .pipe( gulpPostcss( [
      autoprefixer( {
        browsers: [
          'last 2 version'
        ]
      } )
    ] ) )
    .pipe( gulp.dest( config.styles.dest ) );
  return stream;
} );

gulp.task( 'styles:chartsMinify', () => {
  const stream = gulp.src( config.styles.cwd + config.styles.src )
    .pipe( gulpSourcemaps.init() )
    .pipe( gulpLess( config.styles.settings ) )
    .on( 'error', handleErrors )
    .pipe( gulpPostcss( [
      autoprefixer( {
        browsers: [
          'last 2 version'
        ]
      } )
    ] ) )
    .pipe( gulpRename( {
      suffix: '.min'
    } ) )
    .pipe( gulp.dest( config.styles.dest ) );
  return stream;
} );

gulp.task( 'styles:demo', stylesDemo );

gulp.task( 'styles:charts',
  gulp.series(
    'styles:chartsConcat',
    'styles:chartsMinify'
  )
);

gulp.task( 'styles',
  gulp.series(
    'styles:demo',
    'styles:charts'
  )
);
