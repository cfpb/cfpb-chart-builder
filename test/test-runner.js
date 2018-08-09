// Load data from localhost instead of S3
window.CFPB_CHART_DATA_SOURCE_BASE = '/sample_data/';

function NO_OP() {
  // Noop function.
}

// Console polyfill for IE */
if ( !( window.console && console.log ) ) {
  // TODO: remove when legacy IE support is removed.
  // eslint-disable-next-line no-global-assign
  console = {
    log: NO_OP,
    debug: NO_OP,
    info: NO_OP,
    warn: NO_OP,
    error: NO_OP
  };
}

/**
 * Whether we're in Sauce Labs or not.
 * @return {boolean} true if running in Sauce Labs, false otherwise.
 */
function isCI() {
  // TODO: Convert variables to const when IE9 support is removed.
  // eslint-disable-next-line no-var
  var regex = new RegExp( '[?&]ci_environment(=([^&#]*)|&|#|$)' );
  // eslint-disable-next-line no-var
  var results = regex.exec( window.location.href );
  if ( !results ) return false;
  if ( results[2] !== 'test' ) return false;
  return true;
}

/**
 * Catch all errors and report them to Sauce Labs.
 */
function getSaucy() {
  // eslint-disable-next-line no-var
  var errors = [];
  window.onerror = function( message, url, lineNumber ) {
    errors.push( {
      name: 'Smoke test',
      result: false,
      message: 'Error: ' + message + ' on line ' + lineNumber + '.',
      duration: 5000
    } );
    return true;
  };

  // Report everything to Sauce after five seconds. Super hacky.
  setTimeout( function() {
    window.global_test_results = {
      passed: errors.length > 0 ? 0 : 1,
      failed: errors.length,
      total: errors.length || 1,
      duration: 10000,
      tests: errors
    };
    console.log( window.global_test_results );
    console.log( 'Tests ' + ( errors.length > 0 ? 'failed!' : 'passed!' ) );
  }, 10000 );
}

if ( isCI() ) getSaucy();
