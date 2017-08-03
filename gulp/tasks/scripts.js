'use strict';

var gulp = require( 'gulp' );
var plugins = require( 'gulp-load-plugins' )();
var webpack = require('webpack-stream');
var config = require( '../config' );
var configPkg = config.pkg;
var configBanner = config.banner;
var configScripts = config.scripts;
var handleErrors = require( '../utils/handle-errors' );
var browserSync = require( 'browser-sync' );

gulp.task( 'scripts:concat', function() {
  return gulp.src( configScripts.src )
    // .pipe( plugins.sourcemaps.init() )
    // .pipe( plugins.webpack( {
    //   module: {
    //     loaders: [{
    //       loader: 'babel-loader',
    //       exclude: /node_modules/,
    //       query: {
    //           presets: ['es2015']
    //       }
    //     }]
    //   },
    //   output: {
    //     filename: configScripts.name + '.js'
    //   }
    // } ) )
    .pipe( webpack( {
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
    .pipe( plugins.header( configBanner, { pkg: configPkg } ) )
    // .pipe( plugins.sourcemaps.write( '.' ) )
    .pipe( gulp.dest( configScripts.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
} );


gulp.task( 'scripts:uglify', function() {
  return gulp.src( configScripts.src )
    .pipe( plugins.sourcemaps.init() )
    .pipe( plugins.webpack( {
      module: {
        loaders: [{
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
              presets: ['es2015']
          }
        }]
      },
      output: {
        filename: configScripts.name + '.js'
      }
    } ) )
    .pipe( plugins.uglify() )
    .on( 'error', handleErrors )
    .pipe( plugins.header( configBanner, { pkg: configPkg } ) )
    .pipe( plugins.rename( {
      suffix: '.min'
    } ) )
    .pipe( plugins.sourcemaps.write( '.' ) )
    .pipe( gulp.dest( configScripts.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
} );


gulp.task( 'scripts', [
  'scripts:concat',
  'scripts:uglify'
] );
