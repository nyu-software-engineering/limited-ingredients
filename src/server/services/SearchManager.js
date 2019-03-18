
var mongoose = require('mongoose');
require('./../models/Recipes');
const Recipes = mongoose.model('Recipe');

function searchRecipes (req, res){
    const data = req.body;
    let toBeReturned = ""
    Recipes.find().then(success=>{
        // console.log(success);
        success[0].recipes.forEach(bob=>{
            // console.log(bob.ingredients.split(" "));
            // console.log(data.query);
            if(bob.ingredients.split(" ").includes(data.query)){
                
                toBeReturned += bob.name + ","
                console.log(bob.name);
            }
                // if (bob.ingredients[0].includes(req.body)) {
                //     toBeReturned += bob.name + ","
                // }
            
            /*
            if(bob.ingredients.incudes(req.body)){
                toBeReturned += bob.name + ","

            }*/
        })
    })
    setTimeout(() =>{
        return res.send(toBeReturned);

    }, 3000)
    // console.log("data in SearchManager: ", data);
    // return res.json({recipe: "dummy recipe"});
}





module.exports = {
    searchRecipes: searchRecipes
}