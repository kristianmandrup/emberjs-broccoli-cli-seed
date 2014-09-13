var env    = process.env.BROCCOLI_ENV || 'development';

var append = {
  appFiles: [
    'jquery.js',
    'handlebars.js',
    'ember.js',
    'ember-data.js',
    'ember-resolver.js',
    'bootstrap.js',
    'config/environment.js',
    'config/environments/' + env + '.js'
  ],
  testFiles: [
    'qunit/qunit/qunit.js',
    'ember-qunit/dist/globals/main.js',
    'jquery-mockjax/jquery.mockjax.js',
    'tests/test_helper.js'
  ]
};

var trees = require('./app_trees')

if (env === 'test') {
  trees.appAndVendor.tree().unshift(trees.testsTree);
  inputFiles.unshift('tests/*/*.js');
  append.appFiles = append.appFiles.concat(append.testFiles);
}

module.exports = append;
