var publicTree = 'public';
var appJs = require('./app_scripts');

module.exports = {
  appJs: appJs.compiled(),
  publicTree: publicTree
};