// Module requirements
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var articles = require('./routes/articles');
var bodyParser = require('body-parser');
var app = express();
var connection = require('express-myconnection');
var mysql = require('mysql');
var dateFormatter = require('./helpers/dateFormatter.js')

// Set views and engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set local helper(s)
app.locals.dateFormatter = dateFormatter;

// Require database config
config = require('config.js');
db = config.database

// Establish database connection
app.use(
	connection(mysql,{
		host: db.host,
		user: db.user,
		password: db.password,
		port: db.port,
		database: db.database
	}, 'request')
);

// Use body-parser to read form data
app.use(bodyParser.urlencoded({extended: true}))

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

// Methods
app.get('/', routes.index;
app.get('/articles', articles.list); // Get all articles
app.get('/articles/:id', articles.single); // Get single article
app.post('/articles', articles.save); // Create a new article
app.delete('/articles/:id', articles.delete_article); // Delete an article 
app.put('/articles/edit/:id', articles.edit); // Update an article

// Start server
app.set('port', process.env.PORT || 80);
app.listen(app.get('port'), function () {
	console.log('Listening on port ' + app.get('port'));
});
