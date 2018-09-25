const processJSON = require( '../../../src/js/utils/process-json' );

describe( 'process-json', () => {

  const originations = processJSON.originations;
  const delinquencies = processJSON.delinquencies;
  const yoy = processJSON.yoy;
  const map = processJSON.map;
  const getProjectedDate = processJSON.getProjectedDate;
  const getProjectedTimestamp = processJSON.getProjectedTimestamp;

  let data;
  let testData;

  describe( 'getProjectedDate', () => {

    it( 'should return a human readable month ' +
        'and year string one month before the given timestamp', () => {
      expect( getProjectedDate( 1483228800000 ) ).toBe( 'December 2016' );
    } );

    it( 'should return a human readable month ' +
        'and year string one month before the given timestamp', () => {
      expect( getProjectedDate( 1477958400000 ) ).toBe( 'October 2016' );
    } );

    it( 'should return a human readable month ' +
        'and year string one month before the given timestamp', () => {
      expect( getProjectedDate( 1485925200000 ) ).toBe( 'January 2017' );
    } );

  } );

  describe( 'getProjectedTimestamp', () => {
    beforeEach( () => {
      data = [
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
    } );

    it( 'should return UTC timestamp for ' +
        'the first month of the projected data, ' +
        'six months before given UTC date, ' +
        'given at least six months of data ' +
        'and no projectedRange argument', () => {
      // Expect to be march.
      expect( getProjectedTimestamp( data ) ).toBe( 1488326400000 );
    } );

    it( 'should return UTC timestamp for ' +
        'the first month of the projected data, ' +
        'for the specified number of months before the given UTC date', () => {
      // march
      expect( getProjectedTimestamp( data, 6 ) ).toBe( 1488326400000 );
      // may
      expect( getProjectedTimestamp( data, 4 ) ).toBe( 1493596800000 );
      // aug
      expect( getProjectedTimestamp( data, 1 ) ).toBe( 1501545600000 );
    } );

    it( 'should return undefined if given a value of 0 months projected', () => {
      expect( getProjectedTimestamp( data, 0 ) ).toBeUndefined();
    } );

  } );

  describe( 'processYoyData', () => {
    beforeEach( () => {
      data = {
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
      testData = yoy( data, 'test' );
    } );

    it( 'should eliminate dates before 2009', () => {
      expect( testData[0][0] ).toBe( 1230768000000 );
    } );

    it( 'should identify and select the proper group', () => {
      expect( testData[0][0] ).toBe( 1230768000000 );
    } );

    it( 'should convert decimals to percentages', () => {
      expect( testData[0][1] ).toBe( 10 );
      expect( testData[1][1] ).toBe( -20 );
    } );

    it( 'should assign the correct projected dates, 6 months back', () => {
      // July 2009
      expect( testData.projectedDate.timestamp ).toBe( 1246406400000 );
      // July 2009
      expect( testData[testData.length - 6][1] ).toBe( 92 );

      /* June 2009, the label uses the last month of data that isn't projected.
         For projected data starting with July, the label should say June. */
      expect( testData.projectedDate.label ).toBe( 'June 2009' );
    } );

  } );

  describe( 'processNumOriginationsData', () => {
    beforeEach( () => {
      data = {
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
      testData = originations( data, 'test', 'inq_test_file.csv' );
    } );

    it( 'should eliminate dates before 2009', () => {
      expect( testData.adjusted[0][0] ).toBe( 1230768000000 );
    } );

    it( 'should identify and select the proper group', () => {
      expect( testData.adjusted[0][0] ).toBe( 1230768000000 );
    } );

    it( 'should assign the correct projected dates, ' +
        '4 months for inquiry index charts', () => {
      expect( testData.projectedDate.timestamp ).toBe( 1241136000000 );
      expect( testData.projectedDate.label ).toBe( 'April 2009' );
    } );

    it( 'should assign the correct projected dates, ' +
        '0 months for credit tightness charts', () => {
      const testDataTightness = originations( data, 'test', 'crt_test_file.csv' );
      expect( testDataTightness.projectedDate.timestamp ).toBeUndefined();
      expect( testDataTightness.projectedDate.label ).toBeNull();
    } );

    it( 'should assign the correct projected dates, ' +
        '6 months for all other charts', () => {
      const testDataOther = originations( data, 'test', 'other.csv' );
      expect( testDataOther.projectedDate.timestamp ).toBe( 1235865600000 );
      expect( testDataOther.projectedDate.label ).toBe( 'February 2009' );
    } );
  } );

  describe( 'processMapData', () => {
    beforeEach( () => {
      data = [
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
      testData = map( data );
    } );

    it( 'should get the correct path for a state', () => {
      expect( testData[0].name ).toBe( 'AL' );
      expect( testData[0].path )
        .toBe( 'M550,-337L633,-337,633,-253,550,-253,550,-337' );
    } );

    it( 'should round values', () => {
      expect( testData[0].name ).toBe( 'AL' );
      expect( testData[0].value ).toBe( 143 );
      expect( testData[1].name ).toBe( 'AK' );
      expect( testData[1].value ).toBe( 92 );
      expect( testData[2].name ).toBe( 'AZ' );
      expect( testData[2].value ).toBe( 73 );
    } );

    it( 'should add the correct tooltip', () => {
      expect( testData[0].name ).toBe( 'AL' );
      expect( testData[0].tooltip ).toBe( 'AL increased by 143%' );
    } );

  } );

  describe( 'processDelinquencies', () => {
    beforeEach( () => {
      data = [
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
    } );

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
