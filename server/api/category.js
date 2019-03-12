app = require('express');

router = app.Router();

var collectionModel = require('../model/categoryModel');
var collectionModelUser = require('../model/userModel');
/* for update data and delete "id" is required , so mongojs is used */



var auth = require('../../auth/auth');

var collectionModelExpenses = require('../model/expensesModel');

var mongojs = require('mongojs');

router.get('/count', function(req, res) {

	collectionModel.count(function(error, result){
		 if(error) {
		 	return res.send(error);
		 	console.log(error); 
		 }  
		 res.json(result);
		 
	})

})

router.get('/getcategory', auth.authenticate, function(req, res) {
	// check user

	collectionModelUser.findById(req.userId, function(err, reslt) {
		if(err) {
			return res.send({success:false, message:"User not found"});
		}

		collectionModel.find({userId:req.userId}, function(error, result){
			if(error) { console.log(error) }
			res.send({result});
		})	

	})
	// END check usee

	

})

router.get('/getallcategory', function(req, res) {

	collectionModel.find({}, function(error, result){
		if(error) { console.log(error) }
		res.send({result});
	})	
	
	
	
	// END check usee
	
})

router.post('/addcategory', auth.authenticate, function(req, res) {
	// console.log(req.body)
	// check user
	collectionModelUser.findById(req.userId, function(err, reslt) {
		if(err) {
			return res.send({success:false, message:"User not found"});
		}
	

		var data = {
			userId : req.userId,
			status : req.body.status,
			category : req.body.category
		}

	    collectionData = new collectionModel(data);

	    collectionData.save(function(error, result){
	    	if(error) { console.log(error) }
	    	res.send({success:true, result:result, message:"Category  Added successfully"});

	    })

	})

})

router.put('/updatecategory/:id', auth.authenticate, function(req, res) {
	//console.log(req.params.id);
	//res.send(req.params.id);
	collectionModelUser.findById(req.userId, function(err, reslt) {
		if(err) {
			return res.send({success:false, message:"User not found"});
		}
	
		var data = {
			status : req.body.status,
			category : req.body.category,
			updated : new Date()
		}

		var id = req.params.id;
		var query = mongojs.ObjectId(id);

		//findOneAndUpdate
		//findOneAndReplace,

		collectionModel.findByIdAndUpdate({"_id":query}, data, function(err, result){
			if(err) { 
				return res.status(400).send({success:false, message:err.message}) 
			}
			res.send({success:true, result:result, message:"Category updated"})
		})

	})


})
 
router.delete('/deletecategory/:id',auth.authenticate, function(req, res) {
	// console.log(req.params.id);
    // res.send(req.params.id);

    /*   mehohod 1 
    collectionModel.findByIdAndRemove(mongojs.ObjectId(req.params.id), function(err, result){
    	if(err) {console.log('delete error');res.send(err)}
    	res.send(result);
    })
    */
    collectionModelUser.findById(req.userId, function(err, reslt) {
		if(err) {
			return res.send({success:false, message:"User not found"});
		}
	
	    var id = req.params.id;
	   
	    console.log(id);																																																																																																																																																																																																																																																																																																																																																																											

	    collectionModelExpenses.findOne({"catId":mongojs.ObjectId(id)}, function(err, reslt) {
	    	if(reslt) {
	    		
	    		return res.status(400).send({success:false, message:'First delete record from expenses '}); 
	    	}
	    
		    collectionModel.findByIdAndRemove({"_id": mongojs.ObjectId(id)}, function(error, result) {
		    	if(error) {
		    		return res.status(400).send({message:err.message})
		    	}
		    	res.send({success:true, result:result, message:'Category deleted'})
		    })

		})

	}) // user check

})

module.exports = router;