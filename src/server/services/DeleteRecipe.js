var mongoose = require('mongoose');
require('./../models/User');
const User = mongoose.model('User');

function deleteRecipe(req,res){
    User.findOne({_id: req.body.userId}).then(user => {
        if (user){
            user.recipes.remove(req.body.recipe);
            user.save().then(user => {
                res.json(user);
            })
        }
        else{
            console.log("could not find user");
        }
    });
}
module.exports = {
    deleteRecipe: deleteRecipe
}