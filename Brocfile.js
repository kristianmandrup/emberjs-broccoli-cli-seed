var mergeTrees = require('broccoli-merge-trees');

var Broc = require('./broc');

var appCss      = Broc.stylesheets.appCss;

var appJs       = Broc.application.appJs;
var publicTree  = Broc.application.publicTree;

module.exports = mergeTrees([publicTree, appCss, appJs]);
