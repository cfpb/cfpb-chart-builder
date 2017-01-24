'use strict';

var ajax = require('xdr');
var documentReady = require( './utils/document-ready')
var createChart = require( './charts' );
var process = require( './utils/process-csv' );

var DATA_SOURCE_BASE = "https://s3.amazonaws.com/files.consumerfinance.gov/data/";

documentReady( function() {
  var charts = document.getElementsByClassName( 'cfpb-chart' );

  for ( var x = 0; x < charts.length; x++ ) {
    var chart = charts[x];

    loadSource( chart, function( chart, data ) {
      var type = chart.getAttribute( 'data-chart-type' ),
          group = chart.getAttribute( 'data-chart-group' );

      // Ensure undefined attributes aren't cast as a string.
      group = group === "undefined" ? undefined : group;

      var properties = {
        type: type,
        selector: chart
      }

      if ( type === 'line' ) {
        properties.data = process.originations( data, group );
        createChart.line( properties );
      }

      if ( type === 'bar' ) {
        properties.data = process.yoy( data, group );
        createChart.bar( properties );
      }

      if ( type === 'map' ) {
        properties.data = process.map( data, group );
        createChart.map( properties );
      }

    } );
  }
} );

// GET requests:

function loadSource( chart, callback ) {
    var url = chart.getAttribute( 'data-chart-source' );
    url = DATA_SOURCE_BASE + url;

    ajax( {url: url, type: 'csv'}, function( resp ) {
      callback( chart, resp.data );
    } );
}
