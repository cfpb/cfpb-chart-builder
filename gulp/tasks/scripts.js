'use strict';

var gulp = require( 'gulp' );
var gulpHeader = require( 'gulp-header' );
var gulpSourcemaps = require( 'gulp-sourcemaps' );
var gulpRename = require( 'gulp-rename' );
var gulpUglify = require( 'gulp-uglify' );
var gulpWebpack = require( 'gulp-webpack' );
var config = require( '../config' );
var configPkg = config.pkg;
var configBanner = config.banner;
var configScripts = config.scripts;
var handleErrors = require( '../utils/handle-errors' );
var browserSync = require( 'browser-sync' );

gulp.task( 'scripts:concat', function() {
  return gulp.src( configScripts.src )
    .pipe( gulpSourcemaps.init() )
    .pipe( gulpWebpack( {
      debug: true,
      devtool: 'inline-source-map',
      module: {
        loaders: [ {
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: [ 'es2015' ]
          }
        } ]
      },
      output: {
        filename: configScripts.name + '.js'
      }
    } ) )
    .on( 'error', handleErrors )
    .pipe( gulpHeader( configBanner, { pkg: configPkg } ) )
    .pipe( gulpSourcemaps.write( '.' ) )
    .pipe( gulp.dest( configScripts.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
} );


gulp.task( 'scripts:uglify', function() {
  return gulp.src( configScripts.src )
    .pipe( gulpSourcemaps.init() )
    .pipe( gulpWebpack( {
      debug: true,
      devtool: 'inline-source-map',
      module: {
        loaders: [ {
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: [ 'es2015' ]
          }
        } ]
      },
      output: {
        filename: configScripts.name + '.js'
      }
    } ) )
    .pipe( gulpUglify() )
    .on( 'error', handleErrors )
    .pipe( gulpHeader( configBanner, { pkg: configPkg } ) )
    .pipe( gulpRename( {
      suffix: '.min'
    } ) )
    .pipe( gulpSourcemaps.write( '.' ) )
    .pipe( gulp.dest( configScripts.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
} );


gulp.task( 'scripts', [
  'scripts:concat',
  'scripts:uglify'
] );
