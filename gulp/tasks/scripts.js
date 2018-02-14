const gulp = require( 'gulp' );
const gulpHeader = require( 'gulp-header' );
const gulpRename = require( 'gulp-rename' );
const gulpUglify = require( 'gulp-uglify' );
const webpack = require( 'webpack-stream' );
const config = require( '../config' );
const configPkg = config.pkg;
const configBanner = config.banner;
const configScripts = config.scripts;
const configDemoScripts = config.demoScripts;
const handleErrors = require( '../utils/handle-errors' );
const browserSync = require( 'browser-sync' );

gulp.task( 'scripts:concat', function() {
  return gulp.src( configScripts.src )
    .pipe( webpack( {
      devtool: 'eval-source-map',
      module: {
        loaders: [ {
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: [ [ 'babel-preset-env', {
              targets: {
                browsers: [
                  'last 2 versions',
                  'Explorer >= 9'
                ]
              },
              debug: true
            } ] ]
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
          options: {
            presets: [ [ 'babel-preset-env', {
              targets: {
                browsers: [
                  'last 2 versions',
                  'Explorer >= 9'
                ]
              },
              debug: true
            } ] ]
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
          options: {
            presets: [ [ 'babel-preset-env', {
              targets: {
                browsers: [
                  'last 2 versions',
                  'Explorer >= 9'
                ]
              },
              debug: true
            } ] ]
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


gulp.task( 'scripts',
  gulp.series(
    'scripts:concat',
    'scripts:uglify',
    'scripts:demo'
  )
);
