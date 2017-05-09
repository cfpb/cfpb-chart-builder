'use strict';

var Highcharts = require( 'highcharts/js/highstock' );
require( 'highcharts/js/modules/accessibility' )( Highcharts );

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
    chart: {
      marginRight: 0,
      marginTop: 100,
      zoomType: 'none'
    },
    className: 'cfpb-chart_bar',
    description: props.description,
    credits: false,
    rangeSelector: {
      selected: 'all',
      height: 35,
      inputEnabled: false,
      buttonTheme: {
        r: 5, // border radius
        width: 70,
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
      startOnTick: true,
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
          y: -15
        }
      } ]
    },
    yAxis: {
      opposite: false,
      lineColor: '#d2d3d5',
      tickColor: '#d2d3d5',
      gridLineColor: '#d2d3d5',
      title: {
        text: 'Year-over-year change (%)',
        offset: 0,
        reserveSpace: false
      }
    },
    navigator: {
      maskFill: 'rgba(0, 0, 0, 0.05)',
      handles: {
        backgroundColor: '#fff',
        borderColor: '#101820'
      },
      series: {
        lineWidth: 2
      }
    },
    series: [ {
      type: 'column',
      data: props.data,
      name: 'Year-over-year change (%)',
      tooltip: {
        valueDecimals: 2
      },
      zoneAxis: 'x',
      zones: [ {
        value: props.data.projectedDate.timestamp,
        className: 'highcharts-data__unprojected'
      }, {
      } ]
    } ]
  };

  Highcharts.stockChart( props.selector, options, function( chart ) {
    // label(str, x, y, shape, anchorX, anchorY, useHTML, baseline, className)
    chart.renderer.label('Select time range', null, null, null, null, null, true, null, 'range-selector-label' )
    .add();
  } );

}

module.exports = BarChart;
