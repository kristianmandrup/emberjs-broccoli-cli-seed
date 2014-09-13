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

var Stylesheets = {
  config: {
    cssTree: 'stylesheets',
    cssFiles: [
      'qunit.css',
      'assets/app.css'
    ]
  },

  picked: function() {
    return pickFiles(this.config.cssTree, {
      srcDir: '/',
      files: ['app.less'],
      destDir: 'assets'
    });
  },
  merged: function(appCss) {
    return mergeTrees([appCss].concat(bowerTrees), {overwrite: true});    
  },
  preprocessed: function(appCss) {
    return PreProcess.run(appCss);
  },
  asOneFile: function(appCss) {
    return concatFiles(appCss, {
      inputFiles: this.config.cssFiles,
      outputFile: '/assets/app.css'
    });    
  },

  appCss: function() {
    if (env !== 'test') {
      this.config.cssFiles.shift();
    }
    return this.asOneFile(this.preprocessed(this.merged(this.picked())));
  }
};

module.exports = {
  config:  Stylesheets.config,
  appCss:  Stylesheets.appCss()
};