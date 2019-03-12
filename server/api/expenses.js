app = require('express');

router = app.Router();

var collectionModel = require('../model/expensesModel');
var collectionModelUser = require('../model/userModel');
/* for update data and delete "id" is required , so mongojs is used */

var auth = require('../../auth/auth');

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

// router.get('/getexpenses', auth.authenticate, function(req, res) {
//     collectionModelUser.findById(req.userId, function(err, reslt) {
// 		if(err) {
// 			return res.send({success:false, message:"User not found"});
// 		}
	
// 		collectionModel.find({}, function(error, result){
// 			if(error) { console.log(error) }
// 			res.send({result});
// 		})

// 	}) // end check

// })

router.get('/getexpensescat', auth.authenticate, function(req, res){
	collectionModelUser.findById(req.userId, function(err, reslt) {
		if(err) {
			return res.send({success:false, message:"User not found"});
		}
	
		var cursor = collectionModel.aggregate([
			{$sort:{created:-1}},
		{
			$lookup:{
				from : 'categories',
				localField:'catId',
				foreignField: '_id',
				as : 'expensesCatData'
			}
		},
		
		{
			$match:{
				
				"userId":mongojs.ObjectId(req.userId)
			}
		},
		{
			$match:{
				/* ne Not Equal (Do not list record which  not match)*/
				"expensesCatData":{$ne:[]}
			}
		},
		{
			$project: { "_id":1,
						"catId":1,
						"expenses":1,
						"status":1,
						"created":1,
						"expensesCatData.category":1,
						"expensesCatData._id":1
			}
		
		}

		])
		cursor.exec(function(error, result){
			if(error) { res.send(error); console.log(error) }
			res.send({success:true,result:result}); console.log(result);
		})
	}) // end check
})

router.post('/addexpenses', auth.authenticate, function(req, res) {
	//console.log(req.body)
	collectionModelUser.findById(req.userId, function(err, reslt) {
		if(err) {
			return res.send({success:false, message:"User not found"});
		}
	
		var data = {
			userId : req.userId,
			catId : req.body.catId,
			expenses : req.body.expenses,
			status : req.body.status,
			created : new Date()
			
		}

		console.log("node data");
		console.log(data);
	    collectionData = new collectionModel(data);

	    collectionData.save(function(error, result){
	    	if(error) { console.log(error) }
	    	res.send({success:true, result:result, message:"Expenses added"});
	    	
	    })

	}) // end check

})

router.put('/updateexpensescat/:id', auth.authenticate, function(req, res) {
	collectionModelUser.findById(req.userId, function(err, reslt) {
		if(err) {
			return res.send({success:false, message:"User not found"});
		}
	
		console.log(req.params.id);
		console.log("test");
		//res.send(req.params.id);

		var data = {
			catId : req.body.catId,
			expenses : req.body.expenses,
			status : req.body.status,	
			updated : new Date()
		}

		var get_id = req.params.id;
		var query = mongojs.ObjectId(get_id);

		//findOneAndUpdate
		//findOneAndReplace,

		collectionModel.findByIdAndUpdate({"_id":query }, data, function(err, result){
			if(err) { 
				return res.status(400).send({msg:err.message})
			}
			res.send({success:true, result:result, message:"Expenses updated"})
		})

	}) // end check

})

router.delete('/delete/:id', auth.authenticate, function(req, res) {
	//console.log(req.params.id);
    //res.send(req.params.id);

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
	    collectionModel.findByIdAndRemove({"_id": mongojs.ObjectId(id)}, function(err, result){
	    	if(err) {
	    		return res.status(400).send({message:err.message})
	    	}
	    	res.send({success:true, result:result, message:'Expenses data delete'})
	    })

	})

})

module.exports = router;