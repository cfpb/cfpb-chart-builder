'use strict';

var d3 = require( 'd3' );
var CFPBChart = require( './CFPBChart' );

BarChart.prototype = new CFPBChart();
BarChart.prototype.constructor = BarChart;

function BarChart( options ) {
  this.selector = options.selector;
  this.data = options.data;
  this.type = 'BarChart';

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
      d.date = d.date;
      d.amount = +d.amount;
    } );

    var ymin = d3.min( data, function(d) { return d.amount } ) - 2,
        ymax = d3.max( data, function(d) { return d.amount; } );

    ymax = Math.max( ymax, Math.abs( ymin ) );
    ymin = Math.max( ymin, -ymax );

    x.domain( data.map( function( d ) { return d.date; } ) );
    y.domain( [ ymin, ymax ] );

    svg.append( 'g' )
        .attr( 'class', 'x axis' )
        .attr( 'transform', 'translate( 0,' + height + ')' )
        .call(
          d3.axisBottom( x )
          .tickValues( x.domain().filter(
            function( d, i ) {
              return !( i % 12 );
            } )
          )
          .tickFormat( function( d, i ) { return d.substr( 0, 4 ) } )
        )
      .selectAll( 'text' )
        .style( 'text-anchor', 'middle' );

    svg.append( 'g' )
        .attr( 'class', 'y axis')
        .call( d3.axisLeft( y ).ticks( ( ymax - ymin ) / 20 ) );

    svg.append( 'text' )
        .attr( 'transform', 'rotate(-90)' )
        .attr( 'text-anchor', 'middle' )
        .attr( 'x', -1 * ( height + ymin ) / 2 )
        .attr( 'y', -50 )
        .style( 'font-size', '.75em' )
        .text( 'Year-over-year change (%)' );

    svg.selectAll( 'bar' )
        .data( data )
      .enter().append( 'rect' )
        .attr( 'class', 'bar' )
        .attr( 'x', function(d) { return x( d.date ); })
        .attr( 'width' , x.bandwidth() )
        .attr( 'y', function( d ) { return y( Math.max( 0, d.amount ) ); })
        .attr( 'height',
          function( d ) {
            return Math.abs( y( d.amount ) - y( 0 ) );
          } )
        .attr( 'fill', '#2CB34A' );

    svg.append( 'line' )
        .attr( 'x1', 0 )
        .attr( 'x2', width )
        .attr( 'y1', y( 0 ) )
        .attr( 'y2', y( 0 ) )
        .style( 'stroke', '#000000' )
        .attr( 'stroke-width', 2 )
        .style( 'stroke-dasharray', ( '7, 3' ) )

    return svg;
  }
}


module.exports = BarChart;