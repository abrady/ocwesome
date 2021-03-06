
/**
 * Module dependencies.
 */

var env = require('./env');
var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();
// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  // express.cookieParser(),
  app.use(express.session({ secret: 'some sort of secret' }));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

var classes = require('./routes/classes');
app.get('/classes', classes.renderIndex);
app.get('/classes/:name', classes.renderClass);
app.get('async/facebook/onClientLogin', routes.facebook.onClientLogin);

app.listen(env.PORT);
console.log("Express server " + app.settings.env + " port " + env.PORT);
