//
// This data processing will eventually happen on the server.
// When we finish those scripts we will no longer need this file.
//

var Papa = require( 'papaparse' );
var tileMapUtils = require( './tile-map' );

// Convert the integers in the CSVs into human-readable dates.
function formatDate( index ) {
  var year = Math.floor( index / 12 ) + 2000;
  var month = index % 12;
  month += 1;
  if ( month < 10 ) {
    month = '0' + month;
  }

  // @todo: don't use Date.parse, it's incompatible with older browsers we support such as ie 8
  var theDate = Date.parse( new Date( year + '-' + month + '-01' ) );

  return theDate;
}

function getProjectedTimestamp( monthIndex ) {
  return formatDate( monthIndex - 6 );
}

function _dateCategory( index ) {
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
    arr.push( formatDate(dataPoint[0]) );
    arr.push( parseFloat(dataPoint[1] ) );

    if ( group ) {
      series = dataPoint[3];
    }

    if ( !group || group === dataPoint[2] ) {
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

  // data.projectedDate = getProjectedTimestamp( data.adjusted[0][0] );

  return data;
}

function processYoyData( csv, group ) {
  var data = [];
  csv = Papa.parse( csv ).data;

  csv.forEach( function( dataPoint ) {
    if ( dataPoint[2] === group ) {
      var date = _dateCategory( dataPoint[0] );
      // var year = +date.substr( date.length -2, 2 );

      // if ( year >= 9 ) {
      if ( date > new Date( '2009-01-01 00:00:00 UTC' ) ) {
        data.push( [ _dateCategory( dataPoint[0] ), +dataPoint[1] * 100 ] );
      }
    }
  } );

  return data;
}

// data should be the array
function getProjectedDate( data ) {
  var mostRecentMonthOfDataAvailable = data[data.length - 1][0];
  var sixMonthsAgo = (60 * 60 * 24 * 365 * 1000 / 2);

  return mostRecentMonthOfDataAvailable - sixMonthsAgo;
}

function processMapData( csv ) {
  var data = Papa.parse(csv).data;
  // Delete the first row (column titles)
  data.shift();
  // Filter out any empty values just in case
  data = data.filter(function(row) {
      return !!row[0];
  });
  data = data.map(function(row, i) {
      var state = Object.keys(tileMapUtils.statePaths)[i],
          value = Math.round(row[1] * 100),
          tooltip = 'Loan originations in ' + state + ' ' + (value < 0 ? 'decreased' : 'increased') + ' by ' + Math.abs(value) + '%';
      return {
          name: state,
          path: tileMapUtils.statePaths[state],
          value: value,
          tooltip: tooltip,
          color: tileMapUtils.getColor(value)
      }
  });
  return data;
}

module.exports = {
  formatDate: formatDate,
  originations: processNumOriginationsData,
  yoy: processYoyData,
  map: processMapData
}
