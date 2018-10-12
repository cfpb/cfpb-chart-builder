const shapes = require( '../../sample_data/mortgage-performance/map-data/30-89/states/us-states.geo.json' );

jest.mock( 'highcharts/js/highmaps', () => ( {
  setOptions: jest.fn(),
  geojson: () => [],
  mapChart: ( props, opts ) => {
    const options = opts;
    return {
      update: newOptions => Object.assign( options, newOptions ),
      options: options,
      showLoading: jest.fn(),
      hideLoading: jest.fn()
    };
  }
} ) );

jest.mock( 'highcharts/js/modules/accessibility', () => jest.fn() );

import GeoMap from '../../../src/js/charts/GeoMap';
let geoMap;

describe( 'GeoMapComparison', () => {

  beforeEach( () => {
    geoMap = new GeoMap( {
      el: 'el',
      desc: 'chart description!',
      metadata: 'states',
      shapes: shapes,
      tooltipFormatter: ( point, meta ) => [ point, meta.fips_type ],
      pointDescriptionFormatter: point => jest.fn(),
      seriesDescriptionFormatter: point => jest.fn(),
      screenReaderSectionFormatter: point => jest.fn(),
      data: [
        {
          meta: {
            date: '2009-01-01',
            fips_type: 'state'
          },
          data: {
            10: {
              value: 0.036920278872385574,
              name: 'California'
            },
            12: {
              value: 0.05738747837483777,
              name: 'Delaware'
            }
          }
        }
      ]
    } );
  } );

  it( 'should correctly set chart description', () => {
    expect( geoMap.chart.options.description ).toBe( 'chart description!' );
  } );

  it( 'should correctly set chart data', () => {
    expect( geoMap.chart.options.series[0].data ).toEqual( [
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

  it( 'should correctly set a tooltip formatter', () => {
    expect( typeof geoMap.chart.options.tooltip.formatter ).toBe( 'function' );
    expect( geoMap.chart.options.tooltip.formatter()[1] ).toBe( 'state' );
  } );

  it( 'should correctly update a tooltip formatter', () => {
    geoMap.update( {
      data: [ {
        meta: {
          date: '2020-01-01',
          fips_type: 'state'
        },
        data: {
          18: {
            value: 0.036920278872385574,
            name: 'California'
          },
          22: {
            value: 0.05738747837483777,
            name: 'Delaware'
          }
        }
      } ],
      tooltipFormatter: ( point, meta ) => [ point, meta.date ]
    } );
    expect( typeof geoMap.chart.options.tooltip.formatter ).toBe( 'function' );
    expect( geoMap.chart.options.tooltip.formatter()[1] ).toBe( '2020-01-01' );
  } );

  it( 'should correctly set a point description formatter', () => {
    expect( typeof geoMap.chart.options.pointDescriptionFormatter ).toBe( 'function' );
  } );

  it( 'should correctly set a series description formatter', () => {
    expect( typeof geoMap.chart.options.seriesDescriptionFormatter ).toBe( 'function' );
  } );

  it( 'should correctly set a screen reader section formatter', () => {
    expect( typeof geoMap.chart.options.screenReaderSectionFormatter ).toBe( 'function' );
  } );

  it( 'should correctly set chart attributes', () => {
    expect( geoMap.chart.options.series[0].nullInteraction ).toBe( true );
  } );

  it( 'should be able to update its description', () => {
    geoMap.update( { description: 'bananas' } );
    expect( geoMap.chart.options.description ).toBe( 'bananas' );
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
            value: 0.036920278872385574,
            name: 'California'
          },
          22: {
            value: 0.05738747837483777,
            name: 'Delaware'
          }
        }
      }
    ]} );
    expect( geoMap.chart.options.series[0].data[0].fips ).toBe( '18' );
    expect( geoMap.chart.options.series[0].data[1].fips ).toBe( '22' );
  } );

} );
