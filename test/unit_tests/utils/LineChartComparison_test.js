/* global before describe it */

'use strict';

require( 'jsdom-global' )();

const chai = require( 'chai' );
const mock = require( 'mock-require' );
const expect = chai.expect;

mock( 'highcharts/js/highstock', {
  setOptions: () => {
    // do nothing
  },
  stockChart: ( props, options ) => options
} );

mock( 'highcharts/js/modules/accessibility', () => {
  // do nothing
} );

const lineChart = require( '../../../src/js/charts/LineChartComparison.js' );
let chart;

describe( 'LineChartComparison', () => {

  before( () => {
    chart = lineChart( {
      el: 'el',
      title: 'chart title!',
      description: 'chart description!',
      data: [
        {
          label: 'foo',
          data: [
            'bar',
            'baz'
          ]
        }
      ]
    } );
  } );

  it( 'should correctly set chart title', () => {
    expect( chart.title ).to.deep.equal( { text: 'chart title!' } );
  } );

  it( 'should correctly set chart description', () => {
    expect( chart.description ).to.equal( 'chart description!' );
  } );

  it( 'should correctly set chart series name', () => {
    expect( chart.series[0].name ).to.equal( 'foo' );
  } );

  it( 'should correctly set chart data', () => {
    expect( chart.series[0].data ).to.deep.equal( [ 'bar', 'baz' ] );
  } );

  it( 'should correctly set chart attributes', () => {
    expect( chart.series[0].legendIndex ).to.equal( 1 );
  } );

} );
