const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const pg = require('pg');

const connection = "postgres://testuser:password1@localhost:5432/testdb";
const client = new pg.Client(connection);
client.connect();

const app = express();


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/insert-data', function(req,res){
    var FIRSTNAME = req.body.firstname;
    var SURNAME = req.body.surname;
    var AGE = req.body.age;
    var DOB = req.body.dob;
    var PHONE = req.body.phone;
    var EMAIL = req.body.email;

    client.query('INSERT INTO account(firstname,surname, age, dob, phone, email)  VALUES ($1, $2, $3, $4, $5, $6)', [FIRSTNAME,SURNAME,AGE,DOB,PHONE,EMAIL], (error, results) => {
        if (error) {
            res.send('Wrong');
        }
        res.send('uploaded');
        res.redirect('/index.html');

    });



});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});