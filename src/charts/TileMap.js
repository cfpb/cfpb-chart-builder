'use strict';

var d3 = require( 'd3' );
var CFPBChart = require( './CFPBChart' );
var stateCoords = require( '../utils/state-tile-coords' );
var fillByValue = require( '../utils/fill-by-value' );
var valueGrid;

TileMap.prototype = new CFPBChart();
TileMap.prototype.constructor = TileMap;

function TileMap( properties ) {
  this.selector = properties.selector;
  this.data = properties.data;
  this.type = 'TileMap';
  valueGrid = properties.valueGrid || undefined;


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
        tileWidth = Math.floor( tileGutterWidth - 2 - tileGutterWidth / 20 );

    var svg = d3.select( this.selector ) 
      .append( 'svg' )
        .attr( 'width', width + margin.left + margin.right)
        .attr( 'height', height + margin.top + margin.bottom)
      .append( 'g' )
        .attr( 'transform', 
              'translate( ' + margin.left + ',' + margin.top + ' )' );

    var tiles = svg.selectAll( 'g' )
      .data( data )
      .enter();

    tiles.append( 'rect' )
      .attr( 'x', function( d ) {
        return stateCoords(d.state)[0] * tileGutterWidth;
      } )
      .attr( 'y', function( d ) {
        return stateCoords(d.state)[1] * tileGutterWidth;
      } )
      .attr( 'width', tileWidth )
      .attr( 'height', tileWidth )
      .style( 'fill', function( d ) {
        return fillByValue( d.value, valueGrid )
      } )
      .style( 'stroke', '#75787B');

    tiles.append( 'text' )
      .attr( 'x', function( d ) {
        var x = stateCoords(d.state)[0] * tileGutterWidth;
        x += .5 * tileWidth;
        return x;
      } )
      .attr( 'y', function( d ) {
        var y = stateCoords(d.state)[1] * tileGutterWidth;
        y += tileWidth * .4;
        return y;
      } )
      .attr( 'width', tileWidth )
      .attr( 'height', tileWidth )
      .style( 'font-size', tileWidth * .25 + 'px' )
      .style( 'text-anchor', 'middle' )
      .text( function( d ) { return d.state; } );

    tiles.append( 'text' )
      .attr( 'x', function( d ) {
        var x = stateCoords(d.state)[0] * tileGutterWidth;
        x += .5 * tileWidth;
        return x;
      } )
      .attr( 'y', function( d ) {
        var y = stateCoords(d.state)[1] * tileGutterWidth;
        y += tileWidth * .8;
        return y;
      } )
      .attr( 'width', tileWidth )
      .attr( 'height', tileWidth )
      .style( 'font-size', tileWidth * .25 + 'px' )
      .style( 'text-anchor', 'middle' )
      .text( function( d ) {
        var val = Math.round( d.value * 100 );
        return val + '%';
      } );


    return svg;
  }

}

module.exports = TileMap;