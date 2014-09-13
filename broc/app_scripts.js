var uglifyJavaScript  = require('broccoli-uglify-js');
var compileES6        = require('broccoli-es6-concatenator');

var env               = process.env.BROCCOLI_ENV || 'development';

var appJs = {
  appAndVendorTree: function() {
    return require('./app_trees').appAndVendor.tree();  
  },

  default: function() {    
    return compileES6(this.appAndVendorTree(), this.config.ES6);
  },

  production: function() {
    if (env !== 'production') return false;    
    return uglifyJavaScript(this.default(), this.config.uglify);    
  },

  compiled: function() {
    return this.production() || this.default();
  }
};

appJs.config = require('./config').appJs;

module.exports = appJs;

