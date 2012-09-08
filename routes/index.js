
/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log('index.index');
  res.render('index', { title: 'Express' })
};

exports.facebook = require('./facebook')