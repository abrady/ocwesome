
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
    debug : true, //  Outputs tokens and function body generated
// compiler Compiler to replace jade's default
    compileDebug : process.env.debug, // When false no debug instrumentation is compiled
    pretty : true // Add pretty-indentation whitespace to output (false by default)
};
  var jade_file = 'details/details.jade';
  log.info('pre render '+jade_file);
  try {
    jade.renderFile(jade_file, options, function(err, str) {
      log.info('!!!! inside jade.renderFile('+jade_file+')')
      if(err) {
        log.error('failed to render details.jade:'+err);
        res.send(err.message);
      } else {
        res.send(str);   
      }
    });
  } catch(e) {
    log.error('got exception: '+e.message);
  }
}
