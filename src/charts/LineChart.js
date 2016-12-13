'use strict';

var d3 = require( 'd3' );
var CFPBChart = require( './CFPBChart' );

LineChart.prototype = new CFPBChart();
LineChart.prototype.constructor = LineChart;

var lineSets = [],
    rawData = [],
    yAxisTickFactor,
    yAxisLabel,
    yAxisUnit,
    labels = {};
    
function sortByDateAscending( a, b ) {
    return a.x - b.x;
}

function findBestYTickFactor( ymin, ymax, factor ) {
  var multipliers = [ 2, 4, 5, 10, 20, 25, 50, 100, 200, 500, 1000, 2000, 5000, 10000 ];
  var divisors = [ .5, .25, .1, .05, .025, .01 ];
  var count = ( ymax - ymin ) / factor;
  var newFactor = factor;
  var coeff = 1;

  if ( count > 11 ) {
    for (var x = 0; count > 11; x++ ) {
      coeff = multipliers[x];
      newFactor = factor * coeff;
      count = ( ymax - ymin ) / newFactor;
    }

  // @todo - fix the minimum tick count code
  // 
  // } else if ( count < 5 ) {
  //   for (var x = 0; count < 5; x++ ) {
  //     console.log( 'count of ' + count + ' was no good' )
  //     coeff = divisors[x];
  //     newFactor = factor * coeff;
  //     count = ( ymax - ymin ) / newFactor;
  //     console.log( 'new count is ' + count );
  //   }

  }

  return { 
    factor: newFactor,
    multiplier: coeff
  };
}

function LineChart( properties ) {
  this.selector = properties.selector;
  this.type = 'LineChart';
  this.data = {};
  rawData = properties.data;
  labels = properties.labels || {};
  lineSets = properties.lineSets || undefined;
  yAxisTickFactor = properties.yAxisTickFactor || 1;
  yAxisLabel = properties.labels.yAxisLabel || '';
  yAxisUnit = properties.labels.yAxisUnit || '';


  this.drawGraph = function( options ) {
    var data = this.data = this.getDataBySets();

    // variables from options
    var baseWidth = options.baseWidth || 200,
        baseHeight = options.baseHeight || 100,
        paddingDecimal = options.paddingDecimal || .1,
        margin = options.margin || {top: 20, right: 20, bottom: 20, left: 20};

    // calculated variables
    var width = baseWidth - margin.left - margin.right,
        height = baseHeight - margin.top - margin.bottom;

    var x = d3.scaleTime()
      // @todo: wait, the x-axis is not always time intervals
        .range( [ 0, width ] );

    var y = d3.scaleLinear()
        .range( [ height, 0 ] );

    var xmin = d3.min( rawData, function(d) { return d.x } ),
        xmax = d3.max( rawData, function(d) { return d.x; } ),
        ymin = d3.min( rawData, function(d) { return d.y } ),
        ymax = d3.max( rawData, function(d) { return d.y; } );

    // ymin should be 0 or less
    ymin = Math.min( ymin, 0 );

    // check if the yAxisTickFactor is ideal
    var tickFactor = findBestYTickFactor( ymin, ymax, yAxisTickFactor ).factor;
    var tickMultiplier = findBestYTickFactor( ymin, ymax, yAxisTickFactor ).multiplier;

    // ymax should be rounded up to the nearest yAxisTickFactor
    ymax = Math.ceil( ymax / tickFactor ) * tickFactor;

    x.domain( [ xmin, xmax ] );
    y.domain( [ ymin, ymax ]);

    var svg = d3.select( this.selector ) 
      .append( 'svg' )
        .attr( 'width', width + margin.left + margin.right)
        .attr( 'height', height + margin.top + margin.bottom)
      .append( 'g' )
        .attr( 'transform', 
              'translate( ' + margin.left + ',' + margin.top + ' )' );  

    // line function
    var line = d3.line()
          .x( function( d ) {
            return x( d.x );
          } )
          .y( function( d ) {
            return Math.floor( y( d.y ) );
          } );

    // Add the X Axis
    svg.append('g')
      .classed('axis axis__x', true)
      .attr('transform', 'translate(0,' + height + ')')
      .call( d3.axisBottom( x )
         .tickFormat( d3.timeFormat( '%b %Y' ) )
      )
      .selectAll( 'text' )
        .attr( 'dy', '15px' );


    // Add the Y Axis
    svg.append( 'g' )
      .classed( 'axis axis__y', true )
      .call(
        d3.axisLeft( y )
          .ticks( ( ymax - ymin ) / tickFactor )
          .tickSize( -width )
          .tickFormat(function( d ) {
            if ( d % 20 === 0 ) {
              if ( tickMultiplier < 1 ) {
                var ticker = Math.floor( d / tickFactor * tickMultiplier * 10 ) / 10;
                return ticker + yAxisUnit; 
              }
              return Math.floor( d / tickFactor * tickMultiplier ) + yAxisUnit;
            }
          } )
        )
      .selectAll( 'text' )
        .attr( 'text-anchor', 'right' );

    // Iterate all lines:
    for ( var key in data ) {
      svg.append( 'path' )
          .attr( 'd', line( data[key] ) )
          .classed( lineSets[key].classes, true);      
    }

    // text label for the y axis
    svg.append( 'text' )             
      .classed( 'axis-label' , true)
      .attr( 'transform', 'rotate(-90)' )
      .attr( 'text-anchor', 'end' )
      .attr( 'x', -20 )
      .attr( 'y', -60 )
      .text( labels.yAxisLabel );

    // add the legend
    var legendPositions = [
      [ -70, -65 ],
      [ -70, -45 ], 
      [ width / 4, -55 ], 
      [ width / 4, -35 ]     
    ];
    for ( var key in lineSets ) {
      if ( lineSets[key].showInLegend !== false ) {
        var pos = legendPositions[0];
        svg.append( 'line' )
          .classed( lineSets[key].classes, true)
          .style( 'stroke-width', '10px' )
          .attr( 'x1', pos[0] )
          .attr( 'x2', pos[0] + 10 )
          .attr( 'y1', pos[1] )
          .attr( 'y2', pos[1] );

        svg.append( 'text' )
          .attr( 'text-anchor', 'start' )
          .attr( 'x', pos[0] + 20 )
          .attr( 'y', pos[1] + 5 )
          .attr( 'class', 'gray-text' )
          .text( lineSets[key].legendLabel || key );

        // Drop the first position so the next entry will
        // use the next position, etc
        legendPositions = legendPositions.splice( 1 );
      }
    }

    return {
      chart: svg,
      x: x,
      y: y
    };
  };

  this.getDataBySets = function() {
    var obj = {};
    // create an object property for each set
    for ( var key in lineSets ) {
      obj[key] = [];
    }

    for (var x = 0; x < rawData.length; x++ ) {
      obj[rawData[x].set].push( rawData[x] );
    }

    for ( var key in lineSets ) {
      obj[key] = obj[key].sort( sortByDateAscending );
    }

    return obj;
  }
}

module.exports = LineChart;
