var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('./mongoose');
var Tempature = require('./models/temperature.model');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/showData', (req, res) => {
    Tempature.find({}).exec((err,Temp) => {
         res.json(Temp);
    });
});

app.post('/addData', (req, res) => {
    var NewTeam = new Temperature(req.body);

    NewTeam.save((err,t) => {
        if(err){
            res.send(err);
        }
        else
        {
             res.json(t);
        }
    });

});


app.listen(3000, () => {
    console.log(`Server started on port : 3000`);
});