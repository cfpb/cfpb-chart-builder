var path = require('path');
var fs = require('fs');
var sauceConnectLauncher = require('sauce-connect-launcher');
var express = require('express');
var cors = require('cors');
var path = require('path');
var serveStatic = require('serve-static');
var request = require('request');
var config = path.join(__dirname, './config.json');
var child_process = require('child_process');

var app = express();
app.use(cors());
var testName;

if (!fs.existsSync(config) && !process.env.SAUCE_LABS_ACCESS_KEY) {
  console.error("Please define SAUCE_LABS_USERNAME and SAUCE_LABS_ACCESS_KEY in `test/config.json`.");
  console.error("See https://github.com/cfpb/cfpb-chart-builder#testing");
  process.exit(1);
}

if (process.env.SAUCE_LABS_USERNAME && process.env.SAUCE_LABS_ACCESS_KEY) {
  // Travis has Sauce Labs creds in an environment variable
  config = {
     SAUCE_LABS_USERNAME: process.env.SAUCE_LABS_USERNAME,
     SAUCE_LABS_ACCESS_KEY: process.env.SAUCE_LABS_ACCESS_KEY
  }
} else {
  // Read creds from config file
  config = require(config);
}

if (process.env.TRAVIS_PULL_REQUEST !== false && process.env.TRAVIS_PULL_REQUEST_BRANCH && process.env.TRAVIS_JOB_NUMBER) {
  testName = 'Pull request #' + process.env.TRAVIS_PULL_REQUEST + ', branch: ' + process.env.TRAVIS_PULL_REQUEST_BRANCH + ', Travis job #' + process.env.TRAVIS_JOB_NUMBER;
} else {
  testName = child_process.execSync('git rev-parse --abbrev-ref HEAD').toString();
}

var SAUCE_LABS_USERNAME = config.SAUCE_LABS_USERNAME,
    SAUCE_LABS_ACCESS_KEY = config.SAUCE_LABS_ACCESS_KEY,
    CI_ENVIRONMENT = process.env.CI_ENVIRONMENT || '',
    STATIC_SERVER_PORT = 8089;

var sauceTests = [];

sauceConnectLauncher({
  username: SAUCE_LABS_USERNAME,
  accessKey: SAUCE_LABS_ACCESS_KEY
}, startServer);

function startServer() {
  app.use(serveStatic(path.join(__dirname)));
  app.use(serveStatic(path.join(__dirname, '..', 'dist')));
  app.listen(STATIC_SERVER_PORT);
  startSauce();
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
            ["Windows 7", "internet explorer", "9"],
            ["Windows 7", "internet explorer", "10"],
            ["Windows 7", "firefox", "27"],
            ["Windows 7", "chrome", ""],
            ["Linux", "android", ""]
        ],
        "url": "http://localhost:" + STATIC_SERVER_PORT + "/?ci_environment=" + CI_ENVIRONMENT,
        "framework": "custom",
        "name": testName
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
