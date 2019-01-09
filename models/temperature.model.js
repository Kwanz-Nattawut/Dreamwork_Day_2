var mongoose = require('../mongoose');

var Schema = mongoose.Schema;

var TemperatureSchema = new Schema({
    teamID : String,
    temp : Number
});

module.exports = mongoose.model('temperature',TemperatureSchema);