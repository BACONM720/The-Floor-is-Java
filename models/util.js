var mongoose = require('mongoose');
var connection =
mongoose.connect('mongodb://mongodb5445bn:na9voz@danu7.it.nuigalway.ie:8717/mongodb5445', {useNewUrlParser: true} , {useUnifiedTopology: true} );
exports.connection = connection;
