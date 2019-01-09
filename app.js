var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('./mongoose');
var Temperature = require('./models/temperature.model');
var request = require('request');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/receiveData', (req, res) => {
    var tempReceiveData = new Temperature();
    
    //var payload = req.body.DevEUI_up.payload_hex;
    console.log(req.params);
    /*var temp = (parseInt(payload.slice(4,8),16) * 0.1).toFixed(2);
    var teamID = (parseInt(payload.slice(12,16),16) *0.01);

    tempReceiveData.teamID = teamID;
    tempReceiveData.temp = temp;
    tempReceiveData.save();*/
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