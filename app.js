var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('./mongoose');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Hello World");
    res.send(mongoose.connection.readyState);
});


app.listen(3000, () => {
    console.log(`Server started on port : 3000`);
});