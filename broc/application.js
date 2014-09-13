//
// Static
//
var publicTree = 'public';

//
// Application
//

var trees = require('./app_trees');
var appJs = require('./app');

module.exports = {
  appJs: appJs,
  publicTree: trees.publicTree
};