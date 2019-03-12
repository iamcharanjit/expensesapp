var express = require('express');
var cors = require('cors');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var db = require('./config/config');
port = process.env.PORT || 3000;
app = express();
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.listen(port,()=>{ console.log("Node app is running on " + port ) });

//mongoose.connect(db.database, { useNewUrlParser: true });

mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});

require('./config/route')(app);
// app.get('/getdata',function(req, res){
// 	res.send(req.body);
// 	console.log(req.body);
// 	//res.send("get request");
// 	//console.log('get request');
// })

// app.get('/getdata2', function(req,res){
// 	var data = {
// 		name:req.body.name,
// 		rollno:req.body.rollno
// 	}
// 	res.send(data);
// 	console.log(data);
	
// })

// app.put('/update/:ids', function(req, res){
// 	res.send(req.params.ids);
// })



