// Karma configuration
// Generated on Tue Mar 28 2017 11:31:46 GMT+0100 (WAT)

module.exports = (config) => {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    plugin: [
      'karma-coverage',
      'karma-coveralls'
    ],


    // list of files / patterns to load in the browser
    files: [
      './app/class/invertedIndex.js',
      './jasmine-standalone-2.5.2/build/bundle.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './app/class/invertedIndex.js': ['coverage'],
      './app/controllers/controller.js': ['coverage']

    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'coveralls'],

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};