'use strict';

var d3 = require( 'd3' );
var CFPBChart = require( './CFPBChart' );

BarChart.prototype = new CFPBChart();
BarChart.prototype.constructor = BarChart;

function BarChart( properties ) {
  this.selector = properties.selector;
  this.data = properties.data;
  this.type = 'BarChart';
  this.labels = properties.labels || {};

  this.drawGraph = function( options ) {
    var data = this.data;

    // variables from options
    var baseWidth = options.baseWidth || 200,
        baseHeight = options.baseHeight || 100,
        paddingDecimal = options.paddingDecimal || .1,
        margin = options.margin || {top: 20, right: 20, bottom: 20, left: 20};

    // calculated variables
    var width = baseWidth - margin.left - margin.right,
        height = baseHeight - margin.top - margin.bottom;

    var x = d3.scaleBand()
        .range( [ 0, width ] )
        .padding( paddingDecimal );

    var y = d3.scaleLinear()
        .range( [ height, 0 ] );

    var svg = d3.select( this.selector ) 
      .append( 'svg' )
        .attr( 'width', width + margin.left + margin.right)
        .attr( 'height', height + margin.top + margin.bottom)
      .append( 'g' )
        .attr( 'transform', 
              'translate( ' + margin.left + ',' + margin.top + ' )' );  

    data.forEach( function( d ) {
      d.label = d.label;
      d.amount = +d.amount;
    } );

    var ymin = d3.min( data, function(d) { return d.amount } ),
        ymax = d3.max( data, function(d) { return d.amount; } );

    // If the graph displays values below zero, find new bounds by
    // rounding to the absolute greatest factor of 10 and set that
    // as the min and max
    if ( ymin < 0 ) {
      var top = Math.ceil( Math.abs( ymax ) / 10 ) * 10,
          bottom = Math.ceil( Math.abs( ymin ) / 10 ) * 10,
          max = Math.max( top, bottom );

      ymax = max;
      ymin = -1 * max;
    }

    x.domain( data.map( function( d ) { return d.label; } ) );
    y.domain( [ Math.min( 0, ymin ), ymax ] );

    // x-axis
    svg.append( 'g' )
        .attr( 'class', 'x axis' )
        .attr( 'transform', 'translate( 0,' + Math.max( y( 0 ), y( ymin ) ) + ')' )
        .call(
          d3.axisBottom( x )
          .tickValues( x.domain().filter(
            function( d, i ) {
              return !( i % 12 );
            } )
          )
          .tickFormat( function( d, i ) { return 'Jan ' + d.substr( 0, 4 ) } )
        )
      .selectAll( 'text' )
        .style( 'text-anchor', 'middle' )
        .attr( 'y', 15 );

    // Determine y-axis tick interval
    var yTickInterval = 10;

    // y-axis
    svg.append( 'g' )
        .attr( 'class', 'y axis')
        .call(
          d3.axisLeft( y )
            .ticks( ( ymax - ymin ) / yTickInterval )
            .tickSize( -width )
            .tickFormat( function( d ) {
              if ( ymax <= 40 || d % 20 === 0 ) {
                return d + '%'
              }
            } )
          )
        .selectAll( 'text' )
          .attr( 'dy', '.25em' );

    // y-axis label
    svg.append( 'text' )
        .attr( 'transform', 'rotate(-90)' )
        .attr( 'text-anchor', 'middle' )
        .attr( 'x', -1 * ( height + ymin ) / 2 )
        .attr( 'y', -50 )
        .attr( 'class', 'y-axis-label' )
        .style( 'font-size', '1em' )
        .text( this.labels.yAxisLabel || '' );

    svg.selectAll( 'bar' )
        .data( data )
      .enter().append( 'rect' )
        .attr( 'class', 'bar' )
        .attr( 'x', function(d) { return x( d.label ); })
        .attr( 'width' , x.bandwidth() )
        .attr( 'y', function( d ) { return y( Math.max( 0, d.amount ) ); })
        .attr( 'height',
          function( d ) {
            return Math.abs( y( d.amount ) - y( 0 ) );
          } )
        .attr( 'fill', '#2CB34A' );

    return svg;
  }
}

module.exports = BarChart;
