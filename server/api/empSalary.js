app = require('express');

router = app.Router();

//var collectionSalaryModel = require('../model/salaryModel');
var collectionModel = require('../model/employeeModel');
/* for update data and delete "id" is required , so mongojs is used */
var mongojs = require('mongojs')

/* aggregate all */
router.get('/aggregate', function(req, res){
	var cursor = collectionModel.aggregate([
	{
		$lookup:{
			from : 'salaries',
			localField:'_id',
			foreignField: 'empId',
			as : 'empSalData'
		}
	}
	])
	cursor.exec(function(error, result){
		if(error) { res.send(error); console.log(error) }
		res.send(result); console.log(result)
	})
})

/* aggregate with $project(selected field)*/
router.get('/getSelectedField', function(req, res){
	var cursor = collectionModel.aggregate([{
		$lookup:{
			from : 'salaries',
			localField:'_id',
			foreignField: 'empId',
			as : 'empSalData'
		}
	},
		{
			$project: { "_id":1,
						"firstname":1,
						"lastname":1,
						"phone":1,
						"empSalData.salary":1,
						"empSalData.department":1
					   }
		
		}
	])
	cursor.exec(function(error, result){
		if(error) { res.send(error); console.log(error) }
		res.send(result); console.log(result)
	})
})

/* aggregate with $project not belonging data(selected field)*/
router.get('/get', function(req, res){
	var cursor = collectionModel.aggregate([
	{
		$lookup:{
			from : 'salaries',
			localField:'_id',
			foreignField: 'empId',
			as : 'empSalData'
		}
	},
	{
		$match:{
			/* ne Not Equal (Do not list record which  not match)*/
			"empSalData":{$ne:[]}
		}
	},
	{
		$project: { "_id":1,
					"firstname":1,
					"lastname":1,
					"phone":1,
					"empSalData.salary":1,
					"empSalData.department":1
		}
	
	}

	])
	cursor.exec(function(error, result){
		if(error) { res.send(error); console.log(error) }
		res.send(result); console.log(result)
	})
})

/* aggregate with $match work */
router.get('/getmatch', function(req, res){
	var cursor = collectionModel.aggregate([
	
	{
		$lookup:{
			from : 'salaries',
			localField:'_id',
			foreignField: 'empId',
			as : 'empSalData'
		}
	},
	{
		$match:{
			// condition base
			//'firstname':'sham'
			//'empSalData.department' : 'computer'
			'empSalData.salary' : 10000
		}

	},
	{
		$match:{
			// ne Not Equal (Do not list record which  not match)
			"empSalData":{$ne:[]}
		}
	},
	{
		$project: { "_id":1,
					"firstname":1,
					"lastname":1,
					"phone":1,
					"empSalData.salary":1,
					"empSalData.department":1
		}
	
	}

	])
	cursor.exec(function(error, result){
		if(error) { res.send(error); console.log(error) }
		res.send(result); console.log(result)
	})
})


module.exports = router;