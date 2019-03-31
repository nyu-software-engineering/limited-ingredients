
var mongoose = require('mongoose');
require('./../models/Recipes');
const Recipes = mongoose.model('Recipe');

function searchRecipes (req, res){
    const data = req.body.query.split(" ");
    
    let toBeReturned = ""
    console.log("query: ", data);
    Recipes.find().then(success=>{
        console.log("success length, ", success.length);
        success.forEach (recipe => {
            let ingredients = JSON.parse("[" + recipe.ingredients + "]");
            //let ingredients = JSON.parse(recipe.ingredients)
            //console.log("type of ingredients[0]: ", typeof(ingredients[0]))
            //console.log("ingredients[0]", ingredients[0]);
            if (ingredients[0]){
                ingredients[0].forEach((ingredient) => {
                    //console.log("ingredient: ", ingredient)
                    
                    data.forEach(search => {
                        if (ingredient.includes(search)){
                            toBeReturned += recipe + "\n"
                            //console.log(recipe.name, " has the ingredient ", search);
                        }
                    })
                    
                    
                });
            }
            else{
                console.log("ingredients not defined");
            }
            
        });
        
    })
    setTimeout(() =>{
        console.log("toBeReturned: ", toBeReturned)
        return res.send(toBeReturned);

    }, 3000)
    // console.log("data in SearchManager: ", data);
    // return res.json({recipe: "dummy recipe"});
}





module.exports = {
    searchRecipes: searchRecipes
}