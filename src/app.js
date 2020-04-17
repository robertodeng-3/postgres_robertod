// load in modules
const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const pg = require('pg');  

 // initialise database and open connection
const connection = "postgres://testuser:password1@localhost:5432/testdb";
const client = new pg.Client(connection);
client.connect();
//initialise express
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//serve up static html page index.html
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});
//load values from index.html and create insert statement and send to db accounts
app.post('/insert-data', function(req,res){
    var FIRSTNAME = req.body.firstname;
    var SURNAME = req.body.surname;
    var AGE = req.body.age;
    var DOB = req.body.dob;
    var PHONE = req.body.phone;
    var EMAIL = req.body.email;

    client.query('INSERT INTO account(firstname,surname, age, dob, phone, email)  VALUES ($1, $2, $3, $4, $5, $6)', 
    [FIRSTNAME,SURNAME,AGE,DOB,PHONE,EMAIL], (error, results) => {
        if (error) {
            res.send('Wrong');
        }else{
            res.send('uploaded');
        }        
    });
});
//delete last row postgresql
app.post('/delete-data', function(req,res){    
    client.query('DELETE FROM account WHERE id in( SELECT id FROM account ORDER BY id desc LIMIT 1)', (error, results) => {
        if (error) {
            res.send(error);
        }else{
           res.send('Delete last row');
        }        
    });

});
//display last row postgresql
app.post('/show-data', function(req,res){
    client.query('SELECT FROM account WHERE id in( SELECT id FROM account ORDER BY id desc LIMIT 1)', (error, results) => {
        if (error) {
            res.send(error);
        }else{
           
        }        
    });
    

});
// last row postgresql
app.post('/update-data', function(req,res){
    res.send('Upload last row');

});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});