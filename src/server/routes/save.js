const express = require("express");
const router = express.Router();

const saveController = require('./../controllers/saveController.js');
module.exports = (router) => {

	
	// @route POST api/saveRecipe
	// @desc Save recipe to user account
	// @access Public
  router
	.route('/saveRecipe')
    .post(saveController.saveRecipe);
}