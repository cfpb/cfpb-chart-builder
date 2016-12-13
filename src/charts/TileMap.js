'use strict';

var d3 = require( 'd3' );
var CFPBChart = require( './CFPBChart' );
var stateCoords = require( '../utils/state-tile-coords' );
var fillByValue = require( '../utils/fill-by-value' );
var valueGrid,
    legendLabels;

TileMap.prototype = new CFPBChart();
TileMap.prototype.constructor = TileMap;

function TileMap( properties ) {
  this.selector = properties.selector;
  this.data = properties.data;
  this.type = 'TileMap';
  valueGrid = properties.valueGrid || [];
  legendLabels = properties.legendLabels || [];


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
        .classed( 'tiles' , true )
        .attr( 'transform', 
              'translate( ' + margin.left + ',' + margin.top + ' )' );

    // Add legend group
    svg.append( 'g' )
        .classed( 'legend' , true );

    var legend = svg.selectAll('.legend');

    var tiles = svg.selectAll( '.tiles' )
      .data( data )
      .enter();

    tiles.append( 'rect' )
      .filter( function( d ) { return stateCoords( d.state ) !== false; } )
      .attr( 'x', function( d ) {
        return stateCoords( d.state )[0] * tileGutterWidth;
      } )
      .attr( 'y', function( d ) {
        return stateCoords(d.state)[1] * tileGutterWidth + 60;
      } )
      .attr( 'width', tileWidth )
      .attr( 'height', tileWidth )
      .style( 'fill', function( d ) {
        return fillByValue( d.value, valueGrid )
      } )
      .style( 'stroke', '#75787B');

    tiles.append( 'text' )
      .filter( function( d ) { return stateCoords( d.state ) !== false; } )
      .attr( 'x', function( d ) {
        var x = stateCoords(d.state)[0] * tileGutterWidth;
        x += .5 * tileWidth;
        return x;
      } )
      .attr( 'y', function( d ) {
        var y = stateCoords(d.state)[1] * tileGutterWidth + 60;
        y += tileWidth * .4;
        return y;
      } )
      .attr( 'width', tileWidth )
      .attr( 'height', tileWidth )
      .attr( 'class', 'state-abbreviation' )
      .style( 'font-size', tileWidth * .25 + 'px' )
      .style( 'text-anchor', 'middle' )
      .text( function( d ) { return d.state; } );

    tiles.append( 'text' )
      .filter( function( d ) { return stateCoords( d.state ) !== false; } )
      .attr( 'x', function( d ) {
        var x = stateCoords(d.state)[0] * tileGutterWidth;
        x += .5 * tileWidth;
        return x;
      } )
      .attr( 'y', function( d ) {
        var y = stateCoords(d.state)[1] * tileGutterWidth + 60;
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

    // draw the legend, rectangles
    for ( var x = 0; x < valueGrid.length; x++ ) {
      legend.append( 'rect' )
        .attr( 'x', x * tileWidth + 15 )
        .attr( 'y', 0 )
        .attr( 'width', tileWidth )
        .attr( 'height', 10 )
        .attr( 'fill', valueGrid[x].fillColor )
        .style( 'stroke', '#75787B');
    }

    // draw the legend, text labels
    for ( var x = 0; x < legendLabels.length; x++ ) {
      legend.append( 'text' )
        .attr( 'x', x * tileWidth + 15 )
        .attr( 'y', 20 + tileWidth * .125 )
        .attr( 'width', tileWidth )
        .attr( 'height', 30 )
        .style( 'font-size', tileWidth * .25 + 'px' )
        .style( 'text-anchor', 'middle' )
        .style( 'fill', '#75787B')
        .text( legendLabels[x] )
    }

    return svg;
  }

}

module.exports = TileMap;
