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
      expect( axisOriginations.yAxisOptions( 'test-title' ).title.text )
        .to.equal( 'test-title' );
    } );

    it( 'should return object with title in millions', () => {
      const mockData = [ [ 'one', 1 ] ];
      const opts = axisOriginations.yAxisOptions( null, mockData );
      expect( opts.title.text )
        .to.equal( 'Number of originations (in millions)' );
    } );

    it( 'should return object with title in billions', () => {
      const mockData = [ [ 'one', 1000000000000 ] ];
      const opts = axisOriginations.yAxisOptions( null, mockData );
      expect( opts.title.text )
        .to.equal( 'Volume of originations (in billions)' );
    } );

  } );
} );
