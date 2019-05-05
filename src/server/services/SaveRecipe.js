var mongoose = require('mongoose');
//require('./../models/Recipes');
require('./../models/User');
//const Recipes = mongoose.model('Recipe');
const User = mongoose.model('User');

function saveRecipe (req, res){
    const recipeId = req.body.recipe;
    const userId = req.body.userId;
    const error = {};
    User.findOne({_id: userId}).then (user => {
        if (user){
            const convertToId = mongoose.Types.ObjectId(recipeId);
            console.log("recipeid: ", convertToId);
            const alreadySavedRecipe = user.recipes.includes(convertToId);
            console.log("user contains recipe? : ", alreadySavedRecipe);
            if (alreadySavedRecipe) {
                error.duplicate = "User already saved this recipe";
                return res.status(300).json(error);
            } 
            else{
                user["recipes"].push(recipeId);
                user.save().then (user => {
                    console.log(user);
                    return res.json(user);
                });
            }
        }
        else{
            console.log("could not find user");
            return res.json("error- could not find user");
        }
    })
}
module.exports = {
    saveRecipe: saveRecipe
}