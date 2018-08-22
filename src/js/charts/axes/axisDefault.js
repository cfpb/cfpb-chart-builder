/**
 * Object of highchart y-axis options.
 * See https://api.highcharts.com/highcharts/yAxis
 * @param {string} customLabel - Custom label for the y-axis.
 * @returns {Object} options object.
 */
function yAxisOptions( customLabel ) {
  const opts = {
    showLastLabel: true,
    opposite: false,
    className: 'axis-label',
    title: {
      offset: 0,
      reserveSpace: false
    }
  };

  if ( customLabel ) {
    opts.title.text = customLabel;
  }

  return opts;
}

module.exports = {
  yAxisOptions
};
