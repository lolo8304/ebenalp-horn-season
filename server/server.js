var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

function isFunctionA(functionToCheck) {
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

app.use("/api-debug/customers/webhookRoximity", function(req, res, next) {
var pars = req["headers"]
var output = '';
for (var property in pars) {
if (isFunctionA(pars[property])) {
//output += property + ': ' + pars[property]+';\n-----------------------------------------\n ';
} else {
  output += property + ': ' + pars[property]+';\n ';
}
}
   console.log('hello world from "catch-all" route '+output);
   next();
});
