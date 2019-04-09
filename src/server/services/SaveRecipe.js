var mongoose = require('mongoose');
//require('./../models/Recipes');
require('./../models/User');
//const Recipes = mongoose.model('Recipe');
const User = mongoose.model('User');

function saveRecipe (req, res){
    const recipe = req.body.recipe;
    const userId = req.body.userId;
    User.findOne({_id: userId}).then (user => {
        if (user){
            console.log("user: ", user);
            //console.log("found user!");
            user["recipes"].push(recipe);
            user.save().then (user => {
                res.json(user);
                console.log(user);
            });
        }
        else{
            console.log("could not find user");
        }
    })
}
module.exports = {
    saveRecipe: saveRecipe
}