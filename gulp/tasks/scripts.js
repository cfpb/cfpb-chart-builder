'use strict';

var gulp = require( 'gulp' );
var gulpHeader = require( 'gulp-header' );
var gulpRename = require( 'gulp-rename' );
var gulpUglify = require( 'gulp-uglify' );
var webpack = require('webpack-stream');
var config = require( '../config' );
var configPkg = config.pkg;
var configBanner = config.banner;
var configScripts = config.scripts;
var configDemoScripts = config.demoScripts;
var handleErrors = require( '../utils/handle-errors' );
var browserSync = require( 'browser-sync' );

gulp.task( 'scripts:concat', function() {
  return gulp.src( configScripts.src )
    .pipe( webpack( {
      devtool: 'eval-source-map',
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
    .pipe( gulp.dest( configScripts.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
} );

gulp.task( 'scripts:demo', function() {
  return gulp.src( configDemoScripts.src )
    .pipe( webpack( {
      devtool: 'eval-source-map',
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
        filename: configDemoScripts.name + '.js'
      }
    } ) )
    .on( 'error', handleErrors )
    .pipe( gulpHeader( configBanner, { pkg: configPkg } ) )
    .pipe( gulp.dest( configDemoScripts.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
} );

gulp.task( 'scripts:uglify', function() {
  return gulp.src( configScripts.src )
    .pipe( webpack( {
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
    .pipe( gulp.dest( configScripts.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
} );


gulp.task( 'scripts', [
  'scripts:concat',
  'scripts:uglify',
  'scripts:demo'
] );
