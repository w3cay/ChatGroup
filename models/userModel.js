var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({	'uuid' : String,	'username' : String,	'mobile' : String,	'avatar' : String,	'sex' : Number,	'type' : Number,	'brithday' : Date,	'city' : Number,	'district' : String,	'latitude' : Number,	'longitude' : Number,	'createdAt' : Date,	'updatedAt' : Date,	'password' : String});

module.exports = mongoose.model('user', userSchema);
