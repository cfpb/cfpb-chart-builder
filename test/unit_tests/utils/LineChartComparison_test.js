/* global before describe it */

'use strict';

require( 'jsdom-global' )();

const chai = require( 'chai' );
const mock = require( 'mock-require' );
const expect = chai.expect;
const noop = () => {
  // do nothing
};

mock( 'highcharts/js/highstock', {
  setOptions: noop,
  stockChart: ( props, opts ) => {
    const options = opts;
    return {
      update: newOptions => Object.assign( options, newOptions ),
      options: options,
      showLoading: noop,
      hideLoading: noop
    };
  }
} );

mock( 'highcharts/js/modules/accessibility', () => {
  // do nothing
} );

const LineChart = require( '../../../src/js/charts/LineChartComparison.js' );
let line;

describe( 'LineChartComparison', () => {

  before( () => {
    line = new LineChart( {
      el: 'el',
      description: 'chart description!',
      metadata: 'foo',
      data: [
        {
          meta: {
            name: 'foo'
          },
          data: [ {
            date: 1199163600000,
            foo: 1,
            bar: 2
          } ]
        }
      ]
    } );
  } );

  it( 'should correctly set chart description', () => {
    expect( line.chart.options.description ).to.equal( 'chart description!' );
  } );

  it( 'should correctly set chart series name', () => {
    expect( line.chart.options.series[0].name ).to.equal( 'foo' );
  } );

  it( 'should correctly set chart data', () => {
    expect( line.chart.options.series[0].data[0] ).to.deep.equal( [ 1199163600000, 1 ] );
  } );

  it( 'should correctly set chart attributes', () => {
    expect( line.chart.options.series[0].legendIndex ).to.equal( 1 );
  } );

  it( 'should be able to update its description', () => {
    line.update( { description: 'bananas' } );
    expect( line.chart.options.description ).to.deep.equal( 'bananas' );
  } );

  it( 'should be able to update its data', () => {
    line.update( { data: [
      {
        meta: {
          name: 'cheeseburger'
        },
        data: [ {
          date: 1199163600000,
          foo: 1,
          bar: 2
        } ]
      }
    ] } );
    expect( line.chart.options.series[0].name ).to.deep.equal( 'cheeseburger' );
    expect( line.chart.options.series[0].legendIndex ).to.equal( 1 );
  } );

} );
