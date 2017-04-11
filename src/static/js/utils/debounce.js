'use strict';

function debounce( func, delay ) {
	var timeout;
	return function() {
		var later = function() {
			timeout = null;
			func.apply( this, arguments );
		};
		clearTimeout( timeout );
		timeout = setTimeout( later, delay );
	};
};

module.exports = debounce;
