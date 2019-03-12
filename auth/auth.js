var moment = require('moment'); // for time
var jwtSimple = require('jwt-simple');  // for token
var config = require('../config/config'); // get token secret code

module.exports={
	createtoken:function(user)
	{
		var payload={
	     sub:user._id, //subject
	     iat:moment().unix(),   //initiated time
	     exp:moment().add(1,"days").unix()  //expire time
		}
		return jwtSimple.encode(payload,config.TOKEN_SECRET);
	},
	authenticate:function(req, res, next)
	{
		console.log(req.headers);

		if(!req.headers.authorization)
		{
			return res.status(401).send({success:false,message:"You are not autherizaed"});
		}
		var token = req.headers.authorization.split(' ')[1];
		var payload = null;
		try {
          payload = jwtSimple.decode(token,config.TOKEN_SECRET);
		}
		catch(err)
		{
             return res.status(401).send({success:false,message:err.message}); 
		}
		if(payload.exp<=moment().unix())
		{
			return res.status(401).send({success:false,message:"You token expired"});
		}
		req.userId=payload.sub;
		next();
	}
}