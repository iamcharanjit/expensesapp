app = require('express');

router = app.Router();

var collectionModel = require('../model/teacherModel');

router.get('/get', function(req, res){

	collectionModel.find({}, function(error, result){
		if(error) { console.log(error) }
		res.send(result);
	})

})

router.post('/post', function(req, res){
	var data = {
		firstname : req.body.firstname,
		lastname : req.body.lastname,
		address : req.body.address,
		phone : req.body.phone
	}

    collectionData = new collectionModel(data);

    collectionData.save(function(error, result){
    	if(error) { console.log(error) }
    	res.send(result);
    })

})

module.exports = router;