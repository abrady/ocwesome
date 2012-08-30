use strict;
var jade = require('jade');
var log = require('winston');
exports.render = function(course, part, res) {
  var locals = {
    course: course,
    part: part
  };
  var options = {
    locals: locals,
//    filename : "details/details.js",
//    debug : true, //  Outputs tokens and function body generated
// compiler Compiler to replace jade's default
//    compileDebug : process.env.debug, // When false no debug instrumentation is compiled
    pretty : true // Add pretty-indentation whitespace to output (false by default)
};
  var jade_file = 'details/details.jade';
  jade.renderFile(jade_file, options, function(err, str) {
    if(err) {
      log.error('failed to render details.jade:'+err);
    } else {
      res.send(str);   
    }
  });
}
