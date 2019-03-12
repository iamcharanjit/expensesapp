app = require('express');

var collectionModel = require('../model/contactModel');

router = app.Router();

router.get('/get', function(req, res){
	//res.send(req.body);
	//console.log(req.body);

	collectionModel.find({}, function(error, result){
		if(error) { console.log(error); }
		res.send(result);
	})
})

router.post('/post', function(req, res){
	//res.send(req.body);
	//console.log(req.body);

	var data = {
		name : req.body.name,
		mobile : req.body.mobile,
		email : req.body.email,
		address : req.body.address
	}

	collectionData = new collectionModel(data);
	collectionData.save(function(error, result){
		if(error) { console.log(error); }
		res.send(result);
	});

})

module.exports = router;