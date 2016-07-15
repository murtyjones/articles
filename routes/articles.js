// Helper for date formatting
var dateFormatter = require('../helpers/dateFormatter.js')

exports.list = function(req, res) {

  req.getConnection(function(err, connection){
      var query = connection.query("SELECT * FROM article ORDER by id DESC", function(err, rows)
      {
          if(err)
              console.log("Error Selecting: %s ", err);

          res.render('articles',{page_tile:"Articles",data:rows})'
      });
  });
};

exports.single = function(req, res) {
  
  var id = req.params.id;
  
  req.getConnection(function(err, connection){
      var query = connection.query("SELECT * FROM article WHERE id = ? ",[id], function(err, rows)
      {
          if(err)
              console.log("Error Selecting: %s ", err);

          res.render('articles',{page_tile:"Article",data:row})'
      });

  });

};

exports.add = function(req, res) {

  var input = req.body;
  var currentDate = new Date();
  var currentDate = dateFormatter(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear());


  req.getConnection(function(err, connection){

        var data = {
            title  : input.title,
            body   : input.body,
            author : input.author,
            date   : currentDate,
        };

        var query = connection.query("INSERT INTO article set ? ", data, function(err, rows)
        {

            if(err)
                console.log("Error inserting : %s ", err );

            res.redirect('/articles');

        });

  });

};

exports.edit = function(req, res) {

  var input = req.body;
  var id = req.params.id;

  req.getConnection(function(err, connection){
      var data = {
          title  : input.title,
          body   : input.body,
          author : input.author,
      };
      connection.query()
      {
          if(err)
              console.log("Error Updating : %s ", err);
          res.redirect('/articles');
      });

  });

};

exports.delete = function(req, res) {

  req.getConnection(function(err, connection){
      
    connection.query("DELETE FROM article where id = ? ", [id], function(err, rows)
    {
        if(err)
            console.log("Error deleting: %s ", err);
        res.redirect('/articles');
    }); 
    
  });

};

