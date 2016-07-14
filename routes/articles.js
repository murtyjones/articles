// Helper for date formatting
var dateFormatter = require('../helpers/dateFormatter.js')

exports.list = function(req, res){

  req.getConnection(function(err,connection){

    var query = connection.query("SELECT * FROM article ORDER BY id DESC", function(err,rows)
    {
            if(err)
                console.log("Error Selecting: %s ", err);

            res.render('articles',{page_title:"Articles",data:rows});
    });

  });

};

exports.add = function(req, res){
  res.render('add_article',{page_title:"Add Article"});
};

exports.edit = function(req, res){

    var id = req.params.id;

    req.getConnection(function(err,connection){
    
        var query = connection.query("SELECT * FROM article WHERE id = ? ",[id],function(err,rows)
        {
            if(err)
                console.log("Error Selecting: %s ", err);

            res.render('edit_article',{page_title:"Edit Article",data:rows});
        });
    
    });

};

exports.save = function(req,res){

    var input = req.body;
    var currentDate = new Date();
    var currentDate = dateFormatter(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear());

    req.getConnection(function (err, connection){

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

exports.save_edit = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function (err, connection){
    
        var data = {
            title  : input.title,
            body   : input.body,
            author : input.author,
        };
        connection.query("UPDATE article set ? WHERE id = ?",[data,id], function(err, rows)
        {
            if(err)
                console.log("Error Updating : %s ", err );
            res.redirect('/articles');
        });

    });

};

exports.delete_article = function(req,res){
    var id = req.params.id;

    req.getConnection(function (err, connection) {

        connection.query("DELETE FROM article WHERE id = ? ",[id], function(err, rows)
        {
            if (err)
                console.log("Error deleting : %s ", err );
            res.redirect('/articles');
        });

    });

};
