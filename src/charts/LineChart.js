'use strict';

var Highcharts = require( 'highcharts/highstock' );

Highcharts.setOptions( {
  lang: {
    rangeSelectorZoom: '',
    thousandsSep: ','
  }
} );

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
    description: props.description,
    credits: false,
    rangeSelector : {
      height: 35,
      inputEnabled:false,
      buttonTheme: {
        r: 5, // border radius
        fill: '#CCE3F5',
        style: {
          height: '35px'
        },
        states: {
          select: {
            fill: '#7FB8E6'
          }
        }
      },
      buttons: [{
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
        },
      ]
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
        borderColor: '#000'
      },
      series: {
        color: '#addc91',
        lineWidth: 2
      }
    },
    chart: {
      width: 650,
      height: 500
    },
    xAxis: {
      startOnTick: true,
      type: 'datetime',
      dateTimeLabelFormats: {
        day: '%b %Y'
      },
      plotLines: [ {
        color: '#75787b',
        width: 1,
        value: props.data.projectedDate.timestamp,
        zIndex: 10,
        label: {
          text: 'Values after ' + props.data.projectedDate.label + ' are projected'
        }
      } ],
      tickInterval: 60 * 60 * 24 * 365 * 1000 // one year in ms
    },
    yAxis: {
      opposite: false,
      className: 'axis-label',
      title: {
        text: props.title
      },
      labels: {
        formatter: function() {
          return _getTickValue( this.value );
        }
      }
    },
    series: [
      {
        name: 'Unadjusted',
        data: props.data.unadjusted,
        color: '#20aa3f',
        lineWidth: 1,
        tooltip: {
          valueDecimals: 0
        },
        zoneAxis: 'x',
        zones: [ {
          value: props.data.projectedDate.timestamp
        }, {
          dashStyle: 'dash'
        } ]
      },
      {
        name: 'Seasonally Adjusted',
        data: props.data.adjusted,
        color: '#20aa3f',
        lineWidth: 5,
        tooltip: {
          valueDecimals: 0
        },
        zoneAxis: 'x',
        zones: [ {
          value: props.data.projectedDate.timestamp
        }, {
          dashStyle: 'ShortDot'
        } ]
      }
    ]
  };

  Highcharts.stockChart( props.selector, options );

}

module.exports = LineChart;
