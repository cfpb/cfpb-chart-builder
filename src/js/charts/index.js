'use strict';

var charts = {};
charts.bar = require( './BarChart' );
charts.line = require( './LineChart' );
charts.tileMap = require( './TileMap' );
charts.GeoMap = require( './GeoMap' );
charts.mortgagePerformance = require( './MortgagePerformance' );

module.exports = charts;
