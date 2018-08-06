const gulp = require( 'gulp' );
const gulpHeader = require( 'gulp-header' );
const gulpRename = require( 'gulp-rename' );
const config = require( '../config' );
const configPkg = config.pkg;
const configBanner = config.banner;
const configScripts = config.scripts;
const configDemoScripts = config.demoScripts;
const handleErrors = require( '../utils/handle-errors' );
const webpack = require( 'webpack' );
const webpackConfig = require( '../../config/webpack-config.js' );
const webpackStream = require( 'webpack-stream' );

/**
 * Standardize webpack workflow for handling script
 * configuration, source, and destination settings.
 * @param {Object} localWebpackConfig - Settings for Webpack.
 * @param {string} src - Source URL in the unprocessed assets directory.
 * @param {string} dest - Destination URL in the processed assets directory.
 * @returns {PassThrough} A source stream.
 */
function _processScript( localWebpackConfig, src, dest ) {
  return gulp.src( src )
    .pipe( webpackStream( localWebpackConfig, webpack ) )
    .pipe( gulpHeader( configBanner, { pkg: configPkg } ) )
    .pipe( gulpRename( 'cfpb-chart-builder.min.js' ) )
    .on( 'error', handleErrors.bind( this, { exitProcess: true } ) )
    .pipe( gulp.dest( dest ) );
}

/**
 * Bundle scripts in unprocessed/js/routes/
 * and factor out common modules into common.js.
 * @returns {PassThrough} A source stream.
 */
function scriptsCommon() {
  return _processScript(
    webpackConfig.commonConf,
    configScripts.src,
    configScripts.dest
  );
}

/**
 * Bundle scripts in unprocessed/js/routes/
 * and factor out common modules into common.js.
 * @returns {PassThrough} A source stream.
 */
function scriptsDemo() {
  return _processScript(
    webpackConfig.demoConf,
    configDemoScripts.src,
    configDemoScripts.dest
  );
}

gulp.task( 'scripts:common', scriptsCommon );
gulp.task( 'scripts:demo', scriptsDemo );

gulp.task( 'scripts',
  gulp.series(
    'scripts:common',
    'scripts:demo'
  )
);
