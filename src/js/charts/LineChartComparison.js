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

  constructor( { el, description, data } ) {

    this.chartOptions = {
      chart: {
        marginRight: 0,
        marginTop: 100,
        zoomType: 'none',
        animation: false
      },
      className: 'cfpb-chart_line-comparison',
      description: description,
      credits: false,
      rangeSelector: {
        enabled: false
      },
      legend: {
        align: 'left',
        enabled: true,
        floating: false,
        layout: 'horizontal',
        verticalAlign: 'top',
        useHTML: true,
        x: 0,
        y: 0
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
      series: this.constructor.getSeries( data )
    };

    this.chart = Highcharts.stockChart( el, Object.assign({}, this.chartOptions) );

  }

  static getSeries( data ) {
    data = process.delinquencies( data );
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

  update( newOpts ) {

    let newSeries;

    // Merge the old chart options with the new ones.
    Object.assign( this.chartOptions, newOpts );

    this.chart.update( this.chartOptions );

    // If there's new data involved, delete all series and recreate them.
    if ( newOpts.data ) {
      // Remove all series
      while( this.chart.series && this.chart.series.length > 0 ) {
        this.chart.series[0].remove( true );
      }
      newSeries = this.constructor.getSeries( newOpts.data );
      newSeries.forEach( series => {
        this.chart.addSeries( series );
      } );
    }
    this.chart.hideLoading();
  }

}

module.exports = LineChartComparison;
