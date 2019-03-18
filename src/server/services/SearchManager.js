
var mongoose = require('mongoose');
// require('./../models/Recipes');
const Recipes = mongoose.model('Recipe');

function searchRecipes (req, res){
    const data = req.body;
    Recipes.find().then(success=>{
        console.log(success);
    })
    return res.send("HELLO");
    // console.log("data in SearchManager: ", data);
    // return res.json({recipe: "dummy recipe"});
}





module.exports = {
    searchRecipes: searchRecipes
}