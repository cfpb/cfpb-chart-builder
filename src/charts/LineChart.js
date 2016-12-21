'use strict';

var d3 = require( 'd3' );
var CFPBChart = require( './CFPBChart' );
var getMonth = d3.utcFormat( '%b' );
var getFullMonth = d3.utcFormat( '%B' );
var getYear =  d3.utcFormat( '%Y' );
var formatDollars = d3.format( '$,' );

LineChart.prototype = new CFPBChart();
LineChart.prototype.constructor = LineChart;

var lineSets = [],
    rawData = [],
    yAxisTickFactor,
    yAxisLabel,
    yAxisUnit,
    labels = {},
    classes = {};

function sortByDateAscending( a, b ) {
    return a.x - b.x;
}

function getObjProp( property, object ) {
  if ( object.hasOwnProperty( property ) ) {
    return object[property];
  }

  return '';
}

function findNewMax( max ) {
  var newMax = 0;
  if ( max < 50 ) {
    newMax = 5 * Math.ceil( max / 5 );
  } else if ( max > 100 && max < 500 ) {
    newMax = 50 * Math.ceil( max / 50 );
  } else {
    var pow = max.toString().length - 1;
    newMax = Math.pow( 10, pow ) * Math.ceil( max / Math.pow( 10, pow ) );
  }

  return newMax;
}

function tickThinker( ymin, ymax, factor ) {
  var acceptable = [ .5, .25, .2, .1, .05, .025, .01,
          1, 2, 5, 10, 15, 20, 25, 50, 100, 200 ];
  // var divisors = [ .5, .25, .2, .1, .05, .025, .01 ];
  var range = Math.ceil( ymax - ymin );
  var count = Math.floor( range / factor );
  var coeff = range / ( factor * count );

  for (var count = 10; count >= 5; count-- ) {
    coeff = range / ( factor * count ); 
    if ( range % count === 0 && acceptable.indexOf( coeff ) !== -1 ) {
      break;
    }
  }

  var array = [];
  for ( var x = 0; x <= count; x++ ) {
    array.push( x * coeff * factor );
  }

  return { 
    valueArray: array,
    coefficient: coeff
  };
}

function labelToString( number, multiplier ) {
  var label = number.toString();
  if ( multiplier < 1 ) {
    if ( label.length > 4 ) {
      label = label.substr( 0, 4 );
      if ( label.substr( 3, 1 ) === '0' ) {
        label = label.substr( 0, 3 );
      }
    }
  } else if ( label.indexOf('.') !== -1 ) {
    var decPart = label.split('.')[1];
    var intPart = label.split('.')[0];
    decPart = decPart.substr( 0, 1 )
    label = intPart + '.' + decPart;
  }

  return label;
}

function LineChart( properties ) {
  this.selector = properties.selector;
  this.tableSelector = properties.tableSelector;
  this.type = 'LineChart';
  this.data = {};
  this.classes = properties.classes || {};
  this.content = properties.content || {};
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

    // @todo: the x-axis is not always time intervals 
    var x = d3.scaleTime()
        .range( [ 0, width ] );

    var y = d3.scaleLinear()
        .range( [ height, 0 ] );

    var xmin = d3.min( rawData, function(d) { return d.x } ),
        xmax = d3.max( rawData, function(d) { return d.x; } ),
        ymin = d3.min( rawData, function(d) { return d.y } ),
        ymax = d3.max( rawData, function(d) { return d.y; } );

    // ymin should be 0 or less
    ymin = Math.min( ymin, 0 );

    // ymax should be "niced" (made into a nice round number)
    ymax = findNewMax( ymax );

    // check if the yAxisTickFactor is ideal
    var bestTickFactors = tickThinker( ymin, ymax, yAxisTickFactor );
    var tickMultiplier = bestTickFactors.coefficient;
    var tickValueArray = bestTickFactors.valueArray;

    x.domain( [ xmin, xmax ] );
    y.domain( [ ymin, ymax ] );

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
    var xAxis = svg.append('g')
      .classed('axis axis__x', true)
      .attr('transform', 'translate(0,' + height + ')')
      .call( d3.axisBottom( x )
         .tickFormat( function( d ) { return ''; }  )
      );

    xAxis.selectAll( 'g' )
        .append( 'text' )
          .style( 'text-anchor', 'middle' )
          .attr( 'y', 25 )
          .text( function( d) { return getMonth( d ); } )
          .attr( 'width', width / 15 );

    xAxis.selectAll( 'g' )
        .append( 'text' )
          .style( 'text-anchor', 'middle' )
          .attr( 'y', 45 )
          .text( function( d ) { return getYear( d ); } )
          .attr( 'width', width / 15 );


    // Add the Y Axis
    var yAxis = d3.axisLeft( y );

    yAxis.tickValues( tickValueArray )
    yAxis.tickFormat( function( d ) {
      var label = d / yAxisTickFactor;
      label = labelToString( label, tickMultiplier );
      return label + yAxisUnit;
    } )
    yAxis.tickSize( -width );

    svg.append( 'g' )
      .classed( 'axis axis__y', true )
      .call( yAxis );

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

  this.appendTable = function() {
    var table = d3.select( this.tableSelector ).append( 'table' );

    table.classed( getObjProp( 'table', this.classes ), true );

    table.append( 'thead').html( getObjProp( 'thead', this.content ) );

    var tr = table.selectAll( 'tr' )
      .data( rawData ).enter()
      .append( 'tr' );

    tr.append( 'td' ).html( function ( d ) {
      return getFullMonth( d.x ) + ' ' + getYear( d.x );
    } );
    tr.append( 'td' ).html( function ( d ) {
      return formatDollars( d.y );
    } );
    tr.append( 'td' ).html( function ( d ) {
      return d.set;
    } );

    tr.classed( getObjProp( 'tr', this.classes ), true );
    tr.selectAll( 'td' ).classed( getObjProp( 'td', this.classes ), true );

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
