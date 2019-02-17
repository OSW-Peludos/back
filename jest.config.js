const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '.'),
  moduleFileExtensions: ['js', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
  },
  testPathIgnorePatterns: ['<rootDir>/test/e2e'],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.mock.js',
    '!src/**/index.js',
    '!src/router.js',
    '!src/**/router.js',
    '!**/node_modules/**',
  ],
};
