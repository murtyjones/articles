var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var connection = require('./connection');
var routes = require('./routes');

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

connection.init();
routes.configure(app);
var server = app.listen(3001, function() {
  console.log('Server listening on port ' + server.address().port);
});
