var filterTemplates     = require('broccoli-template');
var filterCoffeeScript  = require('broccoli-coffee');
var filterLess          = require('broccoli-less');

var env = process.env.BROCCOLI_ENV || 'development';

function preprocess(tree) {
  tree = filterTemplates(tree, {
    extensions: ['hbs', 'handlebars'],
    compileFunction: 'Ember.Handlebars.compile'
  });
  tree = filterCoffeeScript(tree, {
    bare: true
  });
  tree = filterLess(tree, {
    compress: env === 'production',
    paths: ['.', './stylesheets', './vendor/bootstrap/less']
  });
  return tree;
}

module.exports = preprocess