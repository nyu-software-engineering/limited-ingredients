const User = require('./../models/User');
const authenticationManager = require('./../services/AuthenticationManager');

module.exports = {

	registerUser: authenticationManager.registerUser,

	loginUser: authenticationManager.loginUser,

	/*
		Find user in mongodb database
	 */
	findUser: (req, res, next) => {
		const id = req.params.id;
		User.findOne({id: id}).then((err,user) => {
			if(err){
				res.status(404).json(err);
			}else{
				res.json(user);
			}
    });
	},

	/*This looks weird because auth is big enough to be its owns service*. Will usually call Mongo stuff from controller - Casey note*/
};
