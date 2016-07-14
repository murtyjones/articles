/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Hello There. Not a lot to see here.' });
};
