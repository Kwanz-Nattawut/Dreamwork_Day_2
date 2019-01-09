var mongoose = require('mongoose');

var db = 'mongodb://localhost/hwData';

var option = {
    auth : {
        user : 'dreamwork',
        password : 'tgr2019'
    },
    useNewUrlParser: true
};

mongoose.connect(db,option);

module.exports = mongoose;