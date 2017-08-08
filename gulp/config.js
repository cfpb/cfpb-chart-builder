'use strict';

var fs = require( 'fs' );
var glob = require( 'glob' );

/**
 * Set up file paths
 */
var loc = {
  src:  './src',
  dist: './dist',
  lib:  './node_modules', // eslint-disable-line no-sync, no-inline-comments, max-len
  test: './test'
};

module.exports = {
  pkg: JSON.parse( fs.readFileSync( 'package.json' ) ), // eslint-disable-line no-sync, no-inline-comments, max-len
  banner:
      '/*!\n' +
      ' *  <%= pkg.name %> - v<%= pkg.version %>\n' +
      ' *  <%= pkg.homepage %>\n' +
      ' *  Licensed <%= pkg.license %> by' +
      ' Consumer Financial Protection Bureau tech@cfpb.gov\n' +
      ' */',
  lint: {
    src: [
      loc.src + '/js/**/*.js',
      loc.test + '/unit_tests/**/*.js',
      loc.test + '/browser_tests/**/*.js'
    ],
    gulp: [
      'gulpfile.js',
      'gulp/**/*.js'
    ]
  },
  test: {
    src:   loc.src + '/js/**/*.js',
    tests: loc.test,
    unit: loc.test + '/unit_tests/**/*.js'
  },
  clean: {
    dest: loc.dist
  },
  demoStyles: {
    cwd:      loc.test + '/css',
    src:      '/demo.less',
    dest:     loc.test + '/css',
    settings: {
      paths: glob.sync( loc.lib + '/cf-*/src/' ).concat( [ loc.lib + '/highcharts/css/' ] )
    }
  },
  styles: {
    cwd:      loc.src + '/css',
    src:      '/cfpb-chart-builder.less',
    dest:     loc.dist,
    settings: {
      paths: glob.sync( loc.lib + '/cf-*/src/' ).concat( [ loc.lib + '/highcharts/css/' ] ),
      compress: true
    }
  },
  scripts: {
    src: [
      loc.src + '/js/index.js'
    ],
    dest: loc.dist,
    name: 'cfpb-chart-builder'
  }
};
