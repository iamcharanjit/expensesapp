var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name : String,
	email : {type:String, unique:true},
	phone : {type:String, unique:true}
})

module.exports = mongoose.model('course', schema)





