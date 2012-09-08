var express = require('express');
var fs = require('fs');
var jade = require('jade');
var log = require('winston');

var app = express();
//app.engine('jade', jade.__express); // TODO - think about this

var jade_render = function(jade_file, locals, res) {
  var options = {
//    filename : "details/details.js",
//    debug : true, //  Outputs tokens and function body generated
// compiler Compiler to replace jade's default
    compileDebug : process.env.debug, // When false no debug instrumentation is compiled
//    pretty : true // Add pretty-indentation whitespace to output (false by default)
    env: locals
  };
  try {
    jade.renderFile(jade_file, options, function(err, str) {
      if(err) {
        log.error('failed to render details.jade:'+err);
        res.send("error occurred.");
      } else {
        res.send(str);   
      }
    });
  } catch(e) {
    log.error('got exception: '+e.message);
    res.send('error'+e);
  }
}

app.get('/', function(req, res) {
  // recompiling for iteration reasons, should be outside
  var env = {name: 'aaron'};
  log.info('/root');
  jade_render('server/index.jade', env, res);
});

app.get('/login', function(req, res) {
  
});

app.get('/client/js/:file', function(req, res) {
  var path = 'client/js/'+req.params.file;
  log.info('sending js:'+path);
  var src = fs.readFileSync(path, 'utf8');
  if (src) {
    res.send(src);
  } else {
    log.info('bad req for path '+path);
    res.send('');
  }
});

app.get('/:course/:part', function(req, res) {
  var details = require('./details/details.js');
  var course = req.params.course;
  var part = req.params.part;
  log.info('/'+course+'/'+part)
  details.render(course, part, res);
});

log.info('starting on ' + process.env.PORT);
app.listen(process.env.PORT);