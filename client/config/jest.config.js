var path = require('path');
var paths = require('./paths');

module.exports = {
  rootDir: path.resolve(path.join(paths.appSrc, '..')),
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFiles: [
    './config/testSetup.js'
  ],
  transform: {
    '^.+\\.js$': './config/jestPreprocess.js'
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/config/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/config/styleMock.js'
  },
  transformIgnorePatterns: [
    'node_modules(\/|\\)(?!(bpk-))'
  ]
};