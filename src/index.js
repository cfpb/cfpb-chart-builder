'use strict';

var documentReady = require( './utils/document-ready')
var createChart = require( './charts' );
var process = require( './utils/process-csv' );

var DATA_SOURCE_BASE = "https://s3.amazonaws.com/files.consumerfinance.gov/data/consumer-credit-trends/";

documentReady( function() {
  var charts = document.getElementsByClassName( 'cfpb-chart' );

  for ( var x = 0; x < charts.length; x++ ) {
    var chart = charts[x];

    loadSource( chart, function( chart, data ) {
      var type = chart.getAttribute( 'data-chart-type' ),
          selector = chart,
          group = chart.getAttribute( 'data-chart-group' );

      // Ensure undefined attributes aren't cast as a string.
      group = group === "undefined" ? undefined : group;

      var properties = {
        type: type,
        selector: selector
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
    var request = new XMLHttpRequest();

    url = DATA_SOURCE_BASE + url;

    request.onreadystatechange = function() {
        if ( request.readyState == XMLHttpRequest.DONE ) {
           if ( request.status == 200 ) {
              var data = request.responseText;
              callback( chart, data );
           }
           else if ( request.status == 400 ) {
              // 400 error handling
           }
           else {
              // other error handling
           }
        }
    };

    request.open( 'GET', url, true );
    request.send();
}
