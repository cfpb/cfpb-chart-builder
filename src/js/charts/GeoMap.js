const Highcharts = require( 'highcharts/js/highmaps' );
const outlines = require( '../utils/state-outlines' );
const separators = require( '../utils/map-separators' );
const colorRange = require( '../utils/color-range' );
require( 'highcharts/js/modules/accessibility' )( Highcharts );

Highcharts.setOptions( {
  lang: {
    thousandsSep: ','
  }
} );

class GeoMap {

  constructor( { el, metadata, data, color, desc, shapes, tooltipFormatter,
    pointDescriptionFormatter, seriesDescriptionFormatter, screenReaderSectionFormatter } ) {

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
        skipNullPoints: true
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

      /**
       * pointDescriptionFormatter - Formatter function for tooltips.
       *
       * @returns {type} HTML string for the tooltip.
       */
      this.chartOptions.tooltip.formatter = function() {
        return tooltipFormatter( this.point, data[0].meta );
      };
    }

    if ( pointDescriptionFormatter ) {

      /**
       * pointDescriptionFormatter - Formatter function to use instead of the
       *  default for point descriptions.
       *
       * @param {type} point Highcharts point to describe
       *
       * @returns {type} String with the description of the point for a screen
       *  reader user.
       */
      this.chartOptions.pointDescriptionFormatter = function( point ) {
        return pointDescriptionFormatter( point, data[0].meta );
      };
    }

    if ( seriesDescriptionFormatter ) {

      /**
       * screenReaderSectionFormatter - Formatter function to use instead of the
       *  default for series descriptions.
       *
       * @param {type} series Highcharts series to describe
       *
       * @returns {type} String with the description of the series for a screen
       *  reader user.
       */
      this.chartOptions.seriesDescriptionFormatter = function( series ) {
        return seriesDescriptionFormatter( series );
      };
    }

    if ( screenReaderSectionFormatter ) {

      /**
       * screenReaderSectionFormatter - A formatter function to create the HTML
       *  contents of the hidden screen reader information region.
       *
       * @param {type} chart Highcharts chart object
       *
       * @returns {type} String with the HTML content of the region.
       */
      this.chartOptions.screenReaderSectionFormatter = function( chart ) {
        return screenReaderSectionFormatter( chart );
      };
    }

    // TODO: remove when gulp build config is updated to handle spread operator.
    // eslint-disable-next-line prefer-object-spread
    this.chart = Highcharts.mapChart( el, Object.assign( {}, this.chartOptions ) );
  }

  static getSeries( data, shapes, metadata ) {
    const usMap = Highcharts.geojson( shapes ),
          borders = Highcharts.geojson( outlines, 'mapline' ),
          lines = Highcharts.geojson( separators, 'mapline' ),
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

      /* Records with insufficient data are 'null' in the API.
         If the record's value is anything but a number, set it to -1. */
      value: typeof rows[row].value === 'number' ? rows[row].value * 100 : -1
    } ) );

    const stateOutlinesLayer = {
      type: 'mapline',
      name: 'Borders',
      exposeElementToA11y: false,
      data: borders,
      enableMouseTracking: false,
      skipKeyboardNavigation: true,
      className: `cfpb-chart-geo-state-outline-${ metadata }`,
      id: `cfpb-chart-geo-state-outline-${ metadata }`,
      // State data comes with state outlines so remove that layer
      visible: metadata !== 'states',
      states: {
        hover: {
          enabled: false
        }
      }
    };

    const mapSeparatorsLayer = {
      type: 'mapline',
      name: 'Map separators',
      exposeElementToA11y: false,
      data: lines,
      enableMouseTracking: false,
      skipKeyboardNavigation: true,
      className: 'cfpb-chart-geo-map-separators',
      states: {
        hover: {
          enabled: false
        }
      }
    };

    const dataLayer = {
      mapData: points,
      exposeElementToA11y: true,
      className: `cfpb-chart-geo-data-outline-${ metadata }`,
      id: `cfpb-chart-geo-data-outline-${ metadata }`,
      data: data,
      nullInteraction: true,
      joinBy: [ 'id', 'fips' ],
      states: {
        hover: {
          enabled: false
        }
      }
    };

    return [ dataLayer, mapSeparatorsLayer, stateOutlinesLayer ];
  }

  update( newOptions ) {
    if ( newOptions.data ) {
      newOptions.series = this.constructor.getSeries( newOptions.data, newOptions.shapes, newOptions.metadata );
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
    this.chart.update( this.chartOptions );
    this.chart.hideLoading();
  }

}

export default GeoMap;
