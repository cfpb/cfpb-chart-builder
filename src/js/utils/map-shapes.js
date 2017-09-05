'use strict';

const ajax = require( './get-data' );

let DATA_SOURCE_BASE = window.location.protocol.indexOf( 'https' ) === -1 ?
                      '//files.consumerfinance.gov/data/' :
                      '//s3.amazonaws.com/files.consumerfinance.gov/data/';

let shapes = {
  states: `${DATA_SOURCE_BASE}mortgage-performance/meta/us-states.geo.json`,
  metros: `${DATA_SOURCE_BASE}mortgage-performance/meta/us-metros.geo.json`,
  counties: `${DATA_SOURCE_BASE}mortgage-performance/meta/us-counties.geo.json`
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
