'use strict';

var charts = {};
charts.bar = require( './BarChart' );
charts.GeoMap = require( './GeoMap' );
charts.line = require( './LineChart' );
charts.LineComparison = require( './LineChartComparison' );
charts.tileMap = require( './TileMap' );

module.exports = charts;
