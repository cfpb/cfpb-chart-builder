/* ==========================================================================
   Settings for project environment.
   ========================================================================== */


/**
 * Environment variable mappings in JavaScript from global environment vars.
 */
const envvars = {

  /* eslint-disable no-process-env */
  NODE_ENV: process.env.NODE_ENV,
  SAUCE_LABS_USERNAME: process.env.SAUCE_LABS_USERNAME,
  SAUCE_LABS_ACCESS_KEY: process.env.SAUCE_LABS_ACCESS_KEY,
  TRAVIS_PULL_REQUEST: process.env.TRAVIS_PULL_REQUEST,
  TRAVIS_PULL_REQUEST_BRANCH: process.env.TRAVIS_PULL_REQUEST_BRANCH,
  TRAVIS_JOB_NUMBER: process.env.TRAVIS_JOB_NUMBER,
  /* eslint-enable no-process-env */
};

module.exports = {
  envvars
};
