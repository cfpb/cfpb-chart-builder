const calculation = require( '../../../src/js/utils/calculation' );

describe( 'calculation', () => {

  describe( 'calculation.convertDate', () => {

    /* 1485925200000 = February 2017
       1477958400000 = Nov 2016 */
    it( 'should convert a UTC timestamp in milliseconds to a ' +
        'human friendly month and year date', () => {
      expect( calculation.convertDate( 946684800000 ).humanFriendly )
        .toBe( 'January 2000' );
      expect( calculation.convertDate( 1477958400000 ).humanFriendly )
        .toBe( 'November 2016' );
      expect( calculation.convertDate( 1485925200000 ).humanFriendly )
        .toBe( 'February 2017' );

    } );

    it( 'should convert a UTC timestamp in milliseconds ' +
        'to a UTC timestamp in milliseconds', () => {
      expect( calculation.convertDate( 1477958400000 ).timestamp )
        .toBe( 1477958400000 );
    } );

    it( 'should convert a human friendly month and year date ' +
        'to a UTC timestamp in milliseconds', () => {
      expect( calculation.convertDate( 'January 2000' ).timestamp )
        .toBe( 946684800000 );
      expect( calculation.convertDate( 'November 2016' ).timestamp )
        .toBe( 1477958400000 );
      expect( calculation.convertDate( 'February 2017' ).timestamp )
        .toBe( 1485907200000 );
    } );

    it( 'should convert a human friendly date to a timestamp ' +
        'and back to a human friendly date', () => {
      const february = calculation.convertDate( 'February 2017' ).timestamp;
      expect( calculation.convertDate( february ).humanFriendly )
        .toBe( 'February 2017' );
    } );


    it( 'should convert a human friendly month ' +
        'and year date to a human friendly month and year date', () => {
      expect( calculation.convertDate( 'February 2017' ).humanFriendly )
        .toBe( 'February 2017' );
    } );

  } );

  describe( 'getFirstNumber', () => {

    it( 'should return the first number in an array of values', () => {
      const valToCheck = 2;
      const mockArray = [
        [ 'one', 'one' ],
        [ 'two', valToCheck ],
        [ 'three', '3' ]
      ];
      expect( calculation.getFirstNumber( mockArray ) ).toBe( valToCheck );
    } );

    it( 'should return false if a number was not found', () => {
      expect( calculation.getFirstNumber( [ 'one' ] ) ).toBe( false );
    } );

  } );
} );
