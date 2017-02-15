'use strict';

var chai = require( 'chai' );
var expect = chai.expect;
var getColorScheme =
  require( '../../../src/static/js/utils/get-color-scheme' );

describe( 'get-color-scheme', function() {

  it( 'should return the correct color HEX codes for the blue color scheme', function() {
    expect( getColorScheme( 'blue' ).primary ).to.equal( '#0072ce' );
    expect( getColorScheme( 'blue' ).secondary ).to.equal( '#7eb7e8' );
    expect( getColorScheme( 'green' ).primary ).to.not.equal( '#0072ce' );
  } );

  it( 'should return the correct color HEX codes for the green color scheme', function() {
    expect( getColorScheme( 'green' ).primary ).to.equal( '#20aa3f' );
    expect( getColorScheme( 'green' ).secondary ).to.equal( '#addc91' );
    expect( getColorScheme( 'teal' ).secondary ).to.not.equal( '#addc91' );
  } );

  it( 'should return the correct color HEX codes for the navy color scheme', function() {
    expect( getColorScheme( 'navy' ).primary ).to.equal( '#254b87' );
    expect( getColorScheme( 'navy' ).secondary ).to.equal( '#889cc0' );
    expect( getColorScheme( 'navy' ).primary ).to.not.equal( '#889cc0' );
  } );

  it( 'should return the correct color HEX codes for the teal color scheme', function() {
    expect( getColorScheme( 'teal' ).primary ).to.equal( '#257675' );
    expect( getColorScheme( 'teal' ).secondary ).to.equal( '#89b6b5' );
    expect( getColorScheme( 'navy' ).primary ).to.not.equal( '#257675' );
  } );


  
} );
