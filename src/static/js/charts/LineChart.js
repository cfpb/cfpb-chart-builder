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
      fontFamily: "'AvenirNextLTW01-Regular',Arial,sans-serif",
      'color': '#5a5d61'
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
  var windowWidth = document.documentElement.clientWidth;
  var projectedText = 'Values after ' + props.data.projectedDate.label + ' are projected';
  var yAxisTitle = _getYAxisLabel( props.data.adjusted ) + ' of originations (in ' + _getYAxisUnits( props.data.adjusted ) + ')';

  // responsive options are based on chart size not window size. Since our
  // gutters change the size of the chart, we have to be tricksy when it comes
  // to responsive.rules maxWidth condition.

  var responsiveMaxWidth = 570;
  if ( windowWidth > 600 ) {
    responsiveMaxWidth = 0; // disable responsive, basically
  }

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
          fontSize: '14px'
        },
        states: {
          select: {
            fill: '#7FB8E6',
            style: {
              fontWeight: 'bold'
            }
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
        'color': '#5a5d61',
        'fontWeight': 'normal',
        'fontSize': '16px'
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
          fontFamily: "'AvenirNextLTW01-Regular',Arial,sans-serif",
          color: '#5a5d61'
        }
      },
      lineColor: '#d2d3d5',
      tickColor: '#d2d3d5',
      gridLineColor: '#d2d3d5',
      plotLines: [ {
        color: '#75787b',
        width: 1,
        value: props.data.projectedDate.timestamp,
        zIndex: 10,
        label: {
          text: projectedText,
          align: 'right',
          rotation: 0,
          style: {
            color: '#5a5d61'
          },
          y: -15
        }
      } ]
    },
    yAxis: {
      opposite: false,
      className: 'axis-label',
      title: {
        text: yAxisTitle,
        style: {
          color: '#5a5d61'
        },
        x: -15
      },
      labels: {
        formatter: function() {
          return _getTickValue( this.value );
        },
        style: {
          fontSize: '16px',
          fontFamily: "'AvenirNextLTW01-Regular',Arial,sans-serif",
          color: '#5a5d61'
        },
        y: 5
      },
      lineColor: '#d2d3d5',
      tickColor: '#d2d3d5',
      gridLineColor: '#d2d3d5',
      showLastLabel: true
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
    ],
    responsive: {
      rules: [{
        condition: {
          maxWidth: responsiveMaxWidth
        },
        chartOptions: {
          chart: {
            height: 440,
            spacingBottom: 60
          },
          legend: {
            align: 'left',
            x: -10
          },
          navigator: {
            enabled: false
          },
          rangeSelector: {
            buttonSpacing: 15,
            buttonPosition: {
              x: ( windowWidth - 275 ) / 2,
              y: 390
            },
            buttonTheme: {
              width: 16,
              height: 16,
              padding: 14
            }
          },
          scrollbar: {
            enabled: false
          },
          xAxis: {
            plotLines: []
          },
          yAxis: {
            title: {
              align: 'high',
              text: '',
              offset: 0,
              rotation: 0,
              y: -20
            },
            x: 0,
          }
        }
      }]
    }
  };

  var thisChart = Highcharts.stockChart( props.selector, options,
    function( chart ) {

      var ele = chart.container;

      if ( windowWidth <= 600 ) {

        chart.renderer.text( yAxisTitle, 7, 100 )
          .css( {
            color: '#5a5d61',
            fontSize: '16px'
          } )
          .add();

        chart.renderer.rect( 0, 75, windowWidth - 20, 2 )
          .attr( {
            fill: '#E3E4E5',
            zIndex: 10
          } )
          .add();

        var projDiv = ele.appendChild( document.createElement( 'div' ) );
        projDiv.appendChild( document.createTextNode( projectedText ) );
        projDiv.style.position = 'absolute';
        projDiv.style.top = '0px';
        projDiv.style.left = ele.clientWidth / 2 + 10 + 'px';
        projDiv.style.fontSize = '16px';


        chart.renderer.text( 'SELECT TIME RANGE', ( windowWidth - 175 ) / 2, 370 )
          .css( {
            color: '#5a5d61',
            fontSize: '14px',
            textAlign: 'left'
          } )
          .add();


      } else {

        chart.renderer.text( 'Select time range', 7, 16 )
          .css( {
            color: '#5a5d61',
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

    }
  );

}

module.exports = LineChart;
