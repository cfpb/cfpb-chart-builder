'use strict';

var Highcharts = require( 'highcharts/js/highstock' );
var process = require( '../utils/process-json' );
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
 * @param  {array} chartData  An array of values to check
 * @param  {sting} yAxisLabel  A string to use for the y-axis label.
 * @returns {string}    Appropriate y-axis title
 */
function _getYAxisLabel( chartData, yAxisLabel ) {
  var term = 'Number';
  var unit = 'millions';
  var firstChartNumber = _getFirstNumber( chartData );

  if ( yAxisLabel ) {
    return yAxisLabel;
  }

  if ( !firstChartNumber ) {
    return firstChartNumber;
  }

  if ( firstChartNumber % 1000000000 < firstChartNumber ) {
    term = 'Volume';
    unit = 'billions';
  }

  return term + ' of originations (in ' + unit + ')';
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
  props.data = process.originations( props.data[0], props.metadata );
  var options = {
    chart: {
      marginRight: 0,
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
        y: 0
      },
      buttonTheme: {
        r: 5, // border radius
        width: 70
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
      enabled: true,
      floating: true,
      layout: 'vertical',
      verticalAlign: 'top',
      useHTML: true
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
      tickLength: 5,
      type: 'datetime',
      dateTimeLabelFormats: {
        month: '%b<br/>%Y',
        year: '%b<br/>%Y'
      },
      plotLines: [ {
        value: props.data.projectedDate.timestamp,
        label: {
          text: 'Values after ' + props.data.projectedDate.label + ' are projected',
          rotation: 0,
          useHTML: true
        }
      } ]
    },
    yAxis: {
      opposite: false,
      className: 'axis-label',
      title: {
        text: _getYAxisLabel( props.data.adjusted, props.yAxisLabel ),
        offset: 0,
        reserveSpace: false
      },
      labels: {
        formatter: function() {
          return _getTickValue( this.value );
        }
      }
    },
    tooltip: {
      useHTML: true,
      formatter: function() {
        var tooltip = Highcharts.dateFormat( '%B %Y', this.x );
        for ( var i = 0; i < this.points.length; i++ ) {
          var point = this.points[i];
          tooltip += "<br><span class='highcharts-color-" +
                     point.series.colorIndex + "'></span> " +
                     point.series.name + ': ' + Highcharts.numberFormat( point.y, 0 );
        }
        return tooltip;
      }
    },
    series: [
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
      },
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
      }
    ],
    responsive: {
      rules: [{
        condition: {
          minWidth: 600 // chart width, not window width
        },
      // Add more left margin space for vertical label on large screens
        chartOptions: {
          chart: {
            marginRight: 0,
            marginTop: 100,
            marginLeft: 70,
            zoomType: 'none'
          }
        }
      }]
    }
  };

  return Highcharts.stockChart( props.el, options, function( chart ) {
    // label(str, x, y, shape, anchorX, anchorY, useHTML, baseline, className)
    chart.renderer.label( 'Select time range', null, null, null, null, null, true, null, 'range-selector-label' )
    .add();
  } );

}

module.exports = LineChart;
