var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	firstname : String,
	lastname : String,
	address : String,
	phone : Number,
	marks : [{
		subject: String,
		marks: Number,
		examDate: Date
	}],
	fees: [{
		month: String,
		fees: Number,
		pending: Number,
		balance: Number
	}],
	salary: [{
		salary_id:mongoose.Schema.ObjectId,
		status:Boolean,
		created : { type:Date, default: new Date() }
	}],
	created : { type:Date, default: new Date() }
})

module.exports = mongoose.model('student', schema);