var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var carSchema = new Schema({	'name' : String,	'age' : Number,	'return' : String});

module.exports = mongoose.model('car', carSchema);
