var log = require('winston');

var async = require('../common/async');


exports.onClientLogin = function(req, res){
  req.session.user = {}
  req.session.user.id = req.param.uid;
  req.session.user.access_token = req.param.token;
  log.info('setting user to '+req.session.user.id);
  res.render(JSON.stringify(new async.AsyncRes(true)));
};