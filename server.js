var express = require('express');
var app = express();
var jade = require('jade');
var details = require('./details/details.js');
//app.engine('jade', jade.__express); // TODO - think about this
var log = require('winston');

app.get('/', function(req, res){
  // Compile a function
  var options = {
  //    self Use a self namespace to hold the locals (false by default)
  //locals Local variable object
  //    filename : "server/server.js",
  //    debug : true, //  Outputs tokens and function body generated
  // compiler Compiler to replace jade's default
  //    compileDebug : process.env.debug, // When false no debug instrumentation is compiled
      pretty : true // Add pretty-indentation whitespace to output (false by default)
  };

  // recompiling for iteration reasons, should be outside
  var locals = {name: 'aaron'};
  log.info('/root');
  var fn = jade.compile('string of jade', options);
  log.info('post compile');
  res.send(fn(locals));
});

app.get('/:course/:part', function(req, res) {
    var course = req.params.course;
    var part = req.params.part;
    log.info('/'+course+'/'+part)
    details.render(course, part, res);
});

log.info('starting on ' + process.env.PORT);
app.listen(process.env.PORT);