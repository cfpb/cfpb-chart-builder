'use strict';

var Highcharts = require( 'highcharts/js/highstock' );
require( 'highcharts/js/modules/accessibility' )( Highcharts );

Highcharts.setOptions( {
  lang: {
    rangeSelectorZoom: '',
    thousandsSep: ','
  }
} );


/**
 * _getFirstNumber - get the first value that is a Number
 *
 * @param  {array} array  An array of Objects with values to check
 * @returns {string}    an actual Number
 */

function _getFirstNumber( array ) {
  var val;
  for ( var x = 0; x < array.length; x++ ) {
    if ( !isNaN( array[x][1] ) ) {
      val = array[x][1];
      return val;
    }
  }
  return false;
}

/**
 * _getYAxisUnits - Get the text of the y-axis title
 *
 * @param  {array} array  An array of values to check
 * @returns {string}    Appropriate y-axis title
 */
function _getYAxisUnits( array ) {
  var value = _getFirstNumber( array );
  if ( !value ) {
    return value;
  }
  if ( value % 1000000000 < value ) {
    return 'billions';
  }
  return 'millions';
}

/**
 * _getYAxisLabel - Get the text of the y-axis title
 *
 * @param  {array} array  An array of values to check
 * @returns {string}    Appropriate y-axis title
 */
function _getYAxisLabel( array ) {
  var value = _getFirstNumber( array );
  if ( !value ) {
    return value;
  }
  if ( value % 1000000000 < value ) {
    return 'Volume';
  }
  return 'Number';
}

/**
 * _getTickValue - Convert the data point's unit to M or B.
 *
 * @param  {int} value  Data point's value
 * @returns {int}        Data point's value over million or billion.
 */

function _getTickValue( value ) {
  // If it's 0 or borked data gets passed in, return it.
  if ( !value ) {
    return value;
  }
  if ( value % 1000000000 < value ) {
    return value / 1000000000 + 'B';
  }
  return value / 1000000 + 'M';
}

function LineChart( props ) {
  var options = {
    title: {
      text: props.title
    },
    chart: {
      marginTop: 100,
      zoomType: 'none'
    },
    className: 'cfpb-chart_line',
    description: props.description,
    credits: false,
    rangeSelector: {
      selected: 'all',
      height: 35,
      inputEnabled: false,
      buttonPosition: {
        x: 0,
        y: 430
      },
      buttonTheme: {
        r: 5, // border radius
        style: {
          height: '45px',
          width: '45px', // start with small screen defaults
        },
        states: {
          select: {
            fill: '#7FB8E6',
            fontWeight: 'bold'
          }
        }
      },
      buttons: [ {
        type: 'year',
        count: 1,
        text: '1y'
      },
      {
        type: 'year',
        count: 3,
        text: '3y'
      },
      {
        type: 'year',
        count: 5,
        text: '5y'
      },
      {
        type: 'all',
        text: 'All'
      }
      ]
    },
    legend: {
      align: 'right',
      enabled: true,
      floating: true,
      itemMarginTop: 10,
      layout: 'vertical',
      verticalAlign: 'top',
      x: 0,
      y: -15
    },
    plotOptions: {
      series: {
        states: {
          hover: {
            enabled: false
          }
        }
      }
    },
    navigator: {
      maskFill: 'rgba(0, 0, 0, 0.05)',
      
      series: {
        lineWidth: 2
      }
    },
    xAxis: {
      startOnTick: true,
      type: 'datetime',
      dateTimeLabelFormats: {
        month: '%b<br/>%Y',
        year: '%b<br/>%Y'
      },
      labels: {
      },
      lineColor: '#d2d3d5',
      tickColor: '#d2d3d5',
      gridLineColor: '#d2d3d5',
      plotLines: [ {
        value: props.data.projectedDate.timestamp,
        label: {
          text: 'Values after ' + props.data.projectedDate.label + ' are projected',
          align: 'right',
          rotation: 0,
          y: -15
        }
      } ]
    },
    yAxis: {
      opposite: false,
      className: 'axis-label',
      title: {
        text: _getYAxisLabel( props.data.adjusted ) + ' of originations (in ' + _getYAxisUnits( props.data.adjusted ) + ')',
        x: -15
      },
      labels: {
        formatter: function() {
          return _getTickValue( this.value );
        }
      },
      lineColor: '#d2d3d5',
      tickColor: '#d2d3d5',
      gridLineColor: '#d2d3d5'
    },
    series: [
      {
        name: 'Unadjusted',
        data: props.data.unadjusted,
        legendIndex: 2,
        tooltip: {
          valueDecimals: 0
        },
        zoneAxis: 'x',
        zones: [ {
          value: props.data.projectedDate.timestamp
        } ]
      },
      {
        name: 'Seasonally adjusted',
        data: props.data.adjusted,
        legendIndex: 1,
        tooltip: {
          valueDecimals: 0
        },
        zoneAxis: 'x',
        zones: [ {
          value: props.data.projectedDate.timestamp
        } ]
      }
    ]
  };

  Highcharts.stockChart( props.selector, options, function( chart ) {
    // label(str, x, y, shape, anchorX, anchorY, useHTML, baseline, className)
    chart.renderer.label('Select time range', null, null, null, null, null, true, null, 'range-selector-label' )
    .add();
  } );

}

module.exports = LineChart;
