'use strict';

const ajax = require( './get-data' );

const shapes = {
  states: 'mortgage-performance/meta/us-states.geo.json',
  metros: 'mortgage-performance/meta/us-metros.geo.json',
  counties: 'mortgage-performance/meta/us-counties.geo.json'
};

const fetchShapes = geoType => {
  // If the shapes have already been downloaded resolve the promise immediately.
  if ( typeof shapes[geoType] === 'object' ) {
    return Promise.resolve( shapes[geoType] );
  }
  // Otherwise, download the shapes and resolve the promise when complete.
  return ajax( shapes[geoType] );
};

module.exports = {
  fetch: fetchShapes
};
