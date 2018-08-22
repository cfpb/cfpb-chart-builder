/* global before describe it */
const chai = require( 'chai' );
const expect = chai.expect;
const axisInquiries = require( '../../../../src/js/charts/axes/axisInquiries' );

describe( 'axisInquiries', () => {
  describe( 'yAxisOptions', () => {

    it( 'should return object with default title', () => {
      expect( axisInquiries.yAxisOptions().title.text ).to.equal( 'Index (January 2009 = 100)' );
    } );

    it( 'should return object with title when title is passed', () => {
      expect( axisInquiries.yAxisOptions( 'test-title' ).title.text ).to.equal( 'test-title' );
    } );

  } );
} );
