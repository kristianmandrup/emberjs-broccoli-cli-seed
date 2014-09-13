var env    = process.env.BROCCOLI_ENV || 'development';

var append = require('./config').append;

if (env === 'test') {
  var trees = require('./app_trees');
  trees.appAndVendor.tree().unshift(trees.testsTree());
  append.appFiles = append.appFiles.concat(append.testFiles);
}

module.exports = append;