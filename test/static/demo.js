// This file is used to test the programmatic rendering and updating of a chart

import { createChart } from '../../src/js/index';

const container = document.getElementById( 'update-demo' );
const countdown = document.getElementById( 'update-demo-countdown' );
const mapContainer = document.getElementById( 'map' );
let seconds = 5;

const chart = createChart( {
  el: container,
  source: 'mortgage-performance/time-series/30-89/national',
  type: 'line-comparison',
  metadata: 'pct30'
} );

const map = createChart( {
  el: mapContainer,
  source: 'mortgage-performance/map-data/30-89/metros/2009-01',
  type: 'geo-map',
  metadata: 'metros',
  color: 'blue',
  tooltipFormatter: point => `<dl>
    ${ point.name ? point.name : `<dt>${ point.name }</dt>` }
    <dd>${ point.value > 0 ? `${ point.value }%` : 'Insufficient data for this area' }</dd>
  </dl>`
} );

/*const interval = setInterval( () => {
  if ( seconds > 1 ) {
    countdown.innerHTML = `will update in ${--seconds} seconds`;
    return;
  }
  countdown.innerHTML = 'has been automatically updated';
  clearInterval( interval );
}, 1000 );

const updateAllTheCharts = () => {

  // 10740 refers to a county ID that'll highlight so we can check the borders.
  setTimeout( () => {
    console.log( 'map.highchart', map.highchart );
    map.highchart.chart.get( '10740' ).select( true );
  }, 1000 );

  setTimeout( () => {
    chart.update( {
      source: 'mortgage-performance/time-series/30-89/12031;mortgage-performance/time-series/30-89/national',
      metadata: 'pct90'
    } );
    map.update( {
      source: 'mortgage-performance/map-data/30-89/counties/2009-01',
      metadata: 'counties'
    } );
  }, 5000 );

  setTimeout( () => {
    map.update( {
      source: 'mortgage-performance/map-data/30-89/states/2009-01',
      metadata: 'states'
    } );
  }, 10000 );

  setTimeout( () => {
    map.update( {
      source: 'mortgage-performance/map-data/30-89/counties/2009-01',
      metadata: 'counties'
    } );
  }, 15000 );

  setTimeout( () => {
    map.update( {
      source: 'mortgage-performance/map-data/30-89/metros/2009-01',
      metadata: 'metros'
    } );
  }, 20000 );

  // 10740 refers to a county ID that'll highlight so we can check the borders.
  setTimeout( () => {
    map.highchart.chart.get( '10740' ).select( true );
  }, 30000 );

};*/

// Sauce Labs only runs the tests for ten seconds so don't test all
// the chart updating stuff if we're in a CI environment.
//if ( !isCI() ) {
  //updateAllTheCharts();
//}

const testGeomapStatesBtn = document.querySelector( '#test-geomap-states' );
testGeomapStatesBtn.addEventListener( 'click', testGeomapStates );

const testGeomapCountiesBtn = document.querySelector( '#test-geomap-counties' );
testGeomapCountiesBtn.addEventListener( 'click', testGeomapCounties );

const testGeomapMetrosBtn = document.querySelector( '#test-geomap-metros' );
testGeomapMetrosBtn.addEventListener( 'click', testGeomapMetros );

const testGeomapHighlightBtn = document.querySelector( '#test-geomap-highlight' );
testGeomapHighlightBtn.addEventListener( 'click', testGeomapHighlight );

const btns = [
  testGeomapStatesBtn,
  testGeomapCountiesBtn,
  testGeomapMetrosBtn,
  testGeomapHighlightBtn
];

function disableBtns() {
  for ( let i in btns ) {
    btns[i].setAttribute( 'disabled', '' );
  }
}

function enableBtns() {
  for ( let i in btns ) {
    btns[i].removeAttribute( 'disabled' );
  }
}

function testGeomapStates() {
  disableBtns();

  map.update( {
    source: 'mortgage-performance/map-data/30-89/states/2009-01',
    metadata: 'states'
  } ).then( () => {
    enableBtns();
  } );
}

function testGeomapCounties() {
  disableBtns();

  map.update( {
    source: 'mortgage-performance/map-data/30-89/counties/2009-01',
    metadata: 'counties'
  } ).then( () => {
    enableBtns();
  } );
}

function testGeomapMetros() {
  disableBtns();

  map.update( {
    source: 'mortgage-performance/map-data/30-89/metros/2009-01',
    metadata: 'metros'
  } ).then( () => {
    enableBtns();
  } );
}

function testGeomapHighlight() {
  disableBtns();

  map.update( {
    source: 'mortgage-performance/map-data/30-89/metros/2009-01',
    metadata: 'metros'
  } ).then( () => {
    map.highchart.chart.get( '10740' ).select( true );
    enableBtns();
  } );
}
