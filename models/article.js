// Helper for date formatting
var dateFormatter = require('../helpers/dateFormatter.js');

// MySQL connection
var connection = require('../connection');

function Article() {

  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM article', function(err, result) {
        con.release();
        res.send(JSON.stringify(result, null, 3));
      });
    });
  };

  this.getOne = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM article WHERE id = ?', [id], function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.create = function(article, res) {
    
    var article = article;
    var currentDate = new Date();
    var currentDate = dateFormatter(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear());

    data = {
        title : article.title,
        body : article.body,
        author : article.author,
        date : currentDate,
    };

    connection.acquire(function(err, con) {
      con.query('INSERT INTO article SET ?', data, function(err, result) {
        con.release();
        if (err) {
          res.send({status:1, message:'article creation failed'});
        } else {
          res.send({status:0, message:'article creation successful'});
        }
      });
    });
  };

  this.update = function(id, article, res) {
    
   /* data = {
        title : article.title,
        body : article.body,
        author : article.author,
    }*/

    connection.acquire(function(err, con){
      con.query('UPDATE article SET ? where id = ?', [article, id], function(err, result) {
        con.release();
        if(err) {
          res.send({status:1, message:'article update failed.'});
        } else {
          res.send({status:0, message:'article updated successfully'});
        }
      });
    });
  };

  this.delete = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('DELETE FROM article WHERE id = ?', [id], function(err, result) {
        con.release();
        if(err) {
          res.send({status:1, message: 'Failed to delete'});
        } else {
          res.send({status:0, message: 'Deleted successfully'});
        }
      });
    });
  };

}

module.exports = new Article();
