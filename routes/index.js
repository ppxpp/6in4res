
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

exports.account = function (req, res) {
  var name = req.params.name;
  res.render('partials/account/' + name);
};

exports.login = function(req, res){
  res.render('login');
};