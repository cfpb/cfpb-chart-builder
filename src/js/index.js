'use strict';

var ajax = require( 'xdr' );
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

function buildCharts() {

  var charts = document.querySelectorAll( '.cfpb-chart' );
  var urls = {};

  var errorStrings = {
    parseError: 'There was an error parsing the data as JSON',
    groupError: 'There was an error finding the group in data properties',
    propertyError: 'There was an error finding the adjusted and/or unadjusted properties in the data'
  };

  for ( var x = 0; x < charts.length; x++ ) {
    var chart = charts[x];
    // Empty the chart for redraws
    chart.innerHTML = '';

    var url = chart.getAttribute( 'data-chart-source' );
    if ( !urls.hasOwnProperty( url ) ) {
      urls[url] = [];
    }
    urls[url].push( chart );
  }

  for ( var key in urls ) {

    loadSource( key, function( key, data ) {
      for ( var x = 0; x < urls[key].length; x++ ) {
        var chart = urls[key][x],
            type = chart.getAttribute( 'data-chart-type' ),
            group = chart.getAttribute( 'data-chart-metadata' ),
            color = chart.getAttribute( 'data-chart-color' );

        // Ensure undefined attributes aren't cast as a string.
        group = group === 'undefined' ? undefined : group;

        var properties = {
          type: type,
          selector: chart,
          color: color
        };

        if ( type === 'line' ) {
          properties.data = process.originations( data, group );

          if ( typeof properties.data === 'object' ) {
            createChart.line( properties );
          } else {
            chart.setAttribute( 'data-chart-error', errorStrings[properties.data] );
            console.log( errorStrings[properties.data] );
          }
        }

        if ( type === 'bar' ) {
          properties.data = process.yoy( data, group );
          if ( typeof properties.data === 'object' ) {
            createChart.bar( properties );
          } else {
            chart.setAttribute( 'data-chart-error', errorStrings[properties.data] );
            console.log( errorStrings[properties.data] );
          }
        }

        if ( type === 'tile_map' ) {
          properties.data = process.map( data, group );
          if ( typeof properties.data === 'object' ) {
            createChart.map( properties );
          } else {
            chart.setAttribute( 'data-chart-error', errorStrings[properties.data] );
            console.log( errorStrings[properties.data] );
          }
        }

      }
    } );
  }
}

// GET requests:

function loadSource( key, callback ) {
  var url = DATA_SOURCE_BASE + key.replace( '.csv', '.json' );
  ajax( { url: url }, function( resp ) {
    callback( key, resp.data );
  } );
}
