exports.nts = function(val) {
  if (typeof val === 'undefined') {
    return '';
  }
  else {
    return val;
  }
};
exports.randomString = function randomString(len, charSet) {
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var randomString = '';
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
};

routerRoute = function (model, route, errorText){
  return function(req, res){
     errorText = typeof errorText !== 'undefined' ? errorText : 'server error';
     model[route](function(err, data){
      if(err){
          res.writeHead(500);
          res.send({'err': errorText});
      } else {
          res.send(data);
      }
    });
  }
}

exports.routing = function(routesArray, model, errorText){
  result = {};
  routesArray.forEach(function(currentRoute){
    result[currentRoute] =routerRoute(model, currentRoute);
  });
  return result;
}
