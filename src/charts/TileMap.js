'use strict';

var d3 = require( 'd3' );
var CFPBChart = require( './CFPBChart' );
var stateCoords = require( '../utils/stateTileCoords' );


TileMap.prototype = new CFPBChart();
TileMap.prototype.constructor = TileMap;

function TileMap( options ) {
  this.selector = options.selector;
  this.data = options.data;
  this.type = 'TileMap';


  this.drawGraph = function( options ) {
    var data = this.data;

    // variables from options
    var baseWidth = options.baseWidth || 200,
        baseHeight = options.baseHeight || 100,
        paddingDecimal = options.paddingDecimal || .1,
        margin = options.margin || {top: 20, right: 20, bottom: 20, left: 20};

    // calculated variables
    var width = baseWidth - margin.left - margin.right,
        height = baseHeight - margin.top - margin.bottom,
        tileGutterWidth = Math.floor( width / 11 ),
        tileWidth = Math.floor( width / 11 - width / 100 );

    var svg = d3.select( this.selector ) 
      .append( 'svg' )
        .attr( 'width', width + margin.left + margin.right)
        .attr( 'height', height + margin.top + margin.bottom)
      .append( 'g' )
        .attr( 'transform', 
              'translate( ' + margin.left + ',' + margin.top + ' )' );

    var tiles = svg.selectAll( 'g' )
      .data( data )
      .enter()

    tiles.append( 'rect' )
      .attr( 'x', function( d ) {
        return stateCoords(d.state)[0] * tileGutterWidth;
      } )
      .attr( 'y', function( d ) {
        return stateCoords(d.state)[1] * tileGutterWidth;
      } )
      .attr( 'width', tileWidth )
      .attr( 'height', tileWidth )
      .style( 'fill', '#2CB34A');

    tiles.append( 'text' )
      .attr( 'x', function( d ) {
        var x = stateCoords(d.state)[0] * tileGutterWidth;
        x += .5 * tileWidth;
        return x;
      } )
      .attr( 'y', function( d ) {
        var y = stateCoords(d.state)[1] * tileGutterWidth;
        y += tileWidth * 1/3;
        return y;
      } )
      .attr( 'width', tileWidth )
      .attr( 'height', tileWidth )
      .style( 'font-size', tileWidth / 3 + 'px' )
      .style( 'text-anchor', 'middle' )
      .style( 'border', '1px solid #BABBBD')
      .text( function( d ) { return d.state; } );

    return svg;
  }

}

module.exports = TileMap;