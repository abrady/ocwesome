var express = require('express');
var app = express();
var jade = require('jade');

// Compile a function
var options = {
//    self Use a self namespace to hold the locals (false by default)
//locals Local variable object
//    filename : "server/server.js",
    debug : true, //  Outputs tokens and function body generated
// compiler Compiler to replace jade's default
    compileDebug : process.env.debug, // When false no debug instrumentation is compiled
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



app.listen(process.env.PORT);