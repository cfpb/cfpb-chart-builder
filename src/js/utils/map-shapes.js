import ajax from './get-data';
import cache from './session-storage';

let DATA_SOURCE_BASE = 'https://files.consumerfinance.gov/data/';

// Let browsers override the data source root (useful for localhost testing).
DATA_SOURCE_BASE = window.CFPB_CHART_DATA_SOURCE_BASE || DATA_SOURCE_BASE;

const shapes = {
  states: `${ DATA_SOURCE_BASE }mortgage-performance/meta/us-states.geo.json`,
  metros: `${ DATA_SOURCE_BASE }mortgage-performance/meta/us-metros.geo.json`,
  counties: `${ DATA_SOURCE_BASE }mortgage-performance/meta/us-counties.geo.json`
};

const fetchShapes = geoType => {
  // If the shapes have already been downloaded resolve the promise immediately.
  if ( cache.getItem( `shapes-${ geoType }` ) ) {
    return Promise.resolve( cache.getItem( `shapes-${ geoType }` ) );
  }
  // Otherwise, download the shapes and cache them for future requests.
  const promise = ajax( shapes[geoType] );
  promise.then( data => {
    cache.setItem( `shapes-${ geoType }`, data );
  } );
  return promise;
};

export default fetchShapes;
