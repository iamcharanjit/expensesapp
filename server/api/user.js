app = require('express');

var collectionModel = require('../model/userModel');

auth = require('../../auth/auth');
router = app.Router();

router.post('/signInUser', function(req, res){
	// check username exists or not
	collectionModel.findOne({'userName':req.body.userName}, function(error, result){
		if(!result) {  
				return res.send({success:false, message:'User Name not exists'});
		}

	// compare form password with database password
		collectionModel.findOne({'userName':req.body.userName },'+password',function(error, user){

			user.comparePassword(req.body.password, function(error, match) {
				if(!match) { return res.send({success:false, message:"error.message"}) }

				// create token
				var tokendata = auth.createtoken(user);
				console.log(tokendata);

				res.send({success:true, message:'Login success',token:tokendata});
			})
		})
	})
})

router.post('/signUpUser',  function (req, res) {
	
	// check same username 

	collectionModel.findOne({'userName':req.body.userName}, function(error, result){
		if(result) {  
				return res.send({success:false, message:'User Name already exists'});
		}
				// End Check same user name

				// data = {
				// 	firstName : req.body.firstName,
				// 	lastName : req.body.lastName,
				// 	userName : req.body.userName,
				// 	password : req.body.password
				// }
				// collectionData = new collectionModel(data);

               var user=new collectionModel({
               		firstName : req.body.firstName,
					lastName : req.body.lastName,
					userName : req.body.userName,
					password : req.body.password
               })
				user.save(function(error, result) {
					if(error) {   
						console.log(error);
						return res.send({success:false, message:error.message}); 
						
					}
					res.send({success:true, message:"Sign Up Form submitted"});
					console.log({result:result, message:"Sign Up Form submitted"});
				})	

		})

})




router.get('/dashboardProfile', auth.authenticate, function(req, res) {
	
	// req.userId from auth.authenticate function
	collectionModel.findById(req.userId , function(error, result){
		if(error) { 
			
			return res.send({success:false, message:error.message});
		}
		res.send({success:true, data:result})
	})
})

module.exports = router;