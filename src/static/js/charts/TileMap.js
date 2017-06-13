'use strict';

var Highcharts = require( 'highcharts/js/highmaps' );
require( 'highcharts/js/modules/accessibility' )( Highcharts );

function _drawLegend( chart ) {

  function _boxStyle( color ) {
    return {
      'stroke-width': 1,
      'stroke': '#75787b',
      'fill': color
    };
  }

   // args: (str, x, y, shape, anchorX, anchorY, useHTML, baseline, className)
  chart.renderer.label('Year-over-year change (rounded to the nearest whole number)', 5, 5, null, null, null, true, false, 'label__tile-map').add();


  var legend = chart.renderer.g('legend__tile-map ').add();

  chart.renderer.rect( 10, 48, 15, 15 ).attr( _boxStyle( '#bae0a2' ) ).add(legend);
  chart.renderer.rect( 10, 71, 15, 15 ).attr( _boxStyle( '#e2efd8' ) ).add(legend);
  chart.renderer.rect( 10, 94, 15, 15 ).attr( _boxStyle( '#f7f8f9' ) ).add(legend);
  chart.renderer.rect( 10, 117, 15, 15 ).attr( _boxStyle( '#d6e8fa' ) ).add(legend);
  chart.renderer.rect( 10, 140, 15, 15 ).attr( _boxStyle( '#96c4ed' ) ).add(legend);

  chart.renderer.text( '16% or greater', 32, 61 ).add(legend);
  chart.renderer.text( '6% to 15%', 32, 84 ).add(legend);
  chart.renderer.text( '-5% to 5%', 32, 107 ).add(legend);
  chart.renderer.text( '-15% to -6%', 32, 130 ).add(legend);
  chart.renderer.text( '-16% or less', 32, 153 ).add(legend);

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
    tooltip: {
      enabled: false
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
