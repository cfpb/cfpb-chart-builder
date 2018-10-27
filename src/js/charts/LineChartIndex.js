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

class LineChartIndex {
  constructor( { el, description, data, metadata, source } ) {
    data = process.processNumOriginationsData( data[0], metadata, source );

    const options = {
      chart: {
        className: 'cfpb-chart__small',
        marginTop: 80,
        marginBottom: 100,
        marginLeft: 60,
        marginRight: 20,
        zoomType: 'none'
      },
      description: description,
      credits: false,
      rangeSelector: {
        floating: true,
        selected: 'all',
        height: 35,
        inputEnabled: false,
        verticalAlign: 'bottom',
        buttonPosition: {
          align: 'center',
          x: -64
        },
        buttonSpacing: 30,
        buttonTheme: {
          // border radius.
          r: 5,
          width: 45,
          height: 45
        },
        buttons: [
          {
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
        align: 'left',
        enabled: true,
        floating: true,
        layout: 'vertical',
        verticalAlign: 'top',
        useHTML: true,
        x: -16,
        y: -16
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
      scrollbar: {
        enabled: false
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
        labels: {
          useHTML: true
        },
        plotLines: [ {
          value: data.projectedDate.timestamp,
          label: {
            text: 'Values after ' + data.projectedDate.label + ' are projected',
            rotation: 0,
            useHTML: true,
            x: -300,
            y: -126
          }
        } ]
      },
      yAxis: {
        allowDecimals: false,
        showLastLabel: true,
        opposite: false,
        title: {
          text: 'Index (January 2009 = 100)',
          align: 'high',
          // useHTML true value is needed to set width beyond chart marginTop.
          useHTML: true,
          rotation: 0,
          offset: 0,
          reserveSpace: false,
          x: 300,
          y: -33
        }
      },
      tooltip: {
        useHTML: true,
        shape: 'square',
        shared: true,
        split: false,
        padding: 10
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
        rules: [
          {
            condition: {
              // Chart width, not window width.
              minWidth: 650
            },
            // Add more left margin space for vertical label on large screens.
            chartOptions: {
              chart: {
                className: 'cfpb-chart__large',
                marginTop: 90,
                marginBottom: 60,
                marginLeft: 80
              },
              xAxis: {
                plotLines: [ {
                  value: data.projectedDate.timestamp,
                  label: {
                    text: 'Values after ' + data.projectedDate.label + ' are projected',
                    rotation: 0,
                    useHTML: true,
                    x: -300,
                    y: -24
                  }
                } ]
              },
              yAxis: {
                title: {
                  align: 'middle',
                  rotation: 270,
                  x: -40,
                  y: 0
                }
              },
              rangeSelector: {
                verticalAlign: 'top',
                buttonPosition: {
                  align: 'left',
                  x: -40,
                  y: -59
                },
                buttonSpacing: 10,
                buttonTheme: {
                  // border radius.
                  r: 5,
                  width: 45,
                  height: 28
                },
                x: 0,
                y: 0
              },
              legend: {
                align: 'center',
                x: 200,
                y: -16
              }
            }
          }
        ]
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

export default LineChartIndex;
