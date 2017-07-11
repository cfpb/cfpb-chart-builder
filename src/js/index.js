'use strict';

var ajax = require( 'xdr' );
var Promise = require('es6-promise').Promise;
var documentReady = require( './utils/document-ready' );
var createChart = require( './charts' );
var process = require( './utils/process-json' );

// Let browsers override the data source root (useful for localhost testing)
var DATA_SOURCE_BASE = window.CFPB_CHART_BUILDER_DATA_SOURCE_BASE ||
                      '//s3.amazonaws.com/files.consumerfinance.gov/data/';

/***
* When the document is ready, the code for cfpb-chart-builder seeks out chart
* blocks and generates charts inside the designated elements.
*/

documentReady( function() {

  buildCharts();

} );

function _updateChart( id, attr ) {
  document.getElementById('')
}

function _createChart( { el, type, color, metadata, source } ) {

  return loadSource( source ).then( data => {

    return new Promise( function( resolve, reject ) {

      var chart;

      if ( type === 'line-comparison' ) {

        chart = createChart.mortgagePerformance( { el, type, color, data } );

        // mpChart.series[0].update({
        //   name: 'suuuuuup',
        //   data: properties.data.base.values
        // });

      }

      if ( type === 'line' ) {
        data = process.originations( data[0], metadata );
        if ( typeof data === 'object' ) {
          chart = createChart.line( { el, type, color, data } );
        } else {
          chart.setAttribute( 'data-chart-error', errorStrings[data] );
          console.log( errorStrings[data] );
        }
      }

      if ( type === 'bar' ) {
        data = process.yoy( data[0], metadata );
        if ( typeof data === 'object' ) {
          chart = createChart.bar( { el, type, color, data } );
        } else {
          chart.setAttribute( 'data-chart-error', errorStrings[data] );
          console.log( errorStrings[data] );
        }
      }

      if ( type === 'tile_map' ) {
        data = process.map( data[0], metadata );
        if ( typeof data === 'object' ) {
          chart = createChart.map( { el, type, color, data } );
        } else {
          chart.setAttribute( 'data-chart-error', errorStrings[data] );
          console.log( errorStrings[data] );
        }
      }

      resolve( chart );

    } );

  } );

}

function buildCharts() {

  var charts = document.querySelectorAll( '.cfpb-chart' );

  for (var chart of charts) {
    _createChart({
      el: chart,
      type: chart.getAttribute( 'data-chart-type' ),
      color: chart.getAttribute( 'data-chart-color' ),
      metadata: chart.getAttribute( 'data-chart-metadata' ),
      source: chart.getAttribute( 'data-chart-source' )
    });
  }

}

// GET requests:

function loadSource( key, callback ) {

  var urls = key.split(';');

  var promises = urls.map( function fetchUrl( url ) {
    return new Promise( function( resolve, reject ) {
      url = DATA_SOURCE_BASE + url.replace( '.csv', '.json' );
      ajax( { url: url }, function( resp ) {
        if ( resp.error ) {
          reject( resp.error );
        }
        resolve( JSON.parse( resp.data ) );
      } );
    } );
  } );

  return Promise.all( promises );
}
