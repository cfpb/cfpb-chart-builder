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

    it( 'should return a human readable month and year string six months before the given timestamp', function() {
      expect( getProjectedDate( 946684800000, false ) )
        .to.equal( "November 1999" );
      expect( getProjectedDate( 1477958400000, false ) )
        .to.equal( "May 2016" );
    } );

  } );
  
} );
