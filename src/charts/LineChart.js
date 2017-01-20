'use strict';

var Highcharts = require( 'highcharts/highstock')

// props Object properties:
// selector: id of element where chart goes
// title: chart title
// description: chart description
// data: the data for the chart

function LineChart( props ) {
  console.log( props.data )

  var options = {
    title: {
        text: props.title
    },
    description: props.description,
    credits: false,
    lang: {
      rangeSelectorZoom: ''
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
      height: 500,
      marginTop: 50
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
      tickInterval: 500000,
      title: {
        text: props.title
      },
      labels: {
        formatter: function () {
          return this.value / 1000000 + 'M';
        }
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



  Highcharts.stockChart( props.selector, options);

}

module.exports = LineChart;
