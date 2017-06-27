'use strict';

var gulp = require( 'gulp' );

gulp.task( 'build',
  [
    'styles',
    'scripts',
    'copy'
  ]
);
