'use strict';

var Highcharts = require( 'highcharts/js/highstock' );
var process = require( '../utils/process-json' );
require( 'highcharts/js/modules/accessibility' )( Highcharts );

Highcharts.setOptions( {
  lang: {
    rangeSelectorZoom: '',
    thousandsSep: ','
  }
} );

/**
 * _getFirstNumber - get the first value that is a Number
 *
 * @param  {array} array  An array of Objects with values to check
 * @returns {string}    an actual Number
 */

function _getFirstNumber( array ) {
  var val;
  for ( var x = 0; x < array.length; x++ ) {
    if ( !isNaN( array[x][1] ) ) {
      val = array[x][1];
      return val;
    }
  }
  return false;
}

/**
 * _getYAxisUnits - Get the text of the y-axis title
 *
 * @param  {array} array  An array of values to check
 * @returns {string}    Appropriate y-axis title
 */
function _getYAxisUnits( array ) {
  var value = _getFirstNumber( array );
  if ( !value ) {
    return value;
  }
  return 'percent';
}

/**
 * _getYAxisLabel - Get the text of the y-axis title
 *
 * @param  {array} array  An array of values to check
 * @returns {string}    Appropriate y-axis title
 */
function _getYAxisLabel( array ) {
  var value = _getFirstNumber( array );
  if ( !value ) {
    return value;
  }
  if ( value % 1000000000 < value ) {
    return 'Volume';
  }
  return 'Number';
}

/**
 * _getTickValue - Convert the data point's unit to M or B.
 *
 * @param  {int} value  Data point's value
 * @returns {int}        Data point's value over million or billion.
 */

function _getTickValue( value ) {
  // If borked data gets passed in, return it.
  if ( isNaN( value ) ) {
    return value;
  }
  return Highcharts.numberFormat( value * 100, 1 ) + '%';
}

class LineChartComparison {

  constructor( { el, description, metadata, data } ) {

    this.chartOptions = {
      chart: {
        marginRight: 0,
        marginTop: 100,
        zoomType: 'none',
        animation: false
      },
      className: 'cfpb-chart_line',
      description: description,
      credits: false,
      rangeSelector: {
        enabled: false
      },
      legend: {
        enabled: true,
        floating: true,
        layout: 'vertical',
        verticalAlign: 'top',
        useHTML: true
      },
      plotOptions: {
        series: {
          states: {
            hover: {
              enabled: false
            }
          },
          events: {
            legendItemClick: () => false
          }
        }
      },
      navigator: {
        enabled: false
      },
      scrollbar: {
        enabled: false
      },
      xAxis: {
        startOnTick: true,
        tickLength: 5,
        type: 'datetime',
        dateTimeLabelFormats: {
          month: '%b<br/>%Y',
          year: '%b<br/>%Y'
        }
      },
      yAxis: {
        min: 0,
        opposite: false,
        className: 'axis-label',
        labels: {
          formatter: function() {
            return _getTickValue( this.value );
          }
        }
      },
      tooltip: {
        useHTML: true,
        formatter: function() {
          var tooltip = Highcharts.dateFormat( '%B %Y', this.x );
          for ( var i = 0; i < this.points.length; i++ ) {
            var point = this.points[i];
            tooltip += "<br><span class='highcharts-color-" + point.series.colorIndex + "'></span> " + point.series.name + ': ' + Highcharts.numberFormat( point.y * 100, 1 ) + '%';
          }
          return tooltip;
        }
      },
      series: this.constructor.getSeries( data, metadata )
    };

    this.chart = Highcharts.stockChart( el, Object.assign({}, this.chartOptions) );

  }

  static getSeries( data, metadata ) {
    data = process.delinquencies( data, metadata );
    data = data.map( datum => ( {
      name: datum.label,
      data: datum.data,
      legendIndex: 1,
      tooltip: {
        valueDecimals: 0
      }
    } ) );
    return data;
  }

  update( newOptions ) {
    // The raw data needs to be converted into a format Highcharts understands
    if ( newOptions.data ) {
      newOptions.series = this.constructor.getSeries( newOptions.data, newOptions.metadata );
    }
    // Merge the old chart options with the new ones
    Object.assign( this.chartOptions, newOptions );
    this.chart.update( this.chartOptions, true, true );
    this.chart.hideLoading();
  }

}

module.exports = LineChartComparison;
