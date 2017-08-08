'use strict';

require('es6-promise').polyfill();
require('universal-fetch');

// IE9 doesn't allow XHR from different protocols so until we get files.cf.gov
// onto HTTPS we need to choose how we use S3.
let DATA_SOURCE_BASE = window.location.protocol.indexOf( 'https' ) === -1 ?
                      '//files.consumerfinance.gov/data/' :
                      '//s3.amazonaws.com/files.consumerfinance.gov/data/';

// Let browsers override the data source root (useful for localhost testing)
DATA_SOURCE_BASE = window.CFPB_CHART_DATA_SOURCE_BASE || DATA_SOURCE_BASE;

const getData = sources => {

  const urls = sources.split( ';' );

  const promises = urls.map( url => new Promise( ( resolve, reject ) => {
    if ( url.indexOf( 'http' ) !== 0 ) {
      url = DATA_SOURCE_BASE + url.replace( '.csv', '.json' );
    }
    console.log(url);
    fetch( url ).then( resp => resp.json() ).then( data => {
      resolve( data );
    } ).catch( err => {
      reject( err );
    } );
  } ) );

  return Promise.all( promises );
};

module.exports = getData;
