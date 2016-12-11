'use strict';

var barChart = require( './src/charts/BarChart.js' );
var tileMap = require( './src/charts/TileMap.js' );
var lineChart = require( './src/charts/LineChart.js' );

var chartBuilder = {
  barChart: barChart,
  tileMap: tileMap,
  lineChart: lineChart
}

module.exports = chartBuilder;