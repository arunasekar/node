var express = require('express');
var app=express();
var http =require('http');
var path=require('path');
var bodyParser=require('body-parser');


var urlencodedParser=bodyParser({extended:false})
app.use(express.urlencoded());

var mysql=require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'mydb',
    
})

app.post('/old', function(req,res){
    var createNames = {
        id: req.body.id,
        name: req.body.name,
    }
    console.log("Database is connected..");
    connection.query("insert into customers set ?",createNames, function(err, result){

        if(err)throw err;
        console.log(result);
        // res.send(result);
        res.sendFile(__dirname + "/" +"new.html");
        
        
    })    
});
app.get('/home',function(req,res){
  res.sendFile(__dirname + "/" +"new.html");
})

app.get('/listusers', function(req,res){
    connection.query("select * from customers", function(err, result){
        if(err)throw err;
        console.log(result);
        res.send(result);
    })
})
app.get('/del', function (req, res) {
  // First read existing users.
  var sql = "DELETE FROM customers WHERE id =5 ";
  connection.query(sql, function (err, result) {  
  
    if(err)throw err;
    console.log(result);
    res.send(result);
})
})
app.get('/update', function (req, res) {
  // First read existing users.
  var sql = "UPDATE customers SET name = 'MADHUMATHI' WHERE name = 'madhu'";
  connection.query(sql, function (err, result) {
  
  
    if(err)throw err;
    console.log(result);
    res.send(result);
})
})


app.get('/:id', function (req, res) {
  // First read existing users.
  connection.query("select * from customers where id='1'", function(err, result){
    if(err)throw err;
    console.log(result);
    res.send(result);
})
})

var server = app.listen(8081, function(){
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s",host,port)
})