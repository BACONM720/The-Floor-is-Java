var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');
var recipesSchema = new Schema({
rName: {type: String},
rPrice: {type: Number},
sName: {type: String},
rTime: {type: String},
veg: {type: Boolean},
glutfree: {type: Boolean},
hCalorie: {type: Boolean},
lCalorie: {type: Boolean},
vegan: {type: Boolean},
dFree: {type: Boolean}
//date_created : {type: Date, default: new Date()},
//up_votes: {type: Number, default : 0},
//down_votes: {type: Number, default : 0}
});
module.exports = mongoose.model('Recipe',recipesSchema);
