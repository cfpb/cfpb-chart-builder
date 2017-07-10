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

function buildCharts() {

  var charts = document.querySelectorAll( '.cfpb-chart' );
  var urls = {};

  var errorStrings = {
    parseError: 'There was an error parsing the data as JSON',
    metadataError: 'There was an error finding the metadata in data properties',
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

    loadSource( key ).then( function handleData( resp ) {

      var source = {
        url: resp[0].url,
        data: resp[0].data
      }

      // If multiple sources were loaded
      if ( resp.length > 1 ) {
        source.labels = [];
        source.data = [];
        resp.forEach( function(r) {
          source.labels.push( JSON.parse(r.data).label );
          source.data.push( r.data );
        } );
      }

      for ( var x = 0; x < urls[source.url].length; x++ ) {
        var chart = urls[source.url][x],
            type = chart.getAttribute( 'data-chart-type' ),
            genre = chart.getAttribute( 'data-chart-genre' ),
            metadata = chart.getAttribute( 'data-chart-metadata' ),
            color = chart.getAttribute( 'data-chart-color' );

        // Ensure undefined attributes aren't cast as a string.
        metadata = metadata === 'undefined' ? undefined : metadata;

        var properties = {
          type: type,
          selector: chart,
          color: color
        };

        if ( type === 'line-comparison' ) {
          properties.data = {
            base: {
              label: source.labels[0],
              values: process.mortgagePerformance( source.data[0] )
            },
            comparison: {
              label: source.labels[1],
              values: process.mortgagePerformance( source.data[1] )
            }
          }

          var mpChart = createChart.mortgagePerformance( properties );
          continue;
        }

        if ( type === 'line' ) {
          properties.data = process.originations( source.data, metadata );

          if ( typeof properties.data === 'object' ) {
            createChart.line( properties );
          } else {
            chart.setAttribute( 'data-chart-error', errorStrings[properties.data] );
            console.log( errorStrings[properties.data] );
          }
          continue;
        }

        if ( type === 'bar' ) {
          properties.data = process.yoy( source.data, metadata );
          if ( typeof properties.data === 'object' ) {
            createChart.bar( properties );
          } else {
            chart.setAttribute( 'data-chart-error', errorStrings[properties.data] );
            console.log( errorStrings[properties.data] );
          }
          continue;
        }

        if ( type === 'tile_map' ) {
          properties.data = process.map( source.data, metadata );
          if ( typeof properties.data === 'object' ) {
            createChart.map( properties );
          } else {
            chart.setAttribute( 'data-chart-error', errorStrings[properties.data] );
            console.log( errorStrings[properties.data] );
          }
          continue;
        }

      }
    } );
  }
}

// GET requests:

function loadSource( key, callback ) {

  var urls = key.split(';');

  var promises = urls.map( function fetchUrl( url ) {
    return new Promise( function( resolve, reject ) {
      url = DATA_SOURCE_BASE + url.replace( '.csv', '.json' );
      ajax( { url: url }, function( resp ) {
        resolve( {
          url: key,
          data: resp.data
        } );
      } );
    } );
  } );

  return Promise.all( promises );
}
