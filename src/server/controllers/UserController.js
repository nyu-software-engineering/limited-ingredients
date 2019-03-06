const User = require('./../models/User');
const authenticationManager = require('./../services/AuthenticationManager');

module.exports = {
	registerUser: authenticationManager.registerUser,
	loginUser: authenticationManager.loginUser,
	/*This looks weird because auth is big enough to be its owns service*. Will usually call Mongo stuff from controller - Casey note*/
};
