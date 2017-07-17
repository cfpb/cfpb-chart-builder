'use strict';

var chai = require( 'chai' );
var expect = chai.expect;
var processJSON =
  require( '../../../src/static/js/utils/process-json' );

describe( 'process-json', function() { // eslint-disable-line max-statements, no-inline-comments, max-len

  var formatDate = processJSON.formatDate;
  var originations = processJSON.originations;
  var yoy = processJSON.yoy;
  var map = processJSON.map;
  var getProjectedDate = processJSON.getProjectedDate;
  var getProjectedTimestamp = processJSON.getProjectedTimestamp;
  var convertDate = processJSON.convertDate;


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

  } );

  describe( 'getProjectedDate', function() {

    it( 'should return a human readable month and year string one month before the given timestamp', function() {
      expect( getProjectedDate( 1483228800000 ) )
        .to.equal( 'December 2016' );
    } );

    it( 'should return a human readable month and year string one month before the given timestamp', function() {
      expect( getProjectedDate( 1477958400000 ) )
        .to.equal( 'October 2016' );
    } );

    it( 'should return a human readable month and year string one month before the given timestamp', function() {
      expect( getProjectedDate( 1485925200000 ) )
        .to.equal( 'January 2017' );
    } );

  } );

  describe( 'getProjectedTimestamp', function() {

    it( 'should return UTC timestamp for the first month of the projected data, six months before given UTC date', function() {

      var dataList = [ [ 0, 0.5 ], [ 0, 0.5 ], [ 1477958400000, 0.5 ] ];

      expect( getProjectedTimestamp( dataList ) )
        .to.equal( 1464818428800 );
    } );

  } );

  describe( 'processYoyData', function() {
    var data = {
      test: [
          [ 1117584000000, 100 ],
          [ 1230768000000, 0.1 ], [ 1233446400000, -0.2 ],
          [ 1235865600000, 0.25 ], [ 1238544000000, 0 ],
          [ 1241136000000, -0.1 ], [ 1243814400000, 1.44 ],
          [ 1246406400000, 0.9 ], [ 1249084800000, 0.01 ]
      ]
    };
    data = JSON.stringify( data );
    var test = yoy( data, 'test' );

    it( 'should eliminate dates before 2009', function() {
      expect( test[0][0] ).to.equal( 1230768000000 );
    } );

    it( 'should identify and select the proper group', function() {
      expect( test[0][0] ).to.equal( 1230768000000 );
    } );

    it( 'should convert decimals to percentages', function() {
      expect( test[0][1] ).to.equal( 10 );
      expect( test[1][1] ).to.equal( -20 );
    } );

    it( 'should assign the correct projected Dates', function() {
      expect( test.projectedDate.timestamp ).to.equal( 1235944828800 );
      expect( test.projectedDate.label ).to.equal( 'February 2009' );
    } );

  } );

  describe( 'processNumOriginationsData', function() {
    var data = {
      test: {
        adjusted: [
            [ 1117584000000, 1 ],
            [ 1230768000000, 1239123 ], [ 1233446400000, 888888 ],
            [ 1235865600000, 1231125 ], [ 1238544000000, 82364821 ],
            [ 1241136000000, 7654321 ], [ 1243814400000, 1234567 ],
            [ 1246406400000, 1212123 ], [ 1249084800000, 3434343 ]
        ],
        unadjusted: [
            [ 1117584000000, 1 ],
            [ 1230768000000, 1239123 ], [ 1233446400000, 888888 ],
            [ 1235865600000, 1231125 ], [ 1238544000000, 82364821 ],
            [ 1241136000000, 7654321 ], [ 1243814400000, 1234567 ],
            [ 1246406400000, 1212123 ], [ 1249084800000, 3434343 ]
        ]
      }
    };
    data = JSON.stringify( data );
    var test = originations( data, 'test' );

    it( 'should eliminate dates before 2009', function() {
      expect( test.adjusted[0][0] ).to.equal( 1230768000000 );
    } );

    it( 'should identify and select the proper group', function() {
      expect( test.adjusted[0][0] ).to.equal( 1230768000000 );
    } );

    it( 'should assign the correct projected Dates', function() {
      expect( test.projectedDate.timestamp ).to.equal( 1235944828800 );
      expect( test.projectedDate.label ).to.equal( 'February 2009' );
    } );

  } );

  describe( 'processMapData', function() {
    var data = [
      {
        name: 'AL',
        value: '142.84'
      },
      {
        name: 'AK',
        value: '91.98'
      },
      {
        name: 'AZ',
        value: '73.14'
      },
      {
        name: 'AR',
        value: '70.41'
      }
    ];
    data = JSON.stringify( data );
    var test = map( data );


    it( 'should get the correct path for a state', function() {
      expect( test[0].name ).to.equal( 'AL' );
      expect( test[0].path ).to.equal( 'M550,-337L633,-337,633,-253,550,-253,550,-337' );
    } );

    it( 'should round values', function() {
      expect( test[0].name ).to.equal( 'AL' );
      expect( test[0].value ).to.equal( 143 );
      expect( test[1].name ).to.equal( 'AK' );
      expect( test[1].value ).to.equal( 92 );
      expect( test[2].name ).to.equal( 'AZ' );
      expect( test[2].value ).to.equal( 73 );
    } );

    it( 'should add the correct tooltip', function() {
      expect( test[0].name ).to.equal( 'AL' );
      expect( test[0].tooltip ).to.equal( 'AL increased by 143%' );
    } );

  } );

} );
