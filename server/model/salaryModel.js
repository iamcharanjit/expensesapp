var mongoose = require('mongoose');

//var Schema = mongoose.Schema;

var schema = new mongoose.Schema({
	salary:Number,
	department:String,
	empId:mongoose.Schema.ObjectId
})

module.exports = mongoose.model('salary', schema)









