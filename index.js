'use strict';

require( './src/utils/document-ready.js')
// var barChart = require( './src/charts/BarChart.js' );
// var tileMap = require( './src/charts/TileMap.js' );
var lineChart = require( './src/charts/LineChart.js' );
var barChart = require( './src/charts/BarChart.js' );
var Papa = require( 'papaparse' );

var chartBuilder = {};

documentReady( function() {
  var charts = document.getElementsByClassName( 'cfpb-chart' );

  for ( var x = 0; x < charts.length; x++ ) {
    var chart = charts[x];

    loadSource( chart, function( chart, data ) {
      var type = chart.getAttribute( 'data-chart-type' ),
          selector = chart.getAttribute( 'id' ),
          group = chart.getAttribute( 'data-group' );

      
      var properties = {
        type: type,
        selector: selector
      }

      if ( type === 'line' ) {
        properties.data = processNumOriginationsData( data, group );
        lineChart( properties );
      }

      if ( type === 'bar' ) {
        properties.data = processYoyData( data, group );
        barChart( properties );
      }

    } );
  }
} );

// Get the CSV into a non-esoteric format.
function processNumOriginationsData( csv, group ) {
  var data = {
    unadjusted: [],
    adjusted: []
  };
  csv = Papa.parse(csv).data;
  csv.shift();
  csv.forEach(function(dataPoint) {
    var arr = [];
    var series = dataPoint[2];
    arr.push( dateTranslate(dataPoint[0]) );
    arr.push( parseFloat(dataPoint[1] ) );



    if ( group !== null ) {
      series = dataPoint[3];
    }

    if ( group === null || group === dataPoint[2] ) {
      if ( series === "Unadjusted" ) {
        data.unadjusted.push( arr );
      } else {
        data.adjusted.push( arr );
      }
    }

  });
  data.unadjusted = data.unadjusted.sort(function(a, b) {
    return a[0] - b[0];
  });
  data.adjusted = data.adjusted.sort(function(a, b) {
    return a[0] - b[0];
  });

  return data;
}

function processYoyData( csv, group ) {
  var data = [];
  csv = Papa.parse( csv ).data;

  csv.forEach( function( dataPoint ) {
    if ( dataPoint[2] === group ) {
      var date = dateCategory( dataPoint[0] );
      // var year = +date.substr( date.length -2, 2 );

      // if ( year >= 9 ) {
      if ( date > new Date( '2009-01-01 00:00:00 UTC' ) ) {
        data.push( [ dateCategory( dataPoint[0] ), +dataPoint[1] * 100 ] );
      }
    }
  } );

  return data;
}

// GET requests:

function loadSource( chart, callback ) {
    var url = chart.getAttribute( 'data-source' );
    var request = new XMLHttpRequest();

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

function dateTranslate( index ) {
  var year = Math.floor( index / 12 ) + 2000;
  var month = index % 12;
  month += 1;
  if ( month < 10 ) {
    month = '0' + month;
  }

  return Date.parse( new Date( year + '-' + month + '-01' ) );
}

function dateCategory( index ) {
  var months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ];
  var year = Math.floor( index / 12 ) + 2000;
  var month = index % 12;
  month += 1;
  if ( month < 10 ) {
    month = '0' + month;
  }
  var date = Date.UTC( year, month, 1 );
  // var category = months[ date.getMonth() ] + ' ' + date.getFullYear();

  return date;
}

module.exports = chartBuilder;