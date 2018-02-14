const gulp = require( 'gulp' );
const util = require( 'gulp-util' );
const browserSync = require( 'browser-sync' );
const cors = require( 'cors' );
const compression = require( 'compression' );

gulp.task( 'browsersync', () => {
  const port = util.env.port || '8081';
  browserSync.init( {
    proxy: 'localhost:' + port,
    middleware: [ compression(), cors() ]
  } );
} );
