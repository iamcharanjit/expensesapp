app = require('express');

var collectionModel = require('../model/bucketListModel');

router = app.Router();

// router.get('/get', function(req, res){
// 	//res.send(req.body);
// 	//console.log(req.body);

// 	collectionModel.find({}, function(error, result){
// 		if(error) { console.log(error); }
// 		res.send(result);
// 	})
// })


// router.post('/post', function(req, res){
// 	//res.send(req.body);
// 	//console.log(req.body);

// 	var data = {
// 		name : req.body.name,
// 		mobile : req.body.mobile,
// 		email : req.body.email,
// 		address : req.body.address
// 	}

// 	collectionData = new collectionModel(data);
// 	collectionData.save(function(error, result){
// 		if(error) { console.log(error); }
// 		res.send(result);
// 	});

// })


// router.delete('/delete/:id', function(req, res) {
//   var id = req.params.id;
//     console.log(id);
//     collectionModel.findByIdAndRemove({"_id": mongojs.ObjectId(id)}, function(err, result){
//     	if(err) {
//     		return res.status(400).send({message:err.message})
//     	}
//     	res.send({success:result, message:'your data delete'})
//     } )

// })

router.get('/get', (req, res) => {
	collectionModel.getAllList((error, result)=>{
		if(error) { console.log(error) }
		res.send(result);
	})
})

router.post('/post', (req, res) => {
	var data = {
		name : req.body.name,
		status : req.body.status
	}


	collectionModel.addBucket(data, (error, result) => {
		if(error) { console.log(error) }
		res.send(result);
	})
})



module.exports = router;