/* TODO: Use import instead. This is currently stopped by the test suite.
   See https://[GHE]/CFGOV/platform/issues/2925 */
const axisDefault = require( './axisDefault' );
const getFirstNumber = require( '../../utils/calculation' ).getFirstNumber;
/**
 * Object of highchart y-axis options.
 * See https://api.highcharts.com/highcharts/yAxis
 * @param {string} customLabel - Custom label for the y-axis.
 * @param {Object} data - Data for y-axis rows.
 * @returns {Object} Options object.
 */
function yAxisOptions( customLabel, data ) {
  const opts = axisDefault.yAxisOptions( customLabel );
  opts.title.text = _yAxisTitleText( customLabel, data );
  opts.labels = {};
  opts.labels.formatter = function() {
    return _yAxisLabelsFormatter( this.value );
  };
  return opts;
}

/**
 * Get the text of the y-axis title.
 *
 * @param  {sting} yAxisLabel  A string to use for the y-axis label.
 * @param  {array} chartData  An array of values to check.
 * @returns {string} Appropriate y-axis title.
 */
function _yAxisTitleText( yAxisLabel, chartData ) {
  // Return if the label is customized.
  if ( yAxisLabel ) return yAxisLabel;

  if ( !chartData ) return 'Values';

  let term = 'Number';
  let unit = 'millions';
  const firstChartNumber = getFirstNumber( chartData );

  if ( !firstChartNumber ) {
    return firstChartNumber;
  }

  if ( firstChartNumber % 1000000000 < firstChartNumber ) {
    term = 'Volume';
    unit = 'billions';
  }

  return `${ term } of originations (in ${ unit })`;
}

/**
 * Convert the data point's unit to M or B.
 *
 * @param  {int} value  Data point's value
 * @returns {int} Data point's value over million or billion.
 */
function _yAxisLabelsFormatter( value ) {
  // If it's 0 or borked data gets passed in, return it.
  if ( !value ) {
    return value;
  }
  if ( value % 1000000000 < value ) {
    return `${ value / 1000000000 }B`;
  }
  return `${ value / 1000000 }M`;
}

module.exports = {
  yAxisOptions
};
