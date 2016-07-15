var article = require('./models/article');

module.exports = {
  configure: function(app) {
    app.get('/article/', function(req, res) {
      article.get(res);
    });

    app.get('/article/:id/', function(req, res) {
      article.getOne(req.params.id, res);
    });

    app.post('/article/', function(req, res) {
      article.create(req.body, res);
    });

    app.put('/article/:id', function(req, res) {
      article.update(req.params.id, req.body, res);
    });

    app.delete('/article/:id/', function(req, res) {
      article.delete(req.params.id, res);
    });
  }
};
