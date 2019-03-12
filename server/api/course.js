app = require('express');

router = app.Router();

var collectionModel = require('../model/courseModel');

var mongojs = require('mongojs');

router.get('/get', function(req, res){
	collectionModel.find({}, function(error, result){
		if(error) { res.send(error); console.log(error)}
		res.send(result);console.log(result);
	})
})

router.get('/getAndCriteria', function(req, res){
	var criteria = {$and: [{email:req.body.email}, {phone:req.body.phone}]};
	collectionModel.find(criteria, function(error, result){
		if(error) {res.send(error); console.log(error)}
		res.send(result);console.log(error);
	})
})

/** show selected field **/
router.get('/getFind', function(req, res){
	var criteria = {$and: [{email:req.body.email}, {phone:req.body.phone}]};
	collectionModel.find(criteria, {_id:0, name:1, email:1}, function(error, result){
		if(error) {res.send(error); console.log(error)}
		res.send(result);console.log(error);
	})
})

router.post('/post', function(req, res){
	collectionModel.findOne({'email': req.body.email}, function(error, existingData){
	if(existingData) {
		return res.status(404).send({errMsg: 'Email already exists'})
	} 
	
	    collectionModel.findOne({'phone': req.body.phone}, function(error, existingData){
		if(existingData) {
			return res.status(404).send({errorMsg: 'Phone already exists'})
		}
	

			data = {
				name : req.body.name,
				email : req.body.email,
				phone : req.body.phone
			}
			collectionData = new collectionModel(data);

			collectionData.save(function(error, result){
				if(error) {res.send(error); console.log(error)}
				res.send(result);
				console.log(result);
			})
		})

	}) /*  end of existingData */
})

module.exports = router;