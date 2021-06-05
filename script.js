// Initializtion
var express = require('express')
var app = express()
var expbs = require('express-handlebars')

app.set('view engine', 'handlebars')
app.engine('handlebars', expbs({defaultLayout: false}))


app.set('port', 7928)


// Database information
var mysql = require('mysql')
var pool = mysql.createPool({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'workout'
})


// Generate Table
pool.query("DROP TABLE IF EXISTS workouts", function() {
    let createString = "CREATE TABLE workouts(" +
        "id INT PRIMARY KEY AUTO_INCREMENT," +
        "name VARCHAR(255) NOT NULL," +
        "reps INT," +
        "weight INT," +
        "date DATE)";
        "lbs BOOLEAN," +
    pool.query(createString, function(error) {
        if (error) {
            console.log(error);
        }
        console.log("Workouts Table Created");
    });
});


// Reset Table
app.get('/reset-table',function(req,res,next){
    var context = {};
    pool.query("DROP TABLE IF EXISTS workouts", function(err){ 
      var createString = "CREATE TABLE workouts("+
      "id INT PRIMARY KEY AUTO_INCREMENT,"+
      "name VARCHAR(255) NOT NULL,"+
      "reps INT,"+
      "weight INT,"+
      "date DATE,"+
      "lbs BOOLEAN)";
      pool.query(createString, function(err){
        context.results = "Table reset";
        res.render('table',context);
      })
    });
  });

// Insert entry
app.get('/insert',function(req,res,next){
    var context = {};
    mysql.pool.query("INSERT INTO todo (`name`) VALUES (?)", [req.query.c], function(err, result){
      if(err){
        next(err);
        return;
      }
      context.results = "Inserted id " + result.insertId;
      res.render('home',context);
    });
  });


// Remove entry



// Event listeners for buttons
document.getElementById('editbutton').addEventListener('click', )
document.getElementById('deletebutton').addEventListener('click', )
document.getElementById('submitbutton').addEventListener('click', )


app.get('*', function(req, res){
    res.send('<h1>404 Page not Found')
})

app.post('*', function(req, res){
    res.send('<h1>404 Page not Found')
})

app.listen(app.get('port'), function (){
    console.log('Express started on ' + app.get('port') + '; press Ctrl-C to terminate.')
})
