app = require('express');

router = app.Router();

var collectionModel = require('../model/salaryModel');

router.get('/getsal', function(req, res){
	collectionModel.find({}, function(error, result){
		if(error) {res.send(error);console.log("error "+error)}
		res.send(result);console.log("success "+result);
	})
})

router.post('/post', function(req, res) {
	data = {
		salary : req.body.salary,
		department : req.body.department,
		empId: req.body.empId
	}

	collectionData = new collectionModel(data);

	collectionData.save(function(error, result){
		if(error) {res.send(error); console.log(error)}
		res.send(result); console.log(result);
	})
})

module.exports = router;