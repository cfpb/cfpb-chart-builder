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

class LineChartIndex {
  constructor( { el, description, data, metadata, yAxisLabel } ) {
    data = process.originations( data[0], metadata );
    const options = {
      chart: {
        marginRight: 0,
        marginTop: 100,
        zoomType: 'none'
      },
      className: 'cfpb-chart_line-index',
      description: description,
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
          value: data.projectedDate.timestamp,
          label: {
            text: 'Values after ' + data.projectedDate.label + ' are projected',
            rotation: 0,
            useHTML: true
          }
        } ]
      },
      yAxis: {
        allowDecimals: false,
        showLastLabel: true,
        opposite: false,
        className: 'axis-label',
        title: {
          text: 'Index (January 2009 = 100)',
          offset: 0,
          reserveSpace: false
        }
      },
      tooltip: {
        useHTML: true,
        formatter: function() {
          let tooltip = Highcharts.dateFormat( '%B %Y', this.x );
          for ( let i = 0, len = this.points.length; i < len; i++ ) {
            const point = this.points[i];
            tooltip += "<br><span class='highcharts-color-" +
                       point.series.colorIndex + "'></span> " +
                       point.series.name + ': ' + Highcharts.numberFormat( point.y, 1 );
          }
          return tooltip;
        }
      },
      series: [
        {
          name: 'Seasonally adjusted',
          data: data.adjusted,
          legendIndex: 1,
          zoneAxis: 'x',
          zones: [ {
            value: data.projectedDate.timestamp
          } ]
        },
        {
          name: 'Unadjusted',
          data: data.unadjusted,
          legendIndex: 2,
          zoneAxis: 'x',
          zones: [ {
            value: data.projectedDate.timestamp
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

    this.chart = Highcharts.stockChart( el, options, function( chart ) {
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

    return this.chart;
  }
}

module.exports = LineChartIndex;
