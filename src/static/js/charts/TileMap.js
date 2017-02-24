'use strict';

var Highcharts = require( 'highcharts/highmaps' );
require( 'highcharts/modules/accessibility' )( Highcharts );

function _drawLegend( chart ) {

  var legendStyle = {
    color: '#101820',
    fontSize: '16px',
    fontWeight: 'bold',
    fontFamily: "'AvenirNextLTW01-Demi',Arial,sans-serif;"
  };

  var textStyle = {
    color: '#5a5d61',
    fontSize: '16px',
    fontFamily: "'AvenirNextLTW01-Regular',Arial,sans-serif"
  };

  function _boxStyle( color ) {
    return {
      'stroke-width': 1,
      'stroke': '#75787b',
      'fill': color
    };
  }

  chart.renderer.text( 'Year-over-year change (rounded to the nearest whole number)', 10, 25 ).css( legendStyle ).add();

  chart.renderer.rect( 10, 48, 15, 15 ).attr( _boxStyle( '#bae0a2' ) ).add();
  chart.renderer.rect( 10, 71, 15, 15 ).attr( _boxStyle( '#e2efd8' ) ).add();
  chart.renderer.rect( 10, 94, 15, 15 ).attr( _boxStyle( '#f7f8f9' ) ).add();
  chart.renderer.rect( 10, 117, 15, 15 ).attr( _boxStyle( '#d6e8fa' ) ).add();
  chart.renderer.rect( 10, 140, 15, 15 ).attr( _boxStyle( '#96c4ed' ) ).add();

  chart.renderer.text( '16% or greater', 32, 61 ).css( textStyle ).add();
  chart.renderer.text( '6% to 15%', 32, 84 ).css( textStyle ).add();
  chart.renderer.text( '-5% to 5%', 32, 107 ).css( textStyle ).add();
  chart.renderer.text( '-15% to -6%', 32, 130 ).css( textStyle ).add();
  chart.renderer.text( '-16% or less', 32, 153 ).css( textStyle ).add();

}

Highcharts.setOptions( {
  lang: {
    thousandsSep: ','
  }
} );

function TileMap( props ) {

  props = props || {};

  var options = {
    title: {
      text: props.title
    },
    chart: {
      marginTop: 150
    },
    description: props.description,
    credits: false,
    legend: {
      enabled: false
    },
    // tooltip: {
    //   borderColor: 'rgb(117, 120, 123)',
    //   formatter: function() {
    //     return this.point.tooltip;
    //   }
    // },
    tooltip: {
      enabled: false
    },
    responsive: {
      rules: [ {
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          chart: {
            height: 400
          },
          series: [ {
            type: 'map',
            borderColor: '#75787b',
            states: {
              hover: {
                brightness: 0,
                borderColor: '#101820'
              }
            },
            // borderWidth: 0.2,
            dataLabels: {
              enabled: true,
              color: '#101820',
              formatter: function() {
                return '<div style="text-align:center">' + this.point.name + '<br /><span style="font-weight:normal;">' + this.point.value + '%</span></div>';
              },
              useHTML: true,
              style: {
                fontSize: '10px',
                lineHeight: '1em'
              }
            },
            name: props.title,
            data: props.data
          } ]
        }
      } ]
    },
    series: [ {
      type: 'map',
      borderColor: '#75787b',
      states: {
        hover: {
          brightness: 0,
          borderColor: '#000'
        }
      },
      // borderWidth: 0.2,
      dataLabels: {
        enabled: true,
        color: '#101820',
        formatter: function() {
          return '<div style="text-align:center">' + this.point.name + '<br /><span style="font-weight:normal;">' + this.point.value + '%</span></div>';
        },
        useHTML: true,
        style: {
          fontSize: '14px',
          lineHeight: '1.4em'
        }
      },
      name: props.title,
      data: props.data
    } ]
  };

  Highcharts.mapChart( props.selector, options, _drawLegend );

}

module.exports = TileMap;
