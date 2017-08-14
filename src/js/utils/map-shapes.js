'use strict';

const ajax = require( 'xdr' );

const shapes = {
  states: 'https://s3.amazonaws.com/files.consumerfinance.gov/data/mortgage-performance/meta/us-states.geo.json',
  metros: 'https://s3.amazonaws.com/files.consumerfinance.gov/data/mortgage-performance/meta/us-counties.geo.json',
  counties: 'https://s3.amazonaws.com/files.consumerfinance.gov/data/mortgage-performance/meta/us-counties.geo.json'
};

const fetchShapes = geoType => new Promise( ( resolve, reject ) => {
  // If the shapes have already been downloaded resolve the promise immediately.
  if ( typeof shapes[geoType] === 'object' ) {
    return resolve( shapes[geoType] );
  }
  // Otherwise, download the shapes and resolve the promise when complete.
  return ajax( { url: shapes[geoType] }, function( resp ) {
    if ( resp.error ) {
      reject( resp.error );
    }
    shapes[geoType] = JSON.parse( resp.data );
    resolve( shapes[geoType] );
  } );
} );

module.exports = {
  fetch: fetchShapes
};
