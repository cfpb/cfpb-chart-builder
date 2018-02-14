const gulp = require( 'gulp' );
const del = require( 'del' );
const configClean = require( '../config' ).clean;

gulp.task( 'clean', done => {
  del( configClean.dest ).then( () => done() );
} );
