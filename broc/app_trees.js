var PreProcess        = require('./preprocess');

var pickFiles         = require('broccoli-static-compiler');
var mergeTrees        = require('broccoli-merge-trees');
var findBowerTrees    = require('broccoli-bower');

config = function(name) {
  return pickFiles(name, {
    srcDir: '/',
    destDir: name
  });    
};  

tree = function(name) {
  return function() {
    return PreProcess.run(config(name));  
  }
};

var trees = {
  appTree: tree('app'),
  configTree: tree('config'),
  testsTree: tree('tests'),  
  vendorTree: 'vendor',
  publicTree: 'public'
}

trees.appAndVendor = { 
  baseTrees: function() {
    return [trees.appTree(), trees.configTree(), trees.vendorTree, trees.publicTree];
  },

  allTrees: function() { 
    return this.baseTrees().concat(findBowerTrees()); 
  },
  mergedTrees: function() {
    return mergeTrees(this.allTrees(), {overwrite: true});
  },
  tree: function() {
    return this.resolved = this.resolved || this.mergedTrees();
  }
};

module.exports = trees;
