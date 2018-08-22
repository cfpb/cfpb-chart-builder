/* global before describe it */
const chai = require( 'chai' );
const expect = chai.expect;
const axisOriginations = require( '../../../../src/js/charts/axes/axisOriginations' );

describe( 'axisOriginations', () => {
  describe( 'yAxisOptions', () => {

    it( 'should return object with default title', () => {
      expect( axisOriginations.yAxisOptions().title.text ).to.equal( 'Values' );
    } );

    it( 'should return object with title when title is passed', () => {
      expect( axisOriginations.yAxisOptions( 'test-title' ).title.text ).to.equal( 'test-title' );
    } );

  } );
} );
