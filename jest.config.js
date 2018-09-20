module.exports = {
  verbose: false,
  transform: {
    '^.+\\.js?$': 'babel-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/js/**/*.js'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/'
  ],
  coverageDirectory: '<rootDir>/test/unit_test_coverage',
  testURL: 'http://localhost'
};
