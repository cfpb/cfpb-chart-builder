const processJSON = require( '../../../src/js/utils/process-json' );

describe( 'process-json', () => {

  const formatDate = processJSON.formatDate;
  const originations = processJSON.originations;
  const delinquencies = processJSON.delinquencies;
  const yoy = processJSON.yoy;
  const map = processJSON.map;
  const getProjectedDate = processJSON.getProjectedDate;
  const getProjectedTimestamp = processJSON.getProjectedTimestamp;
  const convertDate = processJSON.convertDate;

  describe( 'formatDate', () => {

    it( 'should convert a month index into the correct UTC timestamp in milliseconds representing January 1 2000', function() {
      expect( formatDate( 0 ) ).toBe( 946684800000 );
    } );

    it( 'should convert a month index into the correct UTC timestamp in milliseconds representing November 1st 2016', function() {
      expect( formatDate( 202 ) ).toBe( 1477958400000 );
    } );

  } );

  describe( 'convertDate', () => {

    /* 1485925200000 = February 2017
       1477958400000 = Nov 2016 */
    it( 'should convert a UTC timestamp in milliseconds to a human friendly month and year date', function() {
      expect( convertDate( 946684800000 ).humanFriendly )
        .toBe( 'January 2000' );
      expect( convertDate( 1477958400000 ).humanFriendly )
        .toBe( 'November 2016' );
      expect( convertDate( 1485925200000 ).humanFriendly )
        .toBe( 'February 2017' );

    } );

    it( 'should convert a UTC timestamp in milliseconds to a UTC timestamp in milliseconds', function() {
      expect( convertDate( 1477958400000 ).timestamp ).toBe( 1477958400000 );
    } );

    it( 'should convert a human friendly month and year date to a UTC timestamp in milliseconds', function() {
      expect( convertDate( 'January 2000' ).timestamp ).toBe( 946684800000 );
      expect( convertDate( 'November 2016' ).timestamp ).toBe( 1477958400000 );
      expect( convertDate( 'February 2017' ).timestamp ).toBe( 1485907200000 );
    } );

    it( 'should convert a human friendly date to a timestamp and back to a human friendly date', function() {
      const february = convertDate( 'February 2017' ).timestamp;
      expect( convertDate( february ).humanFriendly ).toBe( 'February 2017' );
    } );


    it( 'should convert a human friendly month and year date to a human friendly month and year date', function() {
      expect( convertDate( 'February 2017' ).humanFriendly )
        .toBe( 'February 2017' );
    } );

  } );

  describe( 'getProjectedDate', () => {

    it( 'should return a human readable month and year string one month before the given timestamp', function() {
      expect( getProjectedDate( 1483228800000 ) ).toBe( 'December 2016' );
    } );

    it( 'should return a human readable month and year string one month before the given timestamp', function() {
      expect( getProjectedDate( 1477958400000 ) ).toBe( 'October 2016' );
    } );

    it( 'should return a human readable month and year string one month before the given timestamp', function() {
      expect( getProjectedDate( 1485925200000 ) ).toBe( 'January 2017' );
    } );

  } );

  describe( 'getProjectedTimestamp', () => {

    it( 'should return UTC timestamp for the first month of the projected data, six months before given UTC date, given at least six months of data', function() {

      const dataList = [
        [ 1477958400000, 1 ], // nov 16
        [ 1480550400000, 2 ], // dec
        [ 1483228800000, 3 ], // jan 17
        [ 1485907200000, 4 ], // feb
        [ 1488326400000, 5 ], // mar
        [ 1491004800000, 6 ], // apr
        [ 1493596800000, 7 ], // may
        [ 1496275200000, 8 ], // june
        [ 1498867200000, 9 ], // july
        [ 1501545600000, 10 ] // aug
      ];

      // Expect to be march.
      expect( getProjectedTimestamp( dataList ) ).toBe( 1488326400000 );
    } );

  } );

  describe( 'processYoyData', () => {
    const data = {
      test: [
        [ 1117584000000, 100 ], // jun 2005
        [ 1230768000000, 0.1 ], // jan 2009
        [ 1233446400000, -0.2 ], // feb 2009
        [ 1235865600000, 0.25 ], // march 2009
        [ 1238544000000, 0 ], // apr 2009
        [ 1241136000000, -0.1 ], // may 2009
        [ 1243814400000, 1.44 ], // june 2009
        [ 1246406400000, 0.92 ], // july 2009
        [ 1249084800000, 0.01 ], // aug 2009
        [ 1251763200000, 0.95 ], // sept 2009
        [ 1254355200000, 0.05 ], // oct 2009
        [ 1257033600000, 0.93 ], // nov 2009
        [ 1259625600000, 0.33 ] // dec 2009
      ]
    };
    const test = yoy( data, 'test' );

    it( 'should eliminate dates before 2009', () => {
      expect( test[0][0] ).toBe( 1230768000000 );
    } );

    it( 'should identify and select the proper group', () => {
      expect( test[0][0] ).toBe( 1230768000000 );
    } );

    it( 'should convert decimals to percentages', () => {
      expect( test[0][1] ).toBe( 10 );
      expect( test[1][1] ).toBe( -20 );
    } );

    it( 'should assign the correct projected Dates', () => {
      expect( test.projectedDate.timestamp ).toBe( 1246406400000 ); // July 2009
      expect( test[test.length - 6][1] ).toBe( 92 ); // July 2009
      expect( test.projectedDate.label ).toBe( 'June 2009' ); // June 2009, the label uses the last month of data that isn't projected. For projected data starting with July, the label should say June.
    } );

  } );

  describe( 'processNumOriginationsData', () => {
    const data = {
      test: {
        adjusted: [
          [ 1117584000000, 1 ],
          [ 1230768000000, 1239123 ],
          [ 1233446400000, 888888 ],
          [ 1235865600000, 1231125 ],
          [ 1238544000000, 82364821 ],
          [ 1241136000000, 7654321 ],
          [ 1243814400000, 1234567 ],
          [ 1246406400000, 1212123 ],
          [ 1249084800000, 3434343 ]
        ],
        unadjusted: [
          [ 1117584000000, 1 ],
          [ 1230768000000, 1239123 ],
          [ 1233446400000, 888888 ],
          [ 1235865600000, 1231125 ],
          [ 1238544000000, 82364821 ],
          [ 1241136000000, 7654321 ],
          [ 1243814400000, 1234567 ],
          [ 1246406400000, 1212123 ],
          [ 1249084800000, 3434343 ]
        ]
      }
    };
    const test = originations( data, 'test' );

    it( 'should eliminate dates before 2009', () => {
      expect( test.adjusted[0][0] ).toBe( 1230768000000 );
    } );

    it( 'should identify and select the proper group', () => {
      expect( test.adjusted[0][0] ).toBe( 1230768000000 );
    } );

    it( 'should assign the correct projected Dates', () => {
      expect( test.projectedDate.timestamp ).toBe( 1235865600000 );
      expect( test.projectedDate.label ).toBe( 'February 2009' );
    } );

  } );

  describe( 'processMapData', () => {
    const data = [
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
    const test = map( data );


    it( 'should get the correct path for a state', () => {
      expect( test[0].name ).toBe( 'AL' );
      expect( test[0].path ).toBe( 'M550,-337L633,-337,633,-253,550,-253,550,-337' );
    } );

    it( 'should round values', () => {
      expect( test[0].name ).toBe( 'AL' );
      expect( test[0].value ).toBe( 143 );
      expect( test[1].name ).toBe( 'AK' );
      expect( test[1].value ).toBe( 92 );
      expect( test[2].name ).toBe( 'AZ' );
      expect( test[2].value ).toBe( 73 );
    } );

    it( 'should add the correct tooltip', () => {
      expect( test[0].name ).toBe( 'AL' );
      expect( test[0].tooltip ).toBe( 'AL increased by 143%' );
    } );

  } );

  describe( 'processDelinquencies', () => {

    const data = [
      {
        meta: {
          name: 'New York, NY'
        },
        data: [ {
          date: 1199163600000,
          value: 0.129563846384
        } ]
      },
      {
        meta: {
          name: 'Miami, FL'
        },
        data: [ {
          date: 1199163600000,
          value: 0.546287382733
        } ]
      }
    ];

    it( 'assign a label', () => {
      const test = delinquencies( data );
      expect( test[0].label ).toBe( 'New York, NY' );
      expect( test[1].label ).toBe( 'Miami, FL' );
    } );

    it( 'filter delinquencies', () => {
      const test = delinquencies( data );
      expect( test[0].data[0][1] ).toBe( 0.129563846384 );
    } );

  } );

} );
