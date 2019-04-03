const express = require("express");
const router = express.Router();

const searchController = require('./../controllers/searchController.js');
module.exports = (router) => {

	
	// @route POST api/search
	// @desc Find recipes
	// @access Public
  router
	.route('/search')
	.post(searchController.searchRecipes);
	


	
};