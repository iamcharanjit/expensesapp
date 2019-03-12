var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');
var Schema = mongoose.Schema;
var userSchema = new Schema({
	firstName : String,
	lastName : String,
	userName : { type:String, unique:true},
	password : { type:String, select:false}
});


userSchema.pre('save',function(next){
	var user = this;
	//console.log(user);
	if(!user.isModified('password'))
	{
		console.log();
		return next();	
	}
	
	bcryptjs.genSalt(10,function(err,salt) {
		//console.log(user.password);
		bcryptjs.hash(user.password,salt,function(err,hash) {
			user.password = hash;
			//console.log(user.password);
			next(); 
		})
	})
})

userSchema.methods.comparePassword = function(password, done){
	//console.log(bcryptjs.compare());
	bcryptjs.compare(password, this.password, function(error, match) {
		
		done(error, match);
	})
}

module.exports = mongoose.model('user', userSchema);