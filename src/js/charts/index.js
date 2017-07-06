'use strict';

var charts = {};
charts.bar = require( './BarChart' );
charts.line = require( './LineChart' );
charts.map = require( './TileMap' );

charts.mortgagePerformance = require( './MortgagePerformance' );

module.exports = charts;
