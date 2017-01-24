'use strict';

var Highcharts = require( 'highcharts/highstock' );

Highcharts.setOptions({
  lang: {
    rangeSelectorZoom: '',
    thousandsSep: ','
  }
});

Highcharts.setOptions({
  lang: {
    rangeSelectorZoom: ''
  }
});

function LineChart( props ) {
  var options = {
    title: {
        text: props.title
    },
    description: props.description,
    credits: false,
    rangeSelector : {
      inputEnabled:false
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
      tickInterval: 60 * 60 * 24 * 365 * 1000 // one year in ms
    },
    yAxis: {
      opposite: false,
      className: 'axis-label',
      title: {
        text: props.title
      }
    },
    series: [
      {
        name: 'Unadjusted',
        data: props.data.unadjusted,
        color: '#addc91',
        lineWidth: 3,
        tooltip: {
            valueDecimals: 0
        }
      },
      {
        name: 'Seasonally Adjusted',
        data: props.data.adjusted,
        color: '#20aa3f',
        lineWidth: 3,
        tooltip: {
            valueDecimals: 0
        }
      }
    ]
  }

  Highcharts.stockChart( props.selector, options );

}

module.exports = LineChart;
