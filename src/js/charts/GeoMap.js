'use strict';

const ajax = require( 'xdr' );
const Highcharts = require( 'highcharts/js/highmaps' );
require( 'highcharts/js/modules/accessibility' )( Highcharts );

Highcharts.setOptions( {
  lang: {
    thousandsSep: ','
  }
} );

class GeoMap {

  constructor( { el, metadata, data, title, desc, shapes } ) {

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
      tooltip: {
        headerFormat: '',
        formatter: function() {
          var percent = Math.max( Math.round( this.point.value * 10 ) / 10, 2.8 ).toFixed( 1 );
          if ( !this.point.name ) {
            return `${ percent }%`;
          }
          return `${ this.point.name }: ${ percent }%`;
        }
      },
      colorAxis: {
        dataClasses: [
          {
            from: 0,
            to: 0,
            color: '#eee'
          },
          {
            from: 0,
            to: 2,
            color: '#E2EFD8'
          },
          {
            from: 2,
            to: 4,
            color: '#C7E5B3'
          },
          {
            from: 4,
            to: 6,
            color: '#ADDC91'
          },
          {
            from: 6,
            to: 8,
            color: '#66C368'
          },
          {
            from: 8,
            to: 10,
            color: '#20AA3F'
          },
          {
            from: 10,
            color: '#1E9642'
          }
        ]
      },
      series: this.constructor.getSeries( data, shapes )
    };

    this.chart = Highcharts.mapChart( el, Object.assign( {}, this.chartOptions ) );
  }

  static getSeries( data, shapes ) {
    const usMap = Highcharts.geojson( shapes ),
          lines = Highcharts.geojson( shapes, 'mapline' )[0],
          rows = data[0].data;
    let points = [];

    usMap.forEach( mapPoint => {
      if ( rows[mapPoint.properties.id] ) {
        mapPoint.name = rows[mapPoint.properties.id].name;
        points.push(mapPoint);
      }
    } );

    data = Object.keys( rows ).map( row => ( {
      fips: row,
      name: rows[row].name,
      // TODO: Remove this hardcoded pct30 key and rely on a 'value' field
      value: rows[row].pct30 * 100
    } ) );

    const series = [
      {
        mapData: points,
        data: data,
        joinBy: [ 'id', 'fips' ],
        tooltip: {
          valueSuffix: '%'
        },
        borderWidth: 0.5,
        states: {
          hover: {
            color: '#a4edba'
          }
        }
      },
      {
        type: 'mapline',
        name: 'Borders',
        data: [ lines ],
        enableMouseTracking: false
      }
    ];

    return series;
  }

  update( newOptions ) {
    if ( newOptions.data ) {
      newOptions.series = this.constructor.getSeries( newOptions.data, newOptions.shapes );
    }
    // Merge the old chart options with the new ones
    Object.assign( this.chartOptions, newOptions );
    this.chart.update( this.chartOptions, true, true );
    this.chart.hideLoading();
  }

}

module.exports = GeoMap;
