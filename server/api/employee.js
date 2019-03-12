app = require('express');

router = app.Router();

var collectionModel = require('../model/employeeModel');
/* for update data and delete "id" is required , so mongojs is used */
var mongojs = require('mongojs')

router.get('/count', function(req, res) {



	collectionModel.count(function(error, result){
		if(error) {
		 	return res.send(error);
		 	console.log(error); 
		 }
		 res.json(result);
		
	})


})

router.get('/get', function(req, res) {

	collectionModel.find({}, function(error, result){
		if(error) { console.log(error) }
		res.send(result);
	})

})

router.post('/post', function(req, res) {
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

router.put('/put/:id', function(req, res) {
	//console.log(req.params.id);
	//res.send(req.params.id);

	var data = {
		firstname : req.body.firstname,
		lastname : req.body.lastname,
		updated : new Date()
	}

	var id = req.params.id;
	var query = mongojs.ObjectId(id);

	//findOneAndUpdate
	//findOneAndReplace,

	collectionModel.findByIdAndUpdate(query, data, function(err, result){
		if(err) { 
			return res.status(400).send({msg:err.message})
		}
		res.send({success:result, msg:"your data updated"})
	})



})

router.delete('/delete/:id', function(req, res) {
	//console.log(req.params.id);
    //res.send(req.params.id);

    /*   mehohod 1 
    collectionModel.findByIdAndRemove(mongojs.ObjectId(req.params.id), function(err, result){
    	if(err) {console.log('delete error');res.send(err)}
    	res.send(result);
    })
    */
    var id = req.params.id;
    console.log(id);
    collectionModel.findByIdAndRemove({"_id": mongojs.ObjectId(id)}, function(err, result){
    	if(err) {
    		return res.status(400).send({message:err.message})
    	}
    	res.send({success:result, message:'your data delete'})
    } )

})

module.exports = router;