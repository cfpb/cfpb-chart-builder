import accessibility from 'highcharts/js/modules/accessibility';
import Highcharts from 'highcharts/js/highstock';
import * as process from '../utils/process-json';

accessibility( Highcharts );

Highcharts.setOptions( {
  lang: {
    rangeSelectorZoom: '',
    thousandsSep: ','
  }
} );

/**
 * @param {Object} props - Options to pass to highcharts when creating a chart.
 * @returns {Object} A highchart chart.
 */
function BarChart( props ) {
  props.data = process.processYoyData( props.data[0], props.metadata );
  const options = {
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
      buttonPosition: {
        x: 0,
        y: 0
      },
      buttonTheme: {
        // border radius.
        r: 5,
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
      showLastLabel: true,
      opposite: false,
      title: {
        text: 'Year-over-year change (%)',
        offset: 0,
        reserveSpace: false
      }
    },
    tooltip: {
      useHTML: true
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
    } ],
    responsive: {
      rules: [ {
        condition: {
          // chart width, not window width.
          minWidth: 600
        },
        // Add more left margin space for vertical label on large screens.
        chartOptions: {
          chart: {
            marginRight: 0,
            marginTop: 100,
            marginLeft: 70,
            zoomType: 'none'
          }
        }
      } ]
    }

  };

  return Highcharts.stockChart( props.el, options, function( chart ) {
    // label(str, x, y, shape, anchorX, anchorY, useHTML, baseline, className).
    chart.renderer.label(
      'Select time range',
      null,
      null,
      null,
      null,
      null,
      true,
      null,
      'range-selector-label'
    ).add();
  } );

}

export default BarChart;
