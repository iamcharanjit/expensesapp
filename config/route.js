


module.exports = function(app){

	var employeeApi = require('../server/api/employee.js');
	var managerApi = require('../server/api/manager.js');
	var studentApi = require('../server/api/student.js');
	var teacherApi = require('../server/api/teacher.js');
	var contactApi = require('../server/api/contact.js');
	var courseApi = require('../server/api/course.js');
	var salaryApi = require('../server/api/salary.js');
	var empSalaryApi = require('../server/api/empSalary.js');
	var salStudentApi = require('../server/api/salStudent.js');
	var userApi = require('../server/api/user.js');
	var bucketListApi = require('../server/api/bucketList.js');

	var categoryApi = require('../server/api/category.js');
	var expensesApi = require('../server/api/expenses.js');

	var youtubeApi = require('../server/api/youtube.js');



	app.use('/employee', employeeApi);
	app.use('/manager', managerApi);
	app.use('/student', studentApi);
	app.use('/teacher', teacherApi);
	app.use('/contact', contactApi);
	app.use('/course', courseApi);
	app.use('/salary', salaryApi);
	app.use('/empsalary', empSalaryApi);
	app.use('/salstudent', salStudentApi);
	app.use('/user',userApi);
	app.use('/bucketList',bucketListApi);

	app.use('/category',categoryApi);
	app.use('/expenses',expensesApi);
	app.use('/youtube',youtubeApi);


}