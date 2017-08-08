'use strict';

var charts = {};
charts.bar = require( './BarChart' );
charts.line = require( './LineChart' );
charts.lineComparison = require( './LineChartComparison' );
charts.map = require( './TileMap' );

module.exports = charts;
