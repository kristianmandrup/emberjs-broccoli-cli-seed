var preprocess        = require('./preprocess');
var pickFiles         = require('broccoli-static-compiler');
var mergeTrees        = require('broccoli-merge-trees');
var findBowerTrees    = require('broccoli-bower');

config = function(name) {
  return pickFiles(name, {
    srcDir: '/',
    destDir: name
  });    
},  

tree = function(name) {
  return function() {
    return this.resolved = this.resolved || preprocess(this.config(name));  
  }
},


module.exports = {
  appTree: tree('app'),
  configTree: tree('config'),
  testsTree: tree('tests'),  
  vendorTree: 'vendor',
  publicTree: 'public',

  appAndVendor: { 
    baseTrees: [this.appTree, this.configTree, this.vendorTree, this.publicTree],

    allTrees: function() { 
      return this.baseTrees.concat(findBowerTrees()); 
    },
    merged: function() {
      return mergeTrees(this.allTrees(), {overwrite: true});
    },
    tree: function() {
      return this.resolved = this.resolved || this.merged();
    }
  }
};
