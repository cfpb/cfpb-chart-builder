'use strict';

const ajax = require( 'xdr' );
const Highcharts = require( 'highcharts/js/highmaps' );
const shapes = require( '../utils/map-shapes' );
require( 'highcharts/js/modules/accessibility' )( Highcharts );

Highcharts.setOptions( {
  lang: {
    thousandsSep: ','
  }
} );

// var _preFetchShapes = () => {
//   ajax( { url: shapes.states }, function( resp ) {
//     if ( resp.error ) {
//       console.error( resp.error );
//     }
//     shapes.states = JSON.parse( resp.data );
//   } );
//   ajax( { url: shapes.counties }, function( resp ) {
//     if ( resp.error ) {
//       console.error( resp.error );
//     }
//     shapes.counties = JSON.parse( resp.data );
//   } );
// };

// setTimeout( _preFetchShapes, 1000 );

class GeoMap {

  constructor( { el, metadata, data, title, desc, shapes, rawData = {}} ) {

    var usMap = Highcharts.geojson( shapes ),
        lines = Highcharts.geojson( shapes, 'mapline' )[0];

    var rows = data[0].data;
    data = Object.keys( rows ).map( row => ( {
      fips: row,
      name: rows[row].name,
      // TODO: Remove this hardcoded pct30 key and rely on a 'value' field
      value: rows[row].pct30 * 100
    } ) );

    // Highcharts.each( usMap, function( mapPoint ) {
    //   if ( rawData[mapPoint.properties.id] ) {
    //     mapPoint.name = rawData[mapPoint.properties.id].name;
    //   }
    // } );

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
      series: [
        {
          mapData: usMap,
          data: data,
          joinBy: [ 'id', 'fips' ],
          name: title,
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
          color: 'gray'
        }
      ]
    };

    this.chart = Highcharts.mapChart( el, Object.assign( {}, this.chartOptions ) );
  }

  update ( newOptions ) {
    // Merge the old chart options with the new ones
    Object.assign( this.chartOptions, newOptions );
    this.chart.update( this.chartOptions, true, true );
    this.chart.hideLoading();
  }

  // update( { title, desc, metadata, data, rawData = {}} ) {
  //   var usMap = Highcharts.geojson( shapes[metadata] ),
  //       lines = Highcharts.geojson( shapes[metadata], 'mapline' )[0];
  //
  //   Highcharts.each( usMap, function( mapPoint ) {
  //     if ( rawData[mapPoint.properties.id] ) {
  //       mapPoint.name = rawData[mapPoint.properties.id].name;
  //     }
  //   } );
  //
  //   mapOptions.title = title || mapOptions.title;
  //   mapOptions.desc = desc || mapOptions.desc;
  //   mapOptions.series[0].mapData = usMap;
  //   mapOptions.series[0].data = data;
  //   this.chart.update( mapOptions );
  // }

}

module.exports = GeoMap;
