jest.mock( 'highcharts/js/highstock', () => ( {
  setOptions: jest.fn(),
  stockChart: ( props, opts ) => {
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

const LineChart = require( '../../../src/js/charts/LineChartComparison.js' );
let line;

describe( 'LineChartComparison', () => {

  beforeEach( () => {
    line = new LineChart( {
      el: 'el',
      description: 'chart description!',
      data: [
        {
          meta: {
            name: 'Boston, MA'
          },
          data: [ {
            date: 1199163600000,
            value: 0.129563846384
          } ]
        }
      ]
    } );
  } );

  it( 'should correctly set chart description', () => {
    expect( line.chart.options.description ).toBe( 'chart description!' );
  } );

  it( 'should correctly set chart series name', () => {
    expect( line.chart.options.series[0].name ).toBe( 'Boston, MA' );
  } );

  it( 'should correctly set chart data', () => {
    expect( line.chart.options.series[0].data[0][0] ).toBe( 1199163600000 );
    expect( line.chart.options.series[0].data[0][1] ).toBe( 0.129563846384 );
  } );

  it( 'should correctly set chart attributes', () => {
    expect( line.chart.options.series[0].legendIndex ).toBe( 1 );
  } );

  it( 'should be able to update its description', () => {
    line.update( { description: 'bananas' } );
    expect( line.chart.options.description ).toBe( 'bananas' );
  } );

} );
