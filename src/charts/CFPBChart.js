'use strict';

// var objectCreate = require( './utils/object-create-polyfill.js' );
var d3 = require( 'd3' );

function CFPBChart( name ) {
  this.name = name;
  this.type = undefined;
  this.data = undefined;
  this.width = 0;
  this.height = 0;
}

CFPBChart.prototype.drawGraph = function() {
  return false;
};

CFPBChart.prototype.updateGraph = function() {
  return false;
}

module.exports = CFPBChart;