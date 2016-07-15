var mysql = require('mysql');

// Pull in config
config = require('./config');
db = config.database;

function Connection() {
  this.pool = null;

  this.init = function() {
    this.pool = mysql.createPool({
      connectionLimit : 10,
      host : db.host,
      user : db.user,
      password : db.password,
      port : db.port,
      database : db.database,
    });
  };

  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      callback(err, connection);
    });
  };
};

module.exports = new Connection();
