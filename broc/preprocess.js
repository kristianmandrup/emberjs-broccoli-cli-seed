var filterTemplates     = require('broccoli-template');
var filterCoffeeScript  = require('broccoli-coffee');
var filterLess          = require('broccoli-less');

var env = process.env.BROCCOLI_ENV || 'development';

function preprocess(tree) {
  var templates = function() {
    return filterTemplates(tree, {
      extensions: ['hbs', 'handlebars'],
      compileFunction: 'Ember.Handlebars.compile'
    });
  };

  var coffee = function() {
    return filterCoffeeScript(tree, {
      bare: true
    });
  };

  var less = function(tree) {
    return filterLess(tree, {
      compress: env === 'production',
      paths: ['.', './stylesheets', './vendor/bootstrap/less']
    });
  };

  return less(coffee(templates(tree)));
}

module.exports = preprocess