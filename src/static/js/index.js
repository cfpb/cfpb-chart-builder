'use strict';

var ajax = require( 'xdr' );
var documentReady = require( './utils/document-ready' );
var createChart = require( './charts' );
var process = require( './utils/process-csv' );

var DATA_SOURCE_BASE = window.location.protocol.indexOf( 'https' ) === -1 ?
                      '//files.consumerfinance.gov/data/' :
                      '//s3.amazonaws.com/files.consumerfinance.gov/data/';

documentReady( function() {
  buildCharts();

  window.addEventListener( 'resize', buildCharts );

} );

function buildCharts() {

  var charts = document.querySelectorAll( '.cfpb-chart' );
  var urls = {};

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
          createChart.line( properties );
        }

        if ( type === 'bar' ) {
          properties.data = process.yoy( data, group );
          createChart.bar( properties );
        }

        if ( type === 'tile_map' ) {
          properties.data = process.map( data, group );
          createChart.map( properties );
        }

      }
    } );
  }
}

// GET requests:

function loadSource( key, callback ) {
  var url = DATA_SOURCE_BASE + key;
  ajax( { url: url }, function( resp ) {
    callback( key, resp.data );
  } );
}
