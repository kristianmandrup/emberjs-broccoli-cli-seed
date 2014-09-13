var filterFor = function(filter) {  
  var fun = function() {
    switch(typeof(filter)) {
    case 'function':
      return filter;
    case 'string':
      return require('broccoli-' + filter);
    default:
      throw new Error("not a valid filter: " + String(filter));
    }
  };
  var filterFun = fun(filter);

  return function(tree) {
    return filterFun(tree, this.config);
  };
}

var Coffee = {
  config: {
    bare: true
  },
  run: filterFor('coffee')
};

var env = process.env.BROCCOLI_ENV || 'development';

var Less = {
  config: {
    compress: env === 'production',
    paths: ['.', './stylesheets', './vendor/bootstrap/less']
  },
  run: filterFor('less')
};

var Templates = {
  config: {
    extensions: ['hbs', 'handlebars'],
    compileFunction: 'Ember.Handlebars.compile'
  },
  run: filterFor('template')
};

module.exports = {
  coffee: Coffee,
  less: Less,
  templates: Templates
}