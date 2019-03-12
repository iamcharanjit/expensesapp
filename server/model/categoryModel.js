var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	category : String,
	userId : mongoose.Schema.ObjectId,
	status : { type:String, enum: ['Active', 'InActive'] },
	created : { type:Date, default: new Date() },
	updated : Date
})

module.exports = mongoose.model('category', schema);
