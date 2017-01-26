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
      plotLines: [{
        color: '#75787b',
        width: 1,
        value: props.data.projectedDate.timestamp,
        label: {
          text: 'Values after ' + props.data.projectedDate.label + ' <br>are projected',
          align: 'left',
          verticalAlign: 'top',
          rotation: 0,
          x: -100,
          y: -20
        }
      }],
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
        color: '#20aa3f',
        lineWidth: 1,
        tooltip: {
            valueDecimals: 0
        },
        zoneAxis: 'x',
        zones: [{
            value: props.data.projectedDate.timestamp
        }, {
            dashStyle: 'dash'
        }]
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
        zones: [{
            value: props.data.projectedDate.timestamp
        }, {
            dashStyle: 'dash'
        }]
      }
    ]
  }

  Highcharts.stockChart( props.selector, options );

}

module.exports = LineChart;
