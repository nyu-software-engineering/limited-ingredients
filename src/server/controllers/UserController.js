require('./../models/User');
var mongoose = require('mongoose');
const User = mongoose.model('User');
const Recipe = mongoose.model('Recipe');

const authenticationManager = require('./../services/AuthenticationManager');

/*helper method*/
function getRecipesForIds(_recipes,next){
	Recipe.find({_id: { $in: _recipes }}).then((recipes) =>{
		next(recipes);
	});			
}

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
	getSavedRecipesForUser: (req, res, next) => {
		//const id = req.params.id;
		const userId = req.query.userId;
		//console.log("id: ", userId);
		const justIds = req.query.justIds;
		User.findOne({_id: userId}).then((user) => {
			if(user){
				if(justIds){
					res.json(user.recipes);
				}else{
					getRecipesForIds(user.recipes,(recipes)=>{
						res.json(recipes);
					});
				}
			}else{
				console.log("error with finding user");
				res.json([]);
			}
   		});
	}
};
