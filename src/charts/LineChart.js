'use strict';

var Highcharts = require( 'highcharts/highstock' );
require( 'highcharts/modules/accessibility' )( Highcharts );
var getColorScheme = require( '../utils/get-color-scheme.js' );

Highcharts.setOptions( {
  lang: {
    rangeSelectorZoom: '',
    thousandsSep: ','
  },
  chart: {
    style: {
      fontSize: '16px',
      fontFamily: "'AvenirNextLTW01-Regular',Arial,sans-serif"
    }
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
  var colors = getColorScheme( props.color );
  var options = {
    title: {
      text: props.title
    },
    description: props.description,
    credits: false,
    rangeSelector: {
      selected: 'all',
      height: 35,
      inputEnabled: false,
      buttonPosition: {
        x: 0,
        y: 30
      },
      buttonTheme: {
        r: 5, // border radius
        fill: '#CCE3F5',
        style: {
          height: '35px',
          fontSize: '14px'
        },
        states: {
          select: {
            fill: '#7FB8E6'
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
      itemStyle: {
        'color': '#75787b',
        'font-weight': 'normal',
        'font-size': '16px'
      },
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
      handles: {
        backgroundColor: '#fff',
        borderColor: '#101820'
      },
      series: {
        color: colors.primary,
        lineWidth: 2
      }
    },
    chart: {
      marginTop: 100,
      zoomType: 'none'
    },
    xAxis: {
      startOnTick: true,
      type: 'datetime',
      dateTimeLabelFormats: {
        month: '%b<br/>%Y',
        year: '%b<br/>%Y'
      },
      labels: {
        style: {
          fontSize: '16px',
          fontFamily: "'AvenirNextLTW01-Regular',Arial,sans-serif"
        },
      },
      lineColor: '#75787b',
      tickColor: '#75787b',
      plotLines: [ {
        color: '#75787b',
        width: 1,
        value: props.data.projectedDate.timestamp,
        zIndex: 10,
        label: {
          text: 'Values after ' + props.data.projectedDate.label + ' are projected',
          align: 'right',
          rotation: 0,
          style: {
            color: '#75787b'
          },
          y: -15
        }
      } ],
      tickInterval: 60 * 60 * 24 * 365 * 1000 // one year in ms
    },
    yAxis: {
      opposite: false,
      className: 'axis-label',
      title: {
        text: _getYAxisLabel( props.data.adjusted ) + ' of originations (in ' + _getYAxisUnits( props.data.adjusted ) + ')',
        style: {
          color: '#75787b'
        }
      },
      labels: {
        formatter: function() {
          return _getTickValue( this.value );
        },
        style: {
          fontSize: '16px',
          fontFamily: "'AvenirNextLTW01-Regular',Arial,sans-serif"
        }
      },
      lineColor: '#75787b',
      tickColor: '#75787b'
    },
    series: [
      {
        name: 'Seasonally adjusted',
        data: props.data.adjusted,
        color: colors.primary,
        legendIndex: 1,
        lineWidth: 3,
        tooltip: {
          valueDecimals: 0
        },
        zoneAxis: 'x',
        zones: [ {
          value: props.data.projectedDate.timestamp
        }, {
          dashStyle: 'ShortDot'
        } ]
      },
      {
        name: 'Unadjusted',
        data: props.data.unadjusted,
        color: colors.primary,
        lineWidth: 1,
        legendIndex: 2,
        tooltip: {
          valueDecimals: 0
        },
        zoneAxis: 'x',
        zones: [ {
          value: props.data.projectedDate.timestamp
        }, {
          dashStyle: 'dash'
        } ]
      }
    ]
  };

  Highcharts.stockChart( props.selector, options,
    function( chart ) {
      chart.renderer.text( 'Select time range', 7, 16 )
        .css( {
          color: '#75787b',
          fontSize: '14px'
        } )
        .add();

      chart.renderer.rect( 0, 75, 650, 2 )
        .attr( {
          fill: '#E3E4E5',
          zIndex: 10
        } )
        .add();
    }
  );

}

module.exports = LineChart;
