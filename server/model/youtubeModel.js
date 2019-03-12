var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	youtube : String,
	userId : mongoose.Schema.ObjectId,
	created : { type:Date, default: new Date() },
	updated : Date
})

module.exports = mongoose.model('youtube', schema);
