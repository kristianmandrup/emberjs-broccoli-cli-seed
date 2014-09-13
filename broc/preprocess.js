var Filter = require('./filters');

var next = function(name, res) {  
  var fobj = Filter[name];
  if (typeof fobj == 'undefined') {
    console.log('WARNING: undefined filter: ' + name + ' skipped!!')
    return res;
  }    
  return fobj.run(res);
};

var PreProcess = {
  filters: require('./config').preprocess.filters,
  
  run: function(tree, filters) {
    var useFilters = (filters || this.filters).slice(0);

    var use = function(res, _filters) {
      if (_filters.length == 0) {
        return res;
      } else {
        var nextName = _filters.pop();
        return use(next(nextName, res), _filters);        
      }
    };

    var firstRes = next(useFilters.pop(), tree);
    return use(firstRes, useFilters);
  }
}

module.exports = PreProcess