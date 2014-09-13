var uglifyJavaScript  = require('broccoli-uglify-js');
var compileES6        = require('broccoli-es6-concatenator');

var env               = process.env.BROCCOLI_ENV || 'development';

var appAndVendorTree  = require('./app_trees').appAndVendor.tree();
var append            = require('./append');

var inputFiles        = ['app/**/*.js'];

module.exports = {
  config: {
    ES6: {
      loaderFile: 'loader-js/loader.js',
      ignoredModules: [
        'ember/resolver'
      ],
      inputFiles: inputFiles,
      legacyFilesToAppend: append.appFiles,
      wrapInEval: env !== 'production',
      outputFile: '/assets/app.js'
    },
    uglify: {
      mangle: true,
      compress: true
    }
  },

  default: function() {
    return compileES6(appAndVendorTree, this.config.ES6);
  },

  production: function() {
    if (env !== 'production') return false;    
    return uglifyJavaScript(this.default(), this.config.uglify);    
  },

  compile: function() {
    this.production() || this.default();
  }
}
