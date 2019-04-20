//const express = require("express");
const deleteController = require('./../controllers/deleteController.js');
module.exports = (router) => {
	// @route POST api/deleteRecipe
	// @desc Delete recipe from user account
	// @access Public
  router
	.route('/deleteRecipe')
    .post(deleteController.deleteRecipe);
}