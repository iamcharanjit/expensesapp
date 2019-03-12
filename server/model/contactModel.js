var mongoose = require('mongoose');

var schema = mongoose.Schema({
	name : String,
	mobile : Number,
	email : String,
	address : String
}) 

module.exports = mongoose.model('contact', schema);

