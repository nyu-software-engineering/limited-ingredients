const express = require("express");
const router = express.Router();

const userController = require('./../controllers/UserController');
module.exports = (router) => {

	
	// @route POST api/users/register
	// @desc Register user
	// @access Public
  router
		.route('/register')
		.post(userController.registerUser);
	
	// @route POST api/users/login
	// @desc Login user
	// @access Public
  router
		.route('/login')
		.post(userController.loginUser);
	
}