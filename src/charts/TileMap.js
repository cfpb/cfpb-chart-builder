'use strict';

var Highcharts = require('highcharts/highmaps');

function TileMap(props) {

  var props = props || {};

  var options = {
    title: {
      text: props.title
    },
    chart: {
      width: 650,
      height: 500
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
    series: [{
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
        color: '#FFFFFF',
        format: '{point.name}<br />{point.value}%',
        style: ''
      },
      name: props.title,
      data: props.data
    }]
  };

  Highcharts.mapChart(props.selector, options);
}

module.exports = TileMap;
