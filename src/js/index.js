require( 'core-js/es6/symbol' );
require( 'core-js/es6/promise' );
require( 'core-js/fn/object/assign' );
require( 'core-js/fn/array/index-of' );

const documentReady = require( './utils/document-ready' );
const createChart = require( './charts' );
const axes = require( './charts/axes' );
const ajax = require( './utils/get-data' );
const shapes = require( './utils/map-shapes' );

class Chart {

  constructor( chartOptions ) {
    this.chartOptions = chartOptions;
    ajax( chartOptions.source ).then( data => {
      this.chartOptions.data = data;
      this.draw( this.chartOptions );
    } );
  }

  draw( chartOptions ) {
    switch ( chartOptions.type ) {
      case 'geo-map':
        shapes.fetch( chartOptions.metadata ).then( shapes => {
          chartOptions.shapes = shapes[0];
          this.highchart = new createChart.GeoMap( chartOptions );
        } );
        break;
      case 'line-comparison':
        this.highchart = new createChart.LineComparison( chartOptions );
        break;
      case 'line':
        this.highchart = createChart.line( chartOptions );
        break;
      case 'bar':
        this.highchart = createChart.bar( chartOptions );
        break;
      case 'tile_map':
        this.highchart = createChart.tileMap( chartOptions );
        break;
      default:
    }
  }

  update( newOptions ) {

    const needNewMapShapes = this.chartOptions.type === 'geo-map' &&
                             this.chartOptions.metadata !== newOptions.metadata;

    // Merge the old chart options with the new ones
    Object.assign( this.chartOptions, newOptions );

    /* If the source wasn't changed, we don't need to fetch new data and can
       immediately redraw the chart */
    if ( !newOptions.source ) {
      return this.highchart.update( this.chartOptions );
    }
    // Otherwise fetch the data and redraw once it arrives
    this.highchart.chart.showLoading( ' ' );
    return ajax( this.chartOptions.source ).then( data => {
      this.chartOptions.data = data;
      if ( needNewMapShapes ) {
        shapes.fetch( this.chartOptions.metadata ).then( shapes => {
          this.chartOptions.shapes = shapes[0];
          this.highchart.update( this.chartOptions );
        } );
        return;
      }
      this.highchart.update( this.chartOptions );
    } );
  }

}

/**
 * Creates a chart
 * @param {Object} opts - Options to pass to highcharts when creating the chart.
 * @returns {Chart} A Chart instance.
 */
function _createChart( opts ) {
  return new Chart( opts );
}

/**
 * Creates several charts at once.
 * TODO: Return array of chart instances.
 */
function _createCharts() {
  const elements = document.querySelectorAll( '.cfpb-chart' );
  const charts = [];

  // Ignore divs with a `data-chart-ignore` data attribute
  for ( let i = 0; i < elements.length; ++i ) {
    if ( !elements[i].getAttribute( 'data-chart-ignore' ) ) {
      charts.push( elements[i] );
    }
  }

  for ( const chart of charts ) {
    const chartOptions = {
      el: chart,
      title: chart.getAttribute( 'data-chart-title' ),
      yAxisLabel: chart.getAttribute( 'data-chart-y-axis-label' ),
      type: chart.getAttribute( 'data-chart-type' ),
      color: chart.getAttribute( 'data-chart-color' ),
      metadata: chart.getAttribute( 'data-chart-metadata' ),
      source: chart.getAttribute( 'data-chart-source' )
    };

    const dataAttrFormatterStr = 'data-chart-axes-formatter';
    const axisLabelFormatter = chart.getAttribute( dataAttrFormatterStr );

    if ( typeof axes[axisLabelFormatter] === 'undefined' ) {
      chartOptions.axisFormatter = axes.axisDefault;
    } else {
      chartOptions.axisFormatter = axes[axisLabelFormatter];
    }

    new Chart( chartOptions );
  }
}

/* *
   When the document is ready, the code for cfpb-chart-builder seeks out chart
   blocks and generates charts inside the designated elements. */
documentReady( _createCharts );


const charts = {
  createChart: _createChart,
  createCharts: _createCharts
};

module.exports = charts;
