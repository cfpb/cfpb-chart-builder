/* ==========================================================================
   Settings for project environment.
   Used by JavaScript gulp build process and JavaScript test configuration.
   ========================================================================== */


/**
 * Environment variable mappings in JavaScript from the project root .env file.
 */
const envvars = {

  /* eslint-disable no-process-env */
  SAUCE_LABS_USERNAME: process.env.SAUCE_LABS_USERNAME,
  SAUCE_LABS_ACCESS_KEY: process.env.SAUCE_LABS_ACCESS_KEY,
  TRAVIS_PULL_REQUEST: process.env.TRAVIS_PULL_REQUEST,
  TRAVIS_PULL_REQUEST_BRANCH: process.env.TRAVIS_PULL_REQUEST_BRANCH,
  TRAVIS_JOB_NUMBER: process.env.TRAVIS_JOB_NUMBER,
  CI_ENVIRONMENT: process.env.CI_ENVIRONMENT
  /* eslint-enable no-process-env */
};

module.exports = {
  envvars
};
