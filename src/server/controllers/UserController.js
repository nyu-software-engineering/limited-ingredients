require('./../models/User');
var mongoose = require('mongoose');
const User = mongoose.model('User');
const authenticationManager = require('./../services/AuthenticationManager');

module.exports = {

	registerUser: authenticationManager.registerUser,

	loginUser: authenticationManager.loginUser,

	/*
		Find user in mongodb database
	 */
	findUser: (req, res, next) => {
		//const id = req.params.id;
		const userId = req.body.userId;
		//console.log("id: ", userId);
		User.findOne({_id: userId}).then((user) => {
			if(user){
				res.json(user);
			}else{
				console.log("error with finding user");
			}
   		});
	},

	/*This looks weird because auth is big enough to be its owns service*. Will usually call Mongo stuff from controller - Casey note*/
};
