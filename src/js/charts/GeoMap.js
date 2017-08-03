'use strict';

var ajax = require( 'xdr' );
var Highcharts = require( 'highcharts/js/highmaps' );
require( 'highcharts/js/modules/accessibility' )( Highcharts );
var getGeoMapColor = require( '../utils/get-tile-map-color' );

var GEO_SHAPES = {
  states: require( '../utils/us-states.geo.js' ),
  // states: states: 'https://s3.amazonaws.com/files.consumerfinance.gov/data/mortgage-performance/meta/us-states.geo.json',
  metros: 'https://cdn.rawgit.com/primerano/ticket-files/master/us-cbsa.js',
  counties: 'https://s3.amazonaws.com/files.consumerfinance.gov/data/mortgage-performance/meta/us-counties.geo.json'
};

Highcharts.setOptions( {
  lang: {
    thousandsSep: ','
  }
} );

var _preFetchShapes = () => {
  ajax( { url: GEO_SHAPES.counties }, function( resp ) {
    if ( resp.error ) {
      console.error( resp.error );
    }
    GEO_SHAPES.metros = JSON.parse( resp.data );
  } );
  ajax( { url: GEO_SHAPES.counties }, function( resp ) {
    if ( resp.error ) {
      console.error( resp.error );
    }
    GEO_SHAPES.counties = JSON.parse( resp.data );
  } );
};

var mapOptions;

setTimeout(_preFetchShapes, 1000);

class GeoMap {

  constructor( { el, title, geoType, data, description, rawData = {} } ) {

    var usMap = Highcharts.geojson(GEO_SHAPES[geoType]),
        lines = Highcharts.geojson(GEO_SHAPES[geoType], "mapline")[0];

    Highcharts.each(usMap, function(mapPoint) {
      if (rawData[mapPoint.properties.id]) {
        mapPoint.name = rawData[mapPoint.properties.id].name;
      }
    });

    mapOptions = {
      credits: false,
      title: {
        text: ''
      },
      animation: {
            duration: 2000, //whatever you want
            easing: 'easeOutBounce'
        },
      legend: false,
      mapNavigation: {
        enabled: true
      },
      tooltip: {
        headerFormat: '',
        formatter: function() {
            var percent = Math.max( Math.round(this.point.value * 10) / 10, 2.8 ).toFixed(1);
            if (!this.point.name) {
              return `${percent}%`;
            }
            return `${this.point.name}: ${percent}%`;
        }
      },
      colorAxis: {
        dataClasses: [
          {
            from: 0,
            to: 0,
            color: "#eee"
          },
          {
            from: 0,
            to: 2,
            color: "#E2EFD8"
          },
          {
            from: 2,
            to: 4,
            color: "#C7E5B3"
          },
          {
            from: 4,
            to: 6,
            color: "#ADDC91"
          },
          {
            from: 6,
            to: 8,
            color: "#66C368"
          },
          {
            from: 8,
            to: 10,
            color: "#20AA3F"
          },
          {
            from: 10,
            color: "#1E9642"
          }
        ]
      },
      series: [
        {
          mapData: usMap,
          data: data,
          joinBy: ["id", "fips"],
          name: title,
          tooltip: {
            valueSuffix: "%"
          },
          borderWidth: 0.5,
          states: {
            hover: {
              color: "#a4edba"
            }
          }
        },
        {
          type: "mapline",
          name: "Borders",
          data: [ lines ],
          color: "gray"
        }
      ]
    };

    this.chart = Highcharts.mapChart( el, Object.assign({}, mapOptions) );
  }

  updateMap( { title, description, geoType, data, rawData = {} } ) {
    var usMap = Highcharts.geojson(GEO_SHAPES[geoType]),
        lines = Highcharts.geojson(GEO_SHAPES[geoType], "mapline")[0];

    Highcharts.each(usMap, function(mapPoint) {
      if (rawData[mapPoint.properties.id]) {
        mapPoint.name = rawData[mapPoint.properties.id].name;
      }
    });

    mapOptions.title = title || mapOptions.title;
    mapOptions.description = description || mapOptions.description;
    mapOptions.series[0].mapData = usMap;
    mapOptions.series[0].data = data;
    this.chart.update(mapOptions);
  }

}

module.exports = GeoMap;
