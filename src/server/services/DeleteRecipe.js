var mongoose = require('mongoose');
require('./../models/User');
const User = mongoose.model('User');

function deleteRecipe(req,res){
    User.findOne({_id: req.body.userId}).then(user => {
        if (user){
            const convertToId = mongoose.Types.ObjectId(req.body.recipeId);
            user.recipes.remove(convertToId);
            user.save().then(user => {
                console.log(user);
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