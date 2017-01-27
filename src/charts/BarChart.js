'use strict';

var Highcharts = require( 'highcharts/highstock' );

Highcharts.setOptions( {
  lang: {
    rangeSelectorZoom: '',
    thousandsSep: ','
  }
} );


function BarChart( props ) {

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
    chart: {
      width: 650,
      height: 500
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 1,
        groupPadding: 0,
        shadow: false,
        grouping: false
      }
    },
    xAxis: {
      tickInterval: 12,
      plotLines: [ {
        color: '#75787b',
        width: 1,
        value: props.data.projectedDate.timestamp,
        zIndex: 10,
        label: {
          text: 'Values after ' + props.data.projectedDate.label + ' are projected'
        }
      } ]
    },
    yAxis: {
      opposite: false,
      title: {
        text: 'Year-over-year change (%)',
        style: {
          'color': '#75787b',
          'font-size': '16px'
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
    series: [ {
      type: 'column',
      data: props.data.values,
      color: '#20aa3f',
      name: 'Year-over-year change (%)',
      tooltip: {
        valueDecimals: 2
      },
      zoneAxis: 'x',
      zones: [ {
        value: props.data.projectedDate.timestamp
      }, {
        color: '#addc91'
      } ]
    } ]
  };

  Highcharts.stockChart( props.selector, options );
}

module.exports = BarChart;
