var mongoose = require('mongoose');

var schema =mongoose.Schema({
	name : { type:String, required:true },
	status : { type:String, enum: ['Active', 'InActive'] }
}) 

const collectionModel = module.exports = mongoose.model('bucketlist', schema);

module.exports.getAllList = (callback)   => {
	collectionModel.find(callback);
}

module.exports.addBucket = (data, callback) => {
	
	var collectionData = new collectionModel(data);
	collectionData.save(callback);
}


