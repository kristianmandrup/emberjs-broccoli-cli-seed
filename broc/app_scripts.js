var uglifyJavaScript  = require('broccoli-uglify-js');
var compileES6        = require('broccoli-es6-concatenator');

var env               = process.env.BROCCOLI_ENV || 'development';

var appJs = {
  config: {    
    ES6: {
      loaderFile: 'loader-js/loader.js',
      ignoredModules: [
        'ember/resolver'
      ],
      inputFiles: ['app/**/*.js'],
      legacyFilesToAppend: require('./append').appFiles,
      wrapInEval: env !== 'production',
      outputFile: '/assets/app.js'
    },
    uglify: {
      mangle: true,
      compress: true
    }
  },

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

module.exports = appJs;

