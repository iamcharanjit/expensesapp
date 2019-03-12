var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	firstname : String,
	lastname : String,
	address : String,
	phone : Number,
	created : { type:Date, default: new Date() }
})

module.exports = mongoose.model('teacher', schema);


