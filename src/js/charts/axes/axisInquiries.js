/* TODO: Use import instead. This is currently stopped by the test suite.
   See https://[GHE]/CFGOV/platform/issues/2925 */
const axisDefault = require( './axisDefault' );

/**
 * Object of highchart y-axis options.
 * See https://api.highcharts.com/highcharts/yAxis
 * @param {string} customLabel - Custom label for the y-axis.
 * @returns {Object} Options object.
 */
function yAxisOptions( customLabel ) {
  const opts = axisDefault.yAxisOptions( customLabel );
  opts.title.text = _yAxisTitleText( customLabel );

  return opts;
}

/**
 * Get the text of the y-axis title.
 * See https://api.highcharts.com/highcharts/yAxis.title.text
 *
 * @param {sting} yAxisLabel - A string to use for the y-axis label.
 * @returns {string} Appropriate y-axis title.
 */
function _yAxisTitleText( yAxisLabel ) {
  // Return if the label is customized.
  if ( yAxisLabel ) return yAxisLabel;

  // Set a default.
  return 'Index (January 2009 = 100)';
}

module.exports = {
  yAxisOptions
};
