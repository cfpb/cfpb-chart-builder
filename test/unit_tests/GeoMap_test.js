/* global before describe it */

'use strict';

require( 'jsdom-global' )();

const chai = require( 'chai' );
const mock = require( 'mock-require' );
const shapes = require( '../sample_data/mortgage-performance/map-data/states/us-states.geo.json' );
const expect = chai.expect;
const noop = () => {
  // do nothing
};

mock( 'highcharts/js/highmaps', {
  setOptions: noop,
  geojson: () => [],
  mapChart: ( props, opts ) => {
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

const GeoMap = require( '../../src/js/charts/GeoMap.js' );
let geoMap;

describe( 'GeoMapComparison', () => {

  before( () => {
    geoMap = new GeoMap( {
      el: 'el',
      desc: 'chart description!',
      metadata: 'states',
      shapes: shapes,
      data: [
        {
          meta: {
            date: '2009-01-01',
            fips_type: 'state'
          },
          data: {
            10: {
              pct30: 0.036920278872385574,
              name: 'California',
              pct90: 0.022400727493179753
            },
            12: {
              pct30: 0.05738747837483777,
              name: 'Delaware',
              pct90: 0.04792873873878374
            }
          }
        }
      ]
    } );
  } );

  it( 'should correctly set chart description', () => {
    expect( geoMap.chart.options.description ).to.equal( 'chart description!' );
  } );

  it( 'should correctly set chart data', () => {
    expect( geoMap.chart.options.series[0].data ).to.deep.equal( [
      {
        fips: '10',
        name: 'California',
        value: 3.6920278872385572
      },
      {
        fips: '12',
        name: 'Delaware',
        value: 5.7387478374837775
      }
    ] );
  } );

  it( 'should correctly set chart attributes', () => {
    expect( geoMap.chart.options.series[0].borderWidth ).to.equal( 0.5 );
  } );

  it( 'should be able to update its description', () => {
    geoMap.update( { description: 'bananas' } );
    expect( geoMap.chart.options.description ).to.deep.equal( 'bananas' );
  } );

  it( 'should be able to update its data', () => {
    geoMap.update( { data: [
      {
        meta: {
          date: '2009-01-01',
          fips_type: 'state'
        },
        data: {
          18: {
            pct30: 0.036920278872385574,
            name: 'California',
            pct90: 0.022400727493179753
          },
          22: {
            pct30: 0.05738747837483777,
            name: 'Delaware',
            pct90: 0.04792873873878374
          }
        }
      }
    ]} );
    expect( geoMap.chart.options.series[0].data[0].fips ).to.equal( '18' );
    expect( geoMap.chart.options.series[0].data[1].fips ).to.equal( '22' );
  } );

} );
