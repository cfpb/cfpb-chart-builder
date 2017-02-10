'use strict';

var chai = require( 'chai' );
var expect = chai.expect;
var processCsv =
  require( '../../../src/static/js/utils/process-csv' );

describe( 'process-csv', function() { // eslint-disable-line max-statements, no-inline-comments, max-len

  var formatDate = processCsv.formatDate;
  var originations = processCsv.processNumOriginationsData;
  var yoy = processCsv.processYoyData;
  var map = processCsv.processMapData;
  var getProjectedDate = processCsv.getProjectedDate;
  var getProjectedTimestamp = processCsv.getProjectedTimestamp;


  describe( 'formatDate', function() { // eslint-disable-line max-len

    it( 'should convert a month index into the correct UTC timestamp in milliseconds representing January 1 2000', function() {
      expect( formatDate( 0 ) )
        .to.equal( 946684800000 );
    } );

    it( 'should convert a month index into the correct UTC timestamp in milliseconds representing November 1st 2016', function() {
      expect( formatDate( 202 ) )
        .to.equal( 1477958400000 );
    } );

  } );

  describe( 'getProjectedDate', function() {

    it( 'should return a human readable month and year string one month before the given timestamp', function() {
      expect( getProjectedDate( 1477958400000 ) )
        .to.equal( "October 2016" );
    } );

  } );

  describe( 'getProjectedTimestamp', function() {

    it( 'should return UTC timestamp for the first month of the projected data, six months before given UTC date', function() {

      var dataList = [[1477958400000, 0.5]]

      expect( getProjectedTimestamp( dataList, false ) )
        .to.equal( 1464818428800 );
    } );

  } );
  
} );
