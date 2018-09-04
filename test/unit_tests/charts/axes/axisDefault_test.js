/* global before describe it */
const chai = require( 'chai' );
const expect = chai.expect;
const axisDefault = require( '../../../../src/js/charts/axes/axisDefault' );

let UNDEFINED;

describe( 'axisDefault', () => {
  describe( 'yAxisOptions', () => {

    it( 'should return object without title', () => {
      expect( axisDefault.yAxisOptions().title.text ).to.equal( UNDEFINED );
    } );

    it( 'should return object with title when title is passed', () => {
      expect( axisDefault.yAxisOptions( 'test-title' ).title.text ).to.equal( 'test-title' );
    } );

  } );
} );
