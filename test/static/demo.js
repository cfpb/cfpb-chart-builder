'use strict';

// This file is used to test the programmatic rendering and updating of a chart

const ccb = require( '../../src/js' );

const container = document.getElementById( 'update-demo' );
const countdown = document.getElementById( 'update-demo-countdown' );
const mapContainer = document.getElementById( 'map' );
let seconds = 5;

const chart = ccb.createChart( {
  el: container,
  source: 'mortgage-performance/time-series/12081;mortgage-performance/time-series/national',
  type: 'line-comparison',
  metadata: 'pct30'
} );

const map = ccb.createChart( {
  el: mapContainer,
  source: 'mortgage-performance/map-data/states/2009-01',
  type: 'geo-map',
  metadata: 'states'
} );

const interval = setInterval( () => {
  if ( seconds > 1 ) {
    countdown.innerHTML = `will update in ${--seconds} seconds`;
    return;
  }
  countdown.innerHTML = 'has been automatically updated';
  clearInterval( interval );
}, 1000 );

setTimeout( () => {
  chart.update({
    source: 'mortgage-performance/time-series/12031;mortgage-performance/time-series/national',
    metadata: 'pct90'
  });
  map.update({
    source: 'mortgage-performance/map-data/counties/2009-01',
    metadata: 'counties'
  });
}, 5000 );
