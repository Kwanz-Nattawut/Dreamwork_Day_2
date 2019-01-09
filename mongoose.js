var mongoose = require('mongoose');

var db = 'mongodb://localhost/tgr2019';

var option = {
    auth : {
        user : 'dreamwork',
        password : 'tgr2019'
    },
    useNewUrlParser: true
};

mongoose.connect(db,option);

module.exports = mongoose;