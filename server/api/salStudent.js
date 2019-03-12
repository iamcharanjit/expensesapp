app = require('express');
mongojs = require('mongojs')

router = app.Router();

var collectionSalModel = require('../model/salaryModel');
var collectionStuModel = require('../model/studentModel');



// for add functionality salary sub doc
router.put('/postsubdocsal/:id', function(req, res) {
		var salaryData = {
			salary_id : req.body.salary_id,
			status : req.body.status,
			created : new Date()
	    }


	
	var id = req.params.id;

	var query = mongojs.ObjectId(id);	

	collectionStuModel.findByIdAndUpdate(query, {$push:{salary:salaryData}}, function(error, result){
		if(error) { return res.send(error); console.log(error) }
		res.send(result); console.log(result);

	})

})


// for update functionality salary sub doc
router.put('/putsubdocsal/:id', function(req, res){
	var update_id = req.params.id;

	collectionStuModel.findOne({'salary._id' : update_id}, function(error, result){
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
	collectionStuModel.findOne({'salary._id' : update_id}, function(error, result){
		if(error){
			return res.status(400).send({message:error.message});
		}
		result.salary.id(update_id).remove();
		result.save();
		res.send({message:'Salary subdoc delete'})

	})
})

/* aggregate all */
router.get('/aggregateStuSalary', function(req, res){
	var cursor = collectionStuModel.aggregate([
	{
		$lookup:{
			from : 'salaries',
			localField:'salary.salary_id',
			foreignField: '_id',
			
			as : 'stuSalaryData'
		}
	}
	])
	cursor.exec(function(error, result){
		if(error) { res.send(error); console.log(error) }
		res.send(result); console.log(result)
	})
})

router.get('/aggregateSalStudent', function(req, res){
	var cursor = collectionSalModel.aggregate([
	{
		$lookup:{
			 from : 'students',
			 localField:'_id',
			 foreignField: 'salary.salary_id',
			 as : 'salStudentData'

		}
	}
	])
	cursor.exec(function(error, result){
		if(error) { res.send(error); console.log(error) }
		res.send(result); console.log(result)
	})
})


module.exports = router;