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

function isCI(name, url) {
    var regex = new RegExp("[?&]ci_environment(=([^&#]*)|&|#|$)"),
        results = regex.exec(window.location.href);
    if (!results) return false;
    if (!results[2]) return false;
    return true
}

// Catch all errors and report them to Sauce Labs.
function getSaucy() {
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
}

if (isCI()) getSaucy();
