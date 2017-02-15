'use strict';

var chai = require( 'chai' );
var expect = chai.expect;
var tileMap =
  require( '../../../src/static/js/utils/tile-map' );

describe( 'tile-map', function() {

  var getColor = tileMap.getColor;

  describe( 'getColor', function() {

    it( 'should return the correct color HEX code for any given number', function() {
      expect( getColor( -200 ) ).to.equal( '#96c4ed' );
      expect( getColor( -6 ) ).to.equal( '#d6e8fa' );
      expect( getColor( -5 ) ).to.equal( '#f7f8f9' );
      expect( getColor( 0 ) ).to.equal( '#f7f8f9' );
      expect( getColor( 10 ) ).to.equal( '#e2efd8' );
      expect( getColor( 20 ) ).to.equal( '#bae0a2' );
      expect( getColor( 200 ) ).to.equal( '#bae0a2' );
    } );

  } );
  
} );