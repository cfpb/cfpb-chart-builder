// Console polyfill for IE
if ( !(window.console && console.log) ) {
  console = {
    log: function(){},
    debug: function(){},
    info: function(){},
    warn: function(){},
    error: function(){}
  };
}

// Catch all errors and report them to Sauce Labs.
var errors = [];
window.onerror = function(message, url, lineNumber) {
  errors.push({
    "name": "Smoke test",
    "result": false,
    "message": "Error: " + message + " on line " + lineNumber + ".",
    "duration": 5000
  });
  return true;
};

// Report everything to Sauce after five seconds. Super hacky.
setTimeout(function () {
  window.global_test_results = {
    passed: errors.length > 0 ? 0 : 1,
    failed: errors.length,
    total: errors.length || 1,
    duration: 10000,
    tests: errors
  };
  console.log(window.global_test_results);
  console.log("Tests " + (errors.length > 0 ? "failed!" : "passed!") );
}, 10000);

// Create a chart for every item in the sample data array.
charts = charts.forEach(function(chart) {
  var div = document.createElement('div');
  var contents =
    "<h3>" + chart.source + "</h3>" +
    "<div class='cfpb-chart'" +
      "data-chart-type='" + chart.chartType + "'" +
      "data-chart-title='" + chart.title + "'" +
      "data-chart-description='This is the chart description'" +
      "data-chart-group='" + chart.group + "'" +
      "data-chart-source='" + chart.source + "'" +
      "This is the chart description." +
    "</div>" +
    "<hr />";
  div.innerHTML = contents;
  document.body.appendChild(div);
});
