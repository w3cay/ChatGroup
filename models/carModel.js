var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var carSchema = new Schema({

module.exports = mongoose.model('car', carSchema);