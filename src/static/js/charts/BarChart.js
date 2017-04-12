'use strict';

var Highcharts = require( 'highcharts/highstock' );
require( 'highcharts/modules/accessibility' )( Highcharts );
var getColorScheme = require( '../utils/get-color-scheme.js' );

Highcharts.setOptions( {
  lang: {
    rangeSelectorZoom: '',
    thousandsSep: ','
  }
} );


function BarChart( props ) {
  var colors = getColorScheme( props.color );
  var windowWidth = document.documentElement.clientWidth;
  var projectedText = 'Values after ' + props.data.projectedDate.label + ' are projected';

  // responsive options are based on chart size not window size. Since our
  // gutters change the size of the chart, we have to be tricksy when it comes
  // to responsive.rules maxWidth condition.

  var responsiveMaxWidth = 570;
  if ( windowWidth > 600 ) {
    responsiveMaxWidth = 0; // disable responsive, basically
  }


  var options = {
    title: {
      text: props.title
    },
    description: props.description,
    credits: false,
    rangeSelector: {
      selected: 'all',
      height: 35,
      inputEnabled: false,
/* TODO: buttonSpacing will be re-integrated with responsive styles */
//      buttonSpacing: 15,
      buttonPosition: {
        x: 0,
        y: 30
      },
      buttonTheme: {
/* TODO: width will be re-integrated with responsive styles */
//        width: 45,
        r: 5, // border radius
        fill: '#CCE3F5',
        style: {
          height: '35px',
          fontSize: '14px'
        },
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
    chart: {
      marginTop: 100,
      zoomType: 'none'
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
        color: '#75787b',
        width: 1,
        value: props.data.projectedDate.timestamp,
        zIndex: 10,
        label: {
          text: 'Values after ' + props.data.projectedDate.label + ' are projected',
          align: 'right',
          rotation: 0,
          style: {
            color: '#5a5d61'
          },
          y: -15
        }
      } ]
    },
    yAxis: {
      opposite: false,
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
      title: {
        text: 'Year-over-year change (%)',
        style: {
          'color': '#5a5d61',
          'font-size': '16px'
        },
        x: -15
      },
      showLastLabel: true
    },
    navigator: {
      maskFill: 'rgba(0, 0, 0, 0.05)',
      handles: {
        backgroundColor: '#fff',
        borderColor: '#101820'
      },
      series: {
        color: colors.primary,
        lineWidth: 2
      }
    },
    series: [ {
      type: 'column',
      data: props.data,
      color: colors.primary,
      name: 'Year-over-year change (%)',
      tooltip: {
        valueDecimals: 2
      },
      zoneAxis: 'x',
      zones: [ {
        value: props.data.projectedDate.timestamp
      }, {
        color: colors.secondary
      } ]
    } ],
    responsive: {
      rules: [{
        condition: {
          maxWidth: responsiveMaxWidth
        },
        chartOptions: {
          chart: {
            marginTop: 60,
            height: 440,
            spacingBottom: 60
          },
          navigator: {
            enabled: false
          },
          plotOptions: {
            column: {
              dataGrouping: {
                enabled: false
              }
            }
          },
          rangeSelector: {
            buttonSpacing: 15,
            buttonPosition: {
              x: ( windowWidth - 275 ) / 2,
              y: 390
            },
            buttonTheme: {
              width: 16,
              height: 16,
              padding: 14
            }
          },
          scrollbar: {
            enabled: false
          },
          xAxis: {
            plotLines: []
          },
          yAxis: {
            title: {
              align: 'high',
              text: '',
              offset: 0,
              rotation: 0,
              y: -20
            },
            x: 0,
          }
        }
      }]
    }
  };

  Highcharts.stockChart( props.selector, options,
    function( chart ) {

      var ele = chart.container;

      if ( windowWidth <= 600 ) {

        var projDiv = ele.appendChild( document.createElement( 'div' ) );
        projDiv.appendChild( document.createTextNode( projectedText ) );
        projDiv.style.position = 'absolute';
        projDiv.style.top = '0px';
        projDiv.style.left = '7px';
        projDiv.style.fontSize = '16px';

        chart.renderer.text( 'SELECT TIME RANGE', ( windowWidth - 175 ) / 2, 370 )
          .css( {
            color: '#5a5d61',
            fontSize: '14px',
            textAlign: 'left'
          } )
          .add();

        chart.renderer.text( 'Year-over-year change (%)', 7, 70 )
          .css( {
            color: '#5a5d61',
            fontSize: '16px'
          } )
          .add();

        chart.renderer.rect( 0, 45, windowWidth - 20, 2 )
          .attr( {
            fill: '#E3E4E5',
            zIndex: 10
          } )
          .add();

      } else {
        chart.renderer.text( 'Select time range', 7, 16 )
          .css( {
            color: '#5a5d61',
            fontSize: '14px'
          } )
          .add();

        chart.renderer.rect( 0, 75, 650, 2 )
          .attr( {
            fill: '#E3E4E5',
            zIndex: 10
          } )
          .add();
      }

    }
  );

}

module.exports = BarChart;
