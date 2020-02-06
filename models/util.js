var mongoose = require('mongoose');
var connection =
mongoose.connect('mongodb://mongodb5026mr:fo6sew@danu7.it.nuigalway.ie:8717/mongodb5026', {useNewUrlParser: true});
exports.connection = connection;
