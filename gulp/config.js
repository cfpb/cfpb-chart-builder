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
    tests: loc.test
  },
  clean: {
    dest: loc.dist
  },
  styles: {
    cwd:      loc.src + '/css',
    src:      '/main.less',
    dest:     loc.dist + '/css',
    settings: {
      paths: glob.sync( loc.lib + '/cf-*/src/' ),
      compress: true
    }
  },
  chartStyles: {
    cwd:      loc.src + '/css',
    src:      '/cfpb-chart-builder.less',
    dest:     loc.dist + '/css',
    settings: {
      paths: glob.sync( loc.lib + '/cf-*/src/' ),
      compress: true
    }
  },
  scripts: {
    src: [
      loc.src + '/js/**/*.js'
    ],
    dest: loc.dist + '/js/',
    name: 'cfpb-chart-builder'
  },
  copy: {
    html: {
      src: [
        loc.test + '/index.html'
      ],
      dest: loc.dist
    }
  }
};
