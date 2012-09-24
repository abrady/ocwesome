var log = require('winston');

var async = require('../common/async');

exports.renderIndex = function(req, res) {
  res.render('classes/index');
}

exports.renderClass = function(req, res){
  var class_name = req.param.name;
  console.log('getting class'+class_name);
  res.render('index', { title: class_name })
};