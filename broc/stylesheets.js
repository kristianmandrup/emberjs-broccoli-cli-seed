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

var picked = function() {
  return pickFiles(Stylesheets.config.cssTree, {
    srcDir: '/',
    files: ['app.less'],
    destDir: 'assets'
  });
}

var merged = function(appCss) {
  return mergeTrees([appCss].concat(bowerTrees), {overwrite: true});    
}

var preprocessed = function(appCss) {
  return PreProcess.run(appCss);
}

var asOneFile = function(appCss) {
  return concatFiles(appCss, {
    inputFiles: Stylesheets.config.cssFiles,
    outputFile: '/assets/app.css'
  });    
}

var Stylesheets = {
  config: {
    cssTree: 'stylesheets',
    cssFiles: [
      'qunit.css',
      'assets/app.css'
    ]
  },

  appCss: function() {
    if (env !== 'test') {
      this.config.cssFiles.shift();
    }
    return asOneFile(preprocessed(merged(picked())));
  }
};

module.exports = {
  config:  Stylesheets.config,
  appCss:  Stylesheets.appCss()
};