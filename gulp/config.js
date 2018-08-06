const fs = require( 'fs' );
const glob = require( 'glob' );

/**
 * Set up file paths
 */
const loc = {
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
      `${ loc.src }/js/**/*.js`
    ],
    test: [
      `${ loc.test }/**/*.js`,
      `!${ loc.test }/static/**/*.js`,
      `!${ loc.test }/unit_test_coverage/**/*.js`
    ],
    build: [
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
    cwd:      loc.test + '/static',
    src:      '/demo.less',
    dest:     loc.test + '/static',
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
  demoScripts: {
    src: loc.test + '/static/demo.js',
    dest: loc.test + '/static'
  },
  scripts: {
    src: loc.src + '/js/index.js',
    dest: loc.dist
  }
};
