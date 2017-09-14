'use strict';

const ajax = require( 'xdr' );
const Highcharts = require( 'highcharts/js/highmaps' );
const outlines = require( '../utils/state-outlines' );
const colorRange = require( '../utils/color-range' );
require( 'highcharts/js/modules/accessibility' )( Highcharts );

Highcharts.setOptions( {
  lang: {
    thousandsSep: ','
  }
} );

class GeoMap {

  constructor( { el, metadata, data, color, title, desc, shapes, tooltipFormatter } ) {

    this.chartOptions = {
      credits: false,
      title: {
        text: ''
      },
      animation: {
        duration: 2000,
        easing: 'easeOutBounce'
      },
      legend: false,
      description: desc,
      mapNavigation: {
        enabled: true,
        enableMouseWheelZoom: false
      },
      plotOptions: {
        exposeElementToA11y: true
      },
      accessibility: {
        enabled: true,
        keyboardNavigation: {
          enabled: true
        },
        skipNullPoints: true,
        pointDescriptionFormatter: function( point ) {
          var percent = Math.round( point.value * 10 ) / 10;
          return `${ point.name } is at ${ percent }%`;
        },
        seriesDescriptionFormatter: function( series ) {
          return '30 day delinquent mortgages';
        },
        screenReaderSectionFormatter: () => 'Map showing 30-day delinquent mortgages in the United States.'
      },
      tooltip: {},
      states: {
        hover: {
          brightness: 0
        }
      },
      colorAxis: {
        dataClasses: colorRange[color]
      },
      series: this.constructor.getSeries( data, shapes, metadata )
    };

    if ( tooltipFormatter ) {
      this.chartOptions.tooltip.useHTML = true;
      this.chartOptions.tooltip.formatter = function() {
        return tooltipFormatter( this.point, data[0].meta );
      };
    }

    this.chart = Highcharts.mapChart( el, Object.assign( {}, this.chartOptions ) );
  }

  static getSeries( data, shapes, metadata ) {
    const usMap = Highcharts.geojson( shapes ),
          borders = Highcharts.geojson( outlines, 'mapline' ),
          rows = data[0].data,
          points = [];

    usMap.forEach( mapPoint => {
      if ( rows[mapPoint.properties.id] ) {
        mapPoint.name = rows[mapPoint.properties.id].name;
      } else {
        // Preserve the map point but leave its name blank if it has no data
        mapPoint.name = '';
      }
      points.push( mapPoint );
    } );

    data = Object.keys( rows ).map( row => ( {
      fips: row,
      name: rows[row].name,
      // Records with insufficient data are 'null' in the API.
      // If the record's value is anything but a number, set it to -1.
      value: typeof rows[row].value === 'number' ? rows[row].value * 100 : -1
    } ) );

    const stateOutlinesLayer = {
      type: 'mapline',
      name: 'Borders',
      exposeElementToA11y: false,
      data: borders,
      enableMouseTracking: false,
      skipKeyboardNavigation: true,
      states: {
        hover: {
          enabled: false
        }
      }
    };

    const dataLayer = {
      mapData: points,
      exposeElementToA11y: true,
      data: data,
      nullInteraction: true,
      joinBy: [ 'id', 'fips' ],
      states: {
        hover: {
          enabled: false
        }
      }
    };

    const series = [ dataLayer, stateOutlinesLayer ];

    // State data comes with state outlines so remove that layer
    if ( metadata === 'states' ) {
      series.pop();
    }

    return series;
  }

  update( newOptions ) {
    if ( newOptions.data ) {
      newOptions.series = this.constructor.getSeries( newOptions.data, newOptions.shapes );
    }
    if ( newOptions.tooltipFormatter ) {
      newOptions.tooltip = {
        useHTML: true,
        formatter: function() {
          return newOptions.tooltipFormatter( this.point, newOptions.data[0].meta );
        }
      };
    }
    // Merge the old chart options with the new ones
    Object.assign( this.chartOptions, newOptions );
    this.chart.update( this.chartOptions, true, true );
    this.chart.hideLoading();
  }

}

module.exports = GeoMap;
