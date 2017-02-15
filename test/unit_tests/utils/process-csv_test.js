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
  var convertDate = processCsv.convertDate;


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

  describe( 'convertDate', function() {

// 1485925200000 = February 2017
// 1477958400000 = Nov 2016
    
    it( 'should convert a UTC timestamp in milliseconds to a human friendly month and year date', function() {
      expect( convertDate( 946684800000 ).humanFriendly )
        .to.equal( 'January 2000' );
      expect( convertDate( 1477958400000 ).humanFriendly )
        .to.equal( 'November 2016' );
      expect( convertDate( 1485925200000 ).humanFriendly )
        .to.equal( 'February 2017' );

    } );

    it( 'should convert a UTC timestamp in milliseconds to a UTC timestamp in milliseconds', function() {
      expect( convertDate( 1477958400000 ).timestamp )
        .to.equal( 1477958400000 );
    } );

    it( 'should convert a human friendly month and year date to a UTC timestamp in milliseconds', function() {
      expect( convertDate( 'January 2000' ).timestamp )
        .to.equal( 946684800000 );
      expect( convertDate( 'November 2016' ).timestamp )
        .to.equal( 1477958400000 );
      expect( convertDate( 'February 2017' ).timestamp )
        .to.equal( 1485907200000 );
    } );

    it( 'should convert a human friendly date to a timestamp and back to a human friendly date', function() {
      var february = convertDate( 'February 2017' ).timestamp;
      expect( convertDate( february ).humanFriendly )
        .to.equal( 'February 2017' );
    } );


    it( 'should convert a human friendly month and year date to a human friendly month and year date', function() {

      expect( convertDate( 'February 2017' ).humanFriendly )
        .to.equal( 'February 2017' );
    } );

  });

  describe( 'getProjectedDate', function() {

    it( 'should return a human readable month and year string one month before the given timestamp', function() {
      expect( getProjectedDate( 1483228800000 ) )
        .to.equal( "December 2016" );
    } );

    it( 'should return a human readable month and year string one month before the given timestamp', function() {
      expect( getProjectedDate( 1477958400000 ) )
        .to.equal( "October 2016" );
    } );

    it( 'should return a human readable month and year string one month before the given timestamp', function() {
      expect( getProjectedDate( 1485925200000 ) )
        .to.equal( "January 2017" );
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
