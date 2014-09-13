var pickFiles       = require('broccoli-static-compiler');
var mergeTrees      = require('broccoli-merge-trees');
var findBowerTrees  = require('broccoli-bower');
var concatFiles     = require('broccoli-concat');

var bowerTrees      = findBowerTrees();
var env             = process.env.BROCCOLI_ENV || 'development';

var PreProcess      = require('./preprocess');
//
// Stylesheets
//
var appCss    = null;
var cssTree   = 'stylesheets';
var cssFiles  = [
  'qunit.css',
  'assets/app.css'
];

appCss = pickFiles(cssTree, {
  srcDir: '/',
  files: ['app.less'],
  destDir: 'assets'
});

if (env !== 'test') {
  cssFiles.shift();
}

appCss = mergeTrees([appCss].concat(bowerTrees), {overwrite: true});
appCss = PreProcess.run(appCss);

appCss = concatFiles(appCss, {
  inputFiles: cssFiles,
  outputFile: '/assets/app.css'
});

module.exports = {
  cssTree:  cssTree,
  cssFiles: cssFiles,
  appCss:   appCss
};