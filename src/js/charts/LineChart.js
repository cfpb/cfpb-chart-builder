const getFirstNumber = require( '../utils/calculation' ).getFirstNumber;
const Highcharts = require( 'highcharts/js/highstock' );
const process = require( '../utils/process-json' );
require( 'highcharts/js/modules/accessibility' )( Highcharts );

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
function LineChart( props ) {
  const propEl = props.el;
  const propMetadata = props.metadata;
  const propDescription = props.description;
  const propYAxisLabel = props.yAxisLabel;
  const propAxisFormatter = props.axisFormatter;

  let propData = props.data;
  propData = process.originations( propData[0], propMetadata );

  // Set y-axis options.
  const yAxisOptions = propAxisFormatter.yAxisOptions( propYAxisLabel, propData.adjusted );

  const options = {
    chart: {
      marginRight: 0,
      marginTop: 100,
      zoomType: 'none'
    },
    className: 'cfpb-chart_line',
    description: propDescription,
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
        value: propData.projectedDate.timestamp,
        label: {
          text: 'Values after ' + propData.projectedDate.label + ' are projected',
          rotation: 0,
          useHTML: true
        }
      } ]
    },
    yAxis: yAxisOptions,
    tooltip: {
      useHTML: true,
      formatter: function() {
        let tooltip = Highcharts.dateFormat( '%B %Y', this.x );
        for ( let i = 0; i < this.points.length; i++ ) {
          const point = this.points[i];
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
        data: propData.adjusted,
        legendIndex: 1,
        tooltip: {
          valueDecimals: 0
        },
        zoneAxis: 'x',
        zones: [ {
          value: propData.projectedDate.timestamp
        } ]
      },
      {
        name: 'Unadjusted',
        data: propData.unadjusted,
        legendIndex: 2,
        tooltip: {
          valueDecimals: 0
        },
        zoneAxis: 'x',
        zones: [ {
          value: propData.projectedDate.timestamp
        } ]
      }
    ],
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

  return Highcharts.stockChart( propEl, options, function( chart ) {
    // label(str, x, y, shape, anchorX, anchorY, useHTML, baseline, className)
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

module.exports = LineChart;
