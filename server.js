var express = require('express');
var app = express();
var jade = require('jade');
var details = require('./details/details.js');
//app.engine('jade', jade.__express); // TODO - think about this
var log = require('winston');

var jade_render = function(jade_file, locals) {
  var options = {
    env: locals,
//    filename : "details/details.js",
    debug : true, //  Outputs tokens and function body generated
// compiler Compiler to replace jade's default
    compileDebug : process.env.debug, // When false no debug instrumentation is compiled
    pretty : true // Add pretty-indentation whitespace to output (false by default)
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

app.get('/', function(req, res){
  // recompiling for iteration reasons, should be outside
  var locals = {name: 'aaron'};
  log.info('/root');
  jade_render()
});

app.get('login', functin(req, res) {
  
})
app.get('/:course/:part', function(req, res) {
    var course = req.params.course;
    var part = req.params.part;
    log.info('/'+course+'/'+part)
    details.render(course, part, res);
});

log.info('starting on ' + process.env.PORT);
app.listen(process.env.PORT);