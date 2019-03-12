var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	userId : mongoose.Schema.ObjectId,
	catId : mongoose.Schema.ObjectId,
	expenses : Number,
	status : { type:String, enum: ['Active', 'InActive'] },
	created : { type:Date, default: new Date() },
	updated : Date
})

module.exports = mongoose.model('expenses', schema);
