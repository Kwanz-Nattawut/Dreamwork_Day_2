var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('./mongoose');
var Temperature = require('./models/temperature.model');
var request = require('request');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/receiveData', (req, res) => {
    request.post({url:'https://loraiot.cattelecom.com/portal/iotapi/core/devices/{AA00DBCA12EF1116}/downlinkMessages', form: {username : "TGR13_16" , password : "47848308"}}, function(err,httpResponse,body){
         res.json(body);
    })
});

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/showData', (req, res) => {
    Temperature.find({}).exec((err,Temp) => {
         res.json(Temp);
    });
});

app.put('/editData/:teamID', (req, res) => {
    var json = req.params.teamID;
    var newTemp = req.body.temp;
    Temperature.findOneAndUpdate({teamID : json},{$set : {temp : newTemp}},{upsert : true},(err,t) => {
        if(err){
            throw err;
        }
        else
        {
             Temperature.findOne({teamID : json}).exec((err,t) => {
                if(err){
                    throw err;
                }
                else{
                     res.json(t);
                }
             });
        }
    });
});


app.post('/addData', (req, res) => {
    var NewTeam_temp = new Temperature(req.body);
    console.log(NewTeam_temp);
    NewTeam_temp.save((err,t) => {
        if(err){
            res.send(err);
        }
        else
        {
             res.json(t);
        }
    });

});

app.delete('/deleteData/:teamID', (req, res) => {

    var Delete_tempID = req.params.teamID;
    console.log(Delete_tempID);
    Temperature.findOneAndDelete({teamID: Delete_tempID}, (err, t)=>{
        if(err){
            throw err;
        }else{
             res.json(t);
        }
    });
});


app.listen(3000, () => {
    console.log(`Server started on port : 3000`);
});