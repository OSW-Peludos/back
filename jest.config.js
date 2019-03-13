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
    '**/*.js',
    '!app.js',
    '!**/*.mock.js',
    '!**/index.js',
    '!**/routes/**',
    '!**/coverage/**',
    '!**/models/**',
    '!**/router.js',
    '!**/node_modules/**',
    '!**/*.config.*',
  ],
};
