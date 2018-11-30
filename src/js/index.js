import ajax from './utils/get-data';
import createChartDir from './charts';
import documentReady from './utils/document-ready';
import fetchShapes from './utils/map-shapes';

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
        fetchShapes( chartOptions.metadata ).then( shapes => {
          chartOptions.shapes = shapes[0];
          this.highchart = new createChartDir.GeoMap( chartOptions );
        } );
        break;
      case 'line-comparison':
        this.highchart = new createChartDir.LineChartComparison( chartOptions );
        break;
      case 'line-index':
        this.highchart = new createChartDir.LineChartIndex( chartOptions );
        break;
      case 'line':
        this.highchart = new createChartDir.LineChart( chartOptions );
        break;
      case 'bar':
        this.highchart = new createChartDir.BarChart( chartOptions );
        break;
      case 'tile_map':
        this.highchart = new createChartDir.TileMap( chartOptions );
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
        fetchShapes( this.chartOptions.metadata ).then( shapes => {
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
function createChart( opts ) {
  return new Chart( opts );
}

/**
 * Creates several charts at once.
 * @returns {Array} List of chart instances.
 */
function createCharts() {
  const elements = document.querySelectorAll( '.cfpb-chart' );
  const charts = [];

  // Ignore divs with a `data-chart-ignore` data attribute
  let element;
  let chart;
  for ( let i = 0, len = elements.length; i < len; i++ ) {
    if ( !elements[i].getAttribute( 'data-chart-ignore' ) ) {
      element = elements[i];
      chart = new Chart( {
        el: element,
        title: element.getAttribute( 'data-chart-title' ),
        yAxisLabel: element.getAttribute( 'data-chart-y-axis-label' ),
        type: element.getAttribute( 'data-chart-type' ),
        color: element.getAttribute( 'data-chart-color' ),
        metadata: element.getAttribute( 'data-chart-metadata' ),
        source: element.getAttribute( 'data-chart-source' )
      } );
      charts.push( chart );
    }
  }

  return charts;
}

/* *
   When the document is ready, the code for cfpb-chart-builder seeks out chart
   blocks and generates charts inside the designated elements. */
documentReady( createCharts );

export {
  createChart,
  createCharts
};
