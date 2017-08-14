'use strict';

const ajax = require( './get-data' );

let shapes = {
  states: 'mortgage-performance/meta/us-states.geo.json',
  metros: 'mortgage-performance/meta/us-metros.geo.json',
  counties: 'mortgage-performance/meta/us-counties.geo.json'
};

const fetchShapes = geoType => {
  // If the shapes have already been downloaded resolve the promise immediately.
  if ( typeof shapes[geoType] === 'object' ) {
    return Promise.resolve( shapes[geoType] );
  }
  // Otherwise, download the shapes and cache them for future requests.
  const promise = ajax( shapes[geoType] );
  promise.then( data => {
    shapes[geoType] = data;
  } );
  return promise;
};

module.exports = {
  fetch: fetchShapes
};
