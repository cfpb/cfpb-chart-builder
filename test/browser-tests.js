var path = require('path');
var sauceConnectLauncher = require('sauce-connect-launcher');
var StaticServer = require('static-server');
var request = require('request');

var SAUCE_LABS_USERNAME = process.env.SAUCE_LABS_USERNAME,
    SAUCE_LABS_ACCESS_KEY = process.env.SAUCE_LABS_ACCESS_KEY,
    STATIC_SERVER_PORT = 8089;

if (!SAUCE_LABS_USERNAME || !STATIC_SERVER_PORT) {
  console.error("Please define SAUCE_LABS_USERNAME and SAUCE_LABS_ACCESS_KEY environment variables.");
  console.error("Ask your teammates for the proper credentials.");
  process.exit(1);
}

var server = new StaticServer({
  rootPath: path.join( __dirname, '../'),
  port: STATIC_SERVER_PORT
});

var sauceTests = [];

sauceConnectLauncher({
  username: SAUCE_LABS_USERNAME,
  accessKey: SAUCE_LABS_ACCESS_KEY
}, startServer);

function startServer() {
  server.start(startSauce);
}

function startSauce(err, process) {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Local server listening to', STATIC_SERVER_PORT);
  console.log("Sauce Connect ready.");
  var opts = {
    url: `https://${SAUCE_LABS_USERNAME}:${SAUCE_LABS_ACCESS_KEY}@saucelabs.com/rest/v1/cct-sauce/js-tests`,
    method: "POST",
    json: {
        "platforms": [
            ["Windows 7", "internet explorer", "8"],
            ["Windows 7", "internet explorer", "9"],
            ["Windows 7", "internet explorer", "10"],
            ["Windows 7", "firefox", "27"],
            ["Windows 7", "chrome", ""]
        ],
        "url": "http://localhost:" + STATIC_SERVER_PORT + "/test",
        "framework": "custom"
    }
  };
  request.post(opts, function(err, httpResponse, body) {
    console.log("Tests started.");
    sauceTests = body['js tests'];
    checkSauce();
  });
}

function checkSauce() {
  var opts = {
    url: `https://${SAUCE_LABS_USERNAME}:${SAUCE_LABS_ACCESS_KEY}@saucelabs.com/rest/v1/cct-sauce/js-tests/status`,
    method: "POST",
    json: {
        "js tests": sauceTests
    }
  };
  setTimeout(function() {
    request.post(opts, function(err, httpResponse, body) {
      var failures = 0;
      if (body.completed) {
        console.log("Tests done.");
        body["js tests"].forEach((test) => {
          var errors;
          if (test.result.failed > 0) {
            errors = test.result.tests.map((result) => {
              return result.message;
            });
            failures++;
            return console.log(test.platform.join(" ") + " failed: " + errors.join(" "));
          }
          console.log(test.platform.join(" ") + " passed.");
        });
        if (failures > 0) {
          process.exit(1);
        }
        process.exit(0);
      } else {
        console.log("Tests still running... See status at https://saucelabs.com/u/" + SAUCE_LABS_USERNAME);
        checkSauce();
      }
    });
  }, 5000);
}
