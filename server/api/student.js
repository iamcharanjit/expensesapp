app = require('express');
mongojs = require('mongojs')

router = app.Router();

var collectionModel = require('../model/studentModel');

router.get('/get', function(req, res){

	collectionModel.find({}, function(error, result){
		if(error) { console.log(error) }
		res.send(result);
	})

})


router.get('/getDataById/:id', function(req, res){
    var get_id = req.params.id;
    var update_id = mongojs.ObjectId(get_id)
	collectionModel.findOne({'_id':update_id}, function(error, result){
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


router.put('/put/:id', function(req, res) {
		var data = {
		firstname : req.body.firstname,
		lastname : req.body.lastname,
		address : req.body.address,
		phone : req.body.phone
	}	

	
	var id = req.params.id;

	console.log(id);
	var query = mongojs.ObjectId(id);
	console.log(query);

	collectionModel.findByIdAndUpdate(query, data, function(error, result){
		if(error) { return res.send(error); console.log(error) }
		res.send(result); console.log(result);

	})
})


router.delete('/delete/:id', function(req, res){
	// var id = req.params.id;
	// collectionModel.findByIdAndRemove({"_id":mongojs.ObjectId(id)}, function(error, result) {
	// 	if(error) { 
	// 		return res.send({error: error.message})
	// 	}
	// 	 res.send({success:result, message:'your data delete'});
	// })



    var id = req.params.id;

    collectionModel.findOneAndRemove({"_id": mongojs.ObjectId(id)}, function(err, result){
    	if(err) {
    		return res.status(400).send({message:err.message})
    	}
    	res.send({success:result, message:'your data delete'})
    } )


})


// for add functionality
router.put('/postsubdoc/:id', function(req, res) {
		var dataMarks = {
			subject : req.body.subject,
			marks : req.body.marks,
			examDate : new Date()
	    }

	    var dataFees = {
			month : req.body.month,
			fees : req.body.fees,
			pending : req.body.pending,
			balance : req.body.balance
	    }	

	
	var id = req.params.id;

	var query = mongojs.ObjectId(id);	

	collectionModel.findByIdAndUpdate(query, {$push:{marks:dataMarks}}, function(error, result){
		if(error) { return res.send(error); console.log(error) }
		res.send(result); console.log(result);

	})

	collectionModel.findByIdAndUpdate(query, {$push:{fees:dataFees}}, function(error, result){
		if(error) { return res.send(error); console.log(error) }
		res.send(result); console.log(result);

	})
})



// update subdoc
router.put('/putsubdoc/:id', function(req, res){

    var id = req.params.id;

    collectionModel.findOne({"marks._id": 	id}, function(err, result){
    	if(err) {
    		return res.status(400).send({message:err.message})
    	}

    	//console.log(result.marks.id);
    	result.marks.id(id).subject = req.body.subject;
    	result.marks.id(id).marks = req.body.marks;
    	result.marks.id(id).examDate = new Date();
    	result.save();
    	res.send({ message:'subdoc update'})
    } )


})



// delete subdoc
router.delete('/deletesubdoc/:id', function(req, res){

    var id = req.params.id;

    collectionModel.findOne({"marks._id": 	id}, function(err, result){
    	if(err) {
    		return res.status(400).send({message:err.message})
    	}

    	//console.log(result.marks);
    	result.marks.id(id).remove();
    	result.save();
    	res.send({ message:'your data delete'})
    } )


})


// for add functionality salary sub doc
router.put('/postsubdocsal/:id', function(req, res) {
		var salaryData = {
			salary_id : req.body.salary_id,
			status : req.body.status,
			created : new Date()
	    }


	
	var id = req.params.id;

	var query = mongojs.ObjectId(id);	

	collectionModel.findByIdAndUpdate(query, {$push:{salary:salaryData}}, function(error, result){
		if(error) { return res.send(error); console.log(error) }
		res.send(result); console.log(result);

	})

})


// for update functionality salary sub doc
router.put('/putsubdocsal/:id', function(req, res){
	var update_id = req.params.id;

	collectionModel.findOne({'salary._id' : update_id}, function(error, result){
		if(error){
			return res.status(400).send({message:error.message});
		}
		result.salary.id(update_id).status = req.body.status;

		result.save();
		res.send({message:'Salary subdoc updated'})
	})
})

// for delete functionality salary sub doc

router.delete('/deletesubdocsal/:id', function(req, res){
	var update_id = req.params.id;
	collectionModel.findOne({'salary._id' : update_id}, function(error, result){
		if(error){
			return res.status(400).send({message:error.message});
		}
		result.salary.id(update_id).remove();
		result.save();
		res.send({message:'Salary subdoc delete'})

	})
})

module.exports = router;