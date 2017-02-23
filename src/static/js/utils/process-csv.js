'use strict';

//
// This data processing will eventually happen on the server.
// When we finish those scripts we will no longer need this file.
//

/**
*   Polyfill for Object.create()
*   use this to create new objects
*/
if (!Object.create) {
  Object.create = function (o) {
    if (arguments.length > 1) {
      throw new Error('Sorry the polyfill Object.create only accepts the first parameter.');
    }
    function F() {}
    F.prototype = o;
    return new F();
  };
}

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



var Papa = require( 'papaparse' );
var tileMapUtils = require( './tile-map' );

/**
 * Returns an object with the UTC timestamp number in milliseconds and human-friendly month and year for a given date in either format
 *
 * @param {Number} index - counter starting at 0 representing the month and year for a data point. 0 is January 2000, 1 is February 2000, etc.
 * @returns {Number} UTC timestamp in milliseconds representing the month and year for the given date index.
 */
function formatDate( index ) {
  var year = Math.floor( index / 12 ) + 2000;
  var month = index % 12;

  var theDate = Date.UTC( year, month );

  return theDate;
}

/**
 * Returns an object with the UTC timestamp number in milliseconds and human-friendly month and year for a given date in either format
 *
 * @param {(number|string)} date - UTC timestamp in milliseconds representing the month and year for a given data point, e.g. 1477958400000, OR a string in Month + YYYY format for a given data point, e.g. "January 2000"
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
  };
}

/**
 * Returns a data object with data starting in January 2009 for use in all line charts
 *
 * @param {Number} csv - response from requested CSV file
 * @param {String} group - optional parameter for specifying if the chart requires use of a "group" column in the CSV, for example the charts with a group of "Younger than 30" will filter data to only include values matching that group
 * @returns {Obj} data - object with adjusted and unadjusted value arrays containing timestamps and a number value
 */
function processNumOriginationsData( csv, group ) {
  var data = {
    unadjusted: [],
    adjusted: []
  };
  csv = Papa.parse( csv ).data;
  csv.shift();

  for ( var x = 0; x < csv.length; x++ ) {
    var dataPoint = csv[x];
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
  }
  data.unadjusted = data.unadjusted.sort( function( a, b ) {
    return a[0] - b[0];
  } );
  data.adjusted = data.adjusted.sort( function( a, b ) {
    return a[0] - b[0];
  } );

  data.projectedDate = {};
  data.projectedDate.timestamp = getProjectedTimestamp( data.adjusted );
  data.projectedDate.label = getProjectedDate( data.projectedDate.timestamp );

  return data;
}

/**
 * Returns a data object with data starting in January 2009 for use in all bar charts
 *
 * @param {Number} csv - response from requested CSV file
 * @param {String} group - optional parameter for specifying if the chart requires use of a "group" column in the CSV, for example the charts with a group of "Younger than 30" will filter data to only include values matching that group
 * @returns {Obj} data - object with adjusted and unadjusted value arrays containing timestamps and a number value
 */
function processYoyData( csv, group ) {
  var data = {
    values: [],
    projectedDate: null
  };
  csv = Papa.parse( csv ).data;

  for ( var x = 0; x < csv.length; x++ ) {
    var dataPoint = csv[x];
    if ( dataPoint[2] === group ) {
      var date = formatDate( dataPoint[0] );
      if ( date > Date.UTC( 2008, 11 ) ) {
        data.values.push( [ formatDate( dataPoint[0] ), Number( dataPoint[1] ) * 100 ] );
      }
    }

  }

  data.projectedDate = {};
  data.projectedDate.timestamp = getProjectedTimestamp( data.values );
  data.projectedDate.label = getProjectedDate( data.projectedDate.timestamp );

  return data;
}

/**
 * Returns a UTC timestamp number for the month when each graph's data is projected
 *
 * @param {Array} valuesList - list of values from the data, containing an array with timestamp representing the month and year at index 0, and the value at index 1
 * @returns {Number} a timestamp.
 */
function getProjectedTimestamp( valuesList ) {
  var mostRecentMonthOfDataAvailable = valuesList[valuesList.length - 1][0];

  /*
  152.083 days = 5 months to represent six months ago. We count 5 months back, because the timestamps are the first of each month:
  0 - november 1
  1 month - october 1
  2 - sept 1
  3 - aug 1
  4 - jul 1
  5 - june 1
  For data through November, months AFTER May are projected. June through November should be projected in the UI.
  */
  var projectedThreshold = 60 * 60 * 24 * 152.083 * 1000;

  return mostRecentMonthOfDataAvailable - projectedThreshold;
}

/**
 * Returns a human-readable string representing the month and year after which data in each graph is projected
 *
 * @param {Number} timestamp - UTC timestamp representing the milliseconds elapsed since the UNIX epoch, for the month when each graph begins displaying projected data
 * @returns {String} projectedDate - text with the Month and Year of the projected data cutoff point, for use in labeling projected date in graphs
 */
function getProjectedDate( timestamp ) {

  var getDate = new Date( timestamp );
  getDate.setUTCMonth( getDate.getUTCMonth() - 1 );
  var projectedDate = convertDate( getDate.getTime() ).humanFriendly;

  return projectedDate;
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