/* global describe it */

const chai = require( 'chai' );
const expect = chai.expect;
const calculation = require( '../../../src/js/utils/calculation' );

describe( 'calculation', () => {

  describe( 'getFirstNumber', () => {

    it( 'should return the first number in an array of values', () => {
      const valToCheck = 2;
      const mockArray = [
        [ 'one', 'one' ],
        [ 'two', valToCheck ],
        [ 'three', '3' ]
      ];
      expect( calculation.getFirstNumber( mockArray ) ).to.equal( valToCheck );
    } );

    it( 'should return false if a number was not found', () => {
      expect( calculation.getFirstNumber( [ 'one' ] ) ).to.equal( false );
    } );

  } );
} );
