const ajax = require( 'xdr' );
const cache = require( './session-storage' );

/* IE9 doesn't allow XHR from different protocols so until we get files.cf.gov
   onto HTTPS we need to choose how we use S3. */
let DATA_SOURCE_BASE = window.location.protocol.indexOf( 'https' ) === -1 ?
  '//files.consumerfinance.gov/data/' :
  '//s3.amazonaws.com/files.consumerfinance.gov/data/';

// Let browsers override the data source root (useful for localhost testing)
DATA_SOURCE_BASE = window.CFPB_CHART_DATA_SOURCE_BASE || DATA_SOURCE_BASE;

const getData = sources => {

  const urls = sources.split( ';' );

  const promises = urls.map( url => new Promise( ( resolve, reject ) => {
    // Only prepend the data source base if it's a relative URL
    if ( url.indexOf( 'http' ) !== 0 && url.indexOf( '/' ) !== 0 ) {
      url = DATA_SOURCE_BASE + url.replace( '.csv', '.json' );
    }
    if ( cache.getItem( url ) ) {

      /* Ensure UI isn't blocked when loading large shapefiles by making
         cache resolver asynchronous https://stackoverflow.com/q/10180391 */
      return setTimeout( () => resolve( cache.getItem( url ) ), 0 );
    }
    return ajax( { url: url, type: 'json' }, function( resp ) {
      if ( resp.error ) {
        reject( resp.error );
        return;
      }
      cache.setItem( url, resp.data );
      resolve( resp.data );
    } );
  } ) );

  return Promise.all( promises );
};

module.exports = getData;
