var express = require('express');
var app = express();
var jade = require('jade');
var details = require('./details/details');
//app.engine('jade', jade.__express); // TODO - think about this
//var log = require('winston');



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

app.get('/', function(req, res){
    var locals = { name : 'aaron'};
    // recompiling for iteration reasons, should be outside
    var jade_fn = jade.compile(
        'p Hello #{name}',
        options);
  
    var response = jade_fn(locals);

    res.send(response);
});

app.get('/:course/:part', function(req, res) {
    var course = req.params.course;
    var part = req.params.part;
    details.render(course, part, res);
});

app.listen(process.env.PORT);