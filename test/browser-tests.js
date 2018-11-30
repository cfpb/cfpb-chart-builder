const path = require( 'path' );
const fs = require( 'fs' );
const sauceConnectLauncher = require( 'sauce-connect-launcher' );
const express = require( 'express' );
const cors = require( 'cors' );
const serveStatic = require( 'serve-static' );
const request = require( 'request' );
const configPath = path.join( __dirname, './config.json' );
const childProcess = require( 'child_process' );
const envvars = require( '../config/environment' ).envvars;

const app = express();
app.use( cors() );
let testName;
let config;

// eslint-disable-next-line no-sync
if ( !fs.existsSync( configPath ) && !envvars.SAUCE_LABS_ACCESS_KEY ) {
  console.error( 'Please define SAUCE_LABS_USERNAME and SAUCE_LABS_ACCESS_KEY in `test/config.json`.' );
  console.error( 'See https://github.com/cfpb/cfpb-chart-builder#testing' );
  process.exit( 1 );
}

if ( envvars.SAUCE_LABS_USERNAME && envvars.SAUCE_LABS_ACCESS_KEY ) {
  // Travis has Sauce Labs creds in an environment variable
  config = {
    SAUCE_LABS_USERNAME: envvars.SAUCE_LABS_USERNAME,
    SAUCE_LABS_ACCESS_KEY: envvars.SAUCE_LABS_ACCESS_KEY
  };
} else {
  // Read creds from config file
  // eslint-disable-next-line global-require
  config = require( configPath );
}

if ( envvars.TRAVIS_PULL_REQUEST !== false &&
     envvars.TRAVIS_PULL_REQUEST_BRANCH &&
     envvars.TRAVIS_JOB_NUMBER ) {
  testName = `Pull request #${ envvars.TRAVIS_PULL_REQUEST }, branch: ${ envvars.TRAVIS_PULL_REQUEST_BRANCH }, Travis job #${ envvars.TRAVIS_JOB_NUMBER }`;
} else {
  // eslint-disable-next-line no-sync
  testName = childProcess.execSync( 'git rev-parse --abbrev-ref HEAD' ).toString();
}

const SAUCE_LABS_USERNAME = config.SAUCE_LABS_USERNAME;
const SAUCE_LABS_ACCESS_KEY = config.SAUCE_LABS_ACCESS_KEY;
const NODE_ENV = envvars.NODE_ENV || '';
const STATIC_SERVER_PORT = 8089;

let sauceTests = [];

const sauceCreds = {
  username: SAUCE_LABS_USERNAME,
  accessKey: SAUCE_LABS_ACCESS_KEY
};

sauceConnectLauncher( sauceCreds, startServer );

/**
 * Starts a local server and connects to Sauce Labs.
 */
function startServer() {
  app.use( serveStatic( path.join( __dirname ) ) );
  app.use( serveStatic( path.join( __dirname, '..', 'dist' ) ) );
  app.listen( STATIC_SERVER_PORT );
  startSauce();
}

/**
 * Starts the connect to Sauce Labs.
 */
function startSauce() {
  console.log( 'Local server listening to', STATIC_SERVER_PORT );
  console.log( 'Sauce Connect ready.' );
  const opts = {
    url: `https://${ SAUCE_LABS_USERNAME }:${ SAUCE_LABS_ACCESS_KEY }@saucelabs.com/rest/v1/cct-sauce/js-tests`,
    method: 'POST',
    json: {
      platforms: [
        [ 'Windows 7', 'internet explorer', '10' ],
        [ 'Windows 7', 'firefox', '27' ],
        [ 'Windows 7', 'chrome', '' ],
        [ 'Linux', 'android', '' ]
      ],
      url: 'http://localhost:' + STATIC_SERVER_PORT + '/?ci_environment=' + NODE_ENV,
      framework: 'custom',
      name: testName
    }
  };
  request.post( opts, function( reqErr, httpResponse, body ) {
    if ( reqErr ) {
      console.error( 'An error occurred:', reqErr );
    }
    console.log( 'Tests started.' );
    sauceTests = body['js tests'];
    checkSauce();
  } );
}

/**
 * Check if the tests are still running on Sauce Labs.
 */
function checkSauce() {
  const opts = {
    url: `https://${ SAUCE_LABS_USERNAME }:${ SAUCE_LABS_ACCESS_KEY }@saucelabs.com/rest/v1/cct-sauce/js-tests/status`,
    method: 'POST',
    json: {
      'js tests': sauceTests
    }
  };
  setTimeout( function() {
    request.post( opts, function( err, httpResponse, body ) {
      if ( err ) {
        console.error( 'An error occurred:', err );
      }

      let failures = 0;

      if ( body.completed ) {
        console.log( 'Tests done.' );
        // TODO: Provide a consistent return value from the function.
        // eslint-disable-next-line consistent-return
        body['js tests'].forEach( test => {
          let errors;
          if ( test.result && test.result.failed > 0 ) {
            // TODO: remove one nested callback.
            // eslint-disable-next-line max-nested-callbacks
            errors = test.result.tests.map( result => result.message );
            failures++;
            return console.log( test.platform.join( ' ' ) + ' failed: ' + errors.join( ' ' ) );
          }
          console.log( test.platform.join( ' ' ) + ' passed.' );
        } );
        if ( failures > 0 ) {
          process.exit( 1 );
        }
        process.exit( 0 );
      } else {
        console.log( 'Tests still running... See status at https://saucelabs.com/u/' + SAUCE_LABS_USERNAME );
        checkSauce();
      }
    } );
  }, 5000 );
}
