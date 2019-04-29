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
            const alreadySavedRecipe = user.recipes.includes('recipeId')
            console.log("user contains recipe? : ", alreadySavedRecipe);
            if (alreadySavedRecipe) {
                error.duplicate = "User already saved this recipe";
                res.status(300).json(error);
            } 
            else{
                user["recipes"].push(recipeId);
                user.save().then (user => {
                    res.json(user);
                    console.log(user);
                });
            }
        }
        else{
            console.log("could not find user");
            res.json("error- could not find user");
        }
    })
}
module.exports = {
    saveRecipe: saveRecipe
}