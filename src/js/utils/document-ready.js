'use strict';


/**
 * ready - Cross-browser document ready
 *
 * @param {Function} fn Function to call when document is ready
 */
function ready( fn ) {
  if ( document.readyState !== 'loading' ) {
    fn();
  } else if ( document.addEventListener ) {
    document.addEventListener( 'DOMContentLoaded', fn );
  } else {
    document.attachEvent( 'onreadystatechange', function() {
      if ( document.readyState !== 'loading' ) { fn(); }
    } );
  }
}

module.exports = ready;
