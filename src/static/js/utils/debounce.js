'use strict';

function debounce( func, delay ) {
  var timeout;
  return function() {
    function later() {
      timeout = null;
      func.apply( this, arguments );
    }
    clearTimeout( timeout );
    timeout = setTimeout( later, delay );
  };
}

module.exports = debounce;
