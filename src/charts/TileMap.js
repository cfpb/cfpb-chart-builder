'use strict';

var Highcharts = require( 'highcharts/highmaps' );

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
    description: props.description,
    credits: false,
    legend: {
      enabled: false
    },
    tooltip: {
      borderColor: 'rgb(117, 120, 123)',
      formatter: function() {
        return this.point.tooltip;
      }
    },
    series: [ {
      type: 'map',
      borderColor: 'rgb(117, 120, 123)',
      states: {
        hover: {
          brightness: 0,
          borderColor: '#000'
        }
      },
      // borderWidth: 0.2,
      dataLabels: {
        enabled: true,
        color: '#000000',
        formatter: function() {
          return '<div style="text-align:center">' + this.point.name + '<br />' + this.point.value + '%</div>';
        },
        useHTML: true
      },
      name: props.title,
      data: props.data
    } ]
  };

  Highcharts.mapChart( props.selector, options );
}

module.exports = TileMap;
