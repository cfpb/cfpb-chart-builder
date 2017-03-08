'use strict';

var ajax = require( 'xdr' );
var documentReady = require( './utils/document-ready' );
var createChart = require( './charts' );
var process = require( './utils/process-json' );

var DATA_SOURCE_BASE = window.location.protocol.indexOf( 'https' ) === -1 ?
                      '//files.consumerfinance.gov/data/' :
                      '//s3.amazonaws.com/files.consumerfinance.gov/data/';

/**
*   Polyfill for Array.indexOf
*/
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;
    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}

/***
* When the document is ready, the code for cfpb-chart-builder seeks out chart
* blocks and generates charts inside the designated elements.
*/

documentReady( function() {

  var charts = document.querySelectorAll( '.cfpb-chart' );
  var urls = {};

  for ( var x = 0; x < charts.length; x++ ) {
    var chart = charts[x];
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
} );

// GET requests:

function loadSource( key, callback ) {
  var url = DATA_SOURCE_BASE + key.replace( '.csv', '.json' );
  ajax( { url: url }, function( resp ) {
    callback( key, resp.data );
  } );
}
