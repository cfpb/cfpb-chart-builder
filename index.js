'use strict';

var barChart = require( './src/charts/BarChart.js' );
var tileMap = require( './src/charts/TileMap.js' );

var chartBuilder = {
  barChart: barChart,
  tileMap: tileMap
}

module.exports = chartBuilder;