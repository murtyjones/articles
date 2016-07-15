var article = require('./models/article');

module.exports = {
  configure: function(app) {
    app.get('/articles/', function(req, res) {
      article.get(res);
    });

    app.get('/articles/:id', function(req, res) {
      article.getOne(req.params.id, res);
    });

    app.post('/articles/', function(req, res) {
      article.create(req.body, res);
    });

    app.put('/articles/:id/', function(req, res) {
      article.update(req.params.id, req.body, res);
    });

    app.delete('/articles/:id/', function(req, res) {
      article.delete(req.params.id, res);
    });
  }
};
