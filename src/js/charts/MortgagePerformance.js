'use strict';

var Highcharts = require( 'highcharts/js/highstock' );
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
  // If it's 0 or borked data gets passed in, return it.
  if ( !value ) {
    return value;
  }
  return value * 100 + '%';
}

function MortgagePerformance( props ) {
  var options = {
    title: {
      text: props.title
    },
    chart: {
      marginRight: 0,
      marginTop: 100,
      zoomType: 'none'
    },
    className: 'cfpb-chart_line',
    description: props.description,
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
        var tooltip = Highcharts.dateFormat('%B %Y', this.x);
        for (var i = 0; i < this.points.length; i++) {
          var point = this.points[i];
          tooltip += "<br><span class='highcharts-color-" + point.series.colorIndex + "'></span> " + point.series.name+": " + Math.round(point.y * 10000) / 10 + '%';
        }
        return tooltip;
      }
    },
    series: props.data.map(datum => {
      return {
        name: datum.label,
        data: datum.data,
        legendIndex: 1,
        tooltip: {
          valueDecimals: 0
        }
      }
    })
  };

  return Highcharts.stockChart( props.el, options );

}

module.exports = MortgagePerformance;
