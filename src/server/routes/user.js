const express = require("express");
const router = express.Router();

const userController = require('./../controllers/UserController');
module.exports = (router) => {

	
	// @route POST api/register
	// @desc Register user
	// @access Public
  router
		.route('/register')
		.post(userController.registerUser);
	
	// @route POST api/login
	// @desc Login user
	// @access Public
  router
		.route('/login')
		.post(userController.loginUser);

  // @route GET api/findUser/:id
  // @desc Find user by id
	// @access Public
	/*
  router
      .route('/findUser/:id')
			.get(userController.findUser);
	*/
	router
			.route('/getRecipesUser')
			.get(userController.getSavedRecipesForUser);
	
	router
			.route('/findUser')
			.post(userController.findUser);
	
};