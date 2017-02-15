'use strict';

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

  var theDate = Date.UTC( year, month ) ;

  return theDate;
}

/**
 * Returns an object with the UTC timestamp number in milliseconds and human-friendly month and year for a given date in either format
 *
 * @param {Number} milliseconds - UTC timestamp in milliseconds representing the month and year for a given data point, e.g. 1477958400000
 * @param {String} monthAndYear - Month + YYYY format in milliseconds representing the month and year for a given data point, e.g. "January 2000"
 * @returns {Obj} object with UTC timestamp in milliseconds and the human-readable version of the month and year for the given date.
 */
function convertDate( date ) {
  var humanFriendly = null;
  var timestamp = null;
  var month = null;
  var year = null;
  var months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

  if ( typeof date === 'number' && date.toString().length >= 12 && date.toString().length <= 13 ) {

    month = new Date( date ).getUTCMonth();
    month = months[month];
    year = new Date( date ).getUTCFullYear();

    humanFriendly = month + ' ' + year;
    timestamp = date;
  } else if ( typeof date === 'string' ) {

    var strLength = date.length;
    var monthString = date.substring( 0, strLength - 5 );

    month = months.indexOf( monthString );
    year = date.slice( date.length - 4, date.length );


    timestamp = Date.UTC( year, month, 1, 0, 0, 0, 0 );
    humanFriendly = date;
  } else {
    // return error
  }

  return {
    humanFriendly: humanFriendly,
    timestamp: timestamp
  }
}

function processNumOriginationsData( csv, group ) {
  var data = {
    unadjusted: [],
    adjusted: []
  };
  csv = Papa.parse( csv ).data;
  csv.shift();
  csv.forEach( function( dataPoint ) {

    if ( formatDate( dataPoint[0] ) > Date.UTC( 2008, 11 ) ) {
      var arr = [];
      var series = dataPoint[2];
      arr.push( formatDate( dataPoint[0] ) );
      arr.push( parseFloat( dataPoint[1] ) );

      if ( group ) {
        series = dataPoint[3];
      }

      if ( !group || group === dataPoint[2] ) {
        if ( series === 'Unadjusted' ) {
          data.unadjusted.push( arr );
        } else {
          data.adjusted.push( arr );
        }
      }
    }

  } );
  data.unadjusted = data.unadjusted.sort( function( a, b ) {
    return a[0] - b[0];
  } );
  data.adjusted = data.adjusted.sort( function( a, b ) {
    return a[0] - b[0];
  } );

  data.projectedDate = {};
  data.projectedDate.timestamp = getProjectedTimestamp( data.adjusted, false );
  data.projectedDate.label = getProjectedDate( data.projectedDate.timestamp );

  return data;
}

function processYoyData( csv, group ) {
  var data = {
    values: [],
    projectedDate: null
  };
  csv = Papa.parse( csv ).data;

  csv.forEach( function( dataPoint ) {
    if ( dataPoint[2] === group ) {
      var date = formatDate( dataPoint[0] );
      if ( date > Date.UTC( 2008, 11 ) ) {
        data.values.push( [ formatDate( dataPoint[0] ), Number( dataPoint[1] ) * 100 ] );
      }
    }
  } );

  data.projectedDate = {};
  data.projectedDate.timestamp = getProjectedTimestamp( data.values, true );
  data.projectedDate.label = getProjectedDate( data.projectedDate.timestamp );

  return data;
}

/**
 * Returns a UTC timestamp number for the month when each graph's data is projected
 *
 * @param {Array} valuesList - list of values from the data, containing an array with timestamp representing the month and year at index 0, and the value at index 1
 * @param {Boolean} isYoy - is the valuesList year-over-year (Yoy) data? If so, it includes an additional month, so we need to calculate the projected date differently.
 * @returns {Number} a timestamp.
 */
function getProjectedTimestamp( valuesList, isYoy ) {
  var mostRecentMonthOfDataAvailable = valuesList[valuesList.length - 1][0];

  /*
  152.083 days = 5 months, which is six months ago for line chart data. Wee count 5 months back, because the timestamps are the first of each month:
  0 - november 1
  1 month - october 1
  2 - sept 1
  3 - aug 1
  4 - jul 1
  5 - june 1
  For data through November, months AFTER May are projected. June through November should be projected in the UI.
  */
  var projectedThreshold = 60 * 60 * 24 * 152.083 * 1000;

  if ( isYoy === true ) {
    // Year over year data has an extra month compared to line chart data, so we include the last 7 months of the set instead of only 6.
    projectedThreshold = 60 * 60 * 24 * 365 * 1000 / 2;
  }

  return mostRecentMonthOfDataAvailable - projectedThreshold;
}

/**
 * Returns a human-readable string representing the month and year after which data in each graph is projected
 *
 * @param {Number} timestamp - UTC timestamp representing the milliseconds elapsed since the UNIX epoch, for the month when each graph begins displaying projected data
 * @returns {String} projectedDate - text with the Month and Year of the projected data cutoff point, for use in labeling projected date in graphs
 */
function getProjectedDate( timestamp ) {

  // var months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

  // Projected month threshhold is one month before the data itself is projected. E.g., data after May 2016 is projected, so graphs show June 2016 and after as projected, not inclusive of the month of May.
  // var projectedMonth = months[new Date( timestamp ).getMonth() - 1];
  // var projectedYear = new Date( timestamp ).getFullYear();
  // var projectedDate = projectedMonth + ' ' + projectedYear;

  var getDate = convertDate( timestamp );

  getDate.date = new Date( timestamp );
  var projectedDate = getDate.date.setUTCMonth( getDate.date.getUTCMonth() - 1 );

  return convertDate( getDate.date.getTime() ).humanFriendly;

  // return projectedDate;
}

function processMapData( csv ) {
  var data = Papa.parse( csv ).data;
  // Delete the first row (column titles)
  data.shift();
  // Filter out any empty values just in case
  data = data.filter( function( row ) {
    return Boolean( row[0] );
  } );
  data = data.map( function( row, i ) {
    var state = tileMapUtils.statePaths['state' + row[0]],
        value = Math.round( row[1] * 100 ),
        tooltip = state.abbr + ' ' + ( value < 0 ? 'decreased' : 'increased' ) + ' by ' + Math.abs( value ) + '%';
    return {
      name: state.abbr,
      path: state.path,
      value: value,
      tooltip: tooltip,
      color: tileMapUtils.getColor( value )
    };
  } );
  return data;
}

module.exports = {
  formatDate: formatDate,
  originations: processNumOriginationsData,
  yoy: processYoyData,
  map: processMapData,
  getProjectedDate: getProjectedDate,
  getProjectedTimestamp: getProjectedTimestamp,
  convertDate: convertDate
};
