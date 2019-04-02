
var mongoose = require('mongoose');
require('./../models/Recipes');
const Recipes = mongoose.model('Recipe');

function searchRecipes (req, res){
    const data = req.body.query.split(" ");
    let toBeReturned = []
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
                            if (toBeReturned.includes(recipe)){
                                console.log("already contains recipe: ", recipe.name);
                            }
                            else {
                                toBeReturned.push(recipe)
                            }
                            //console.log(recipe.name, " has the ingredient ", search);
                        }
                    });         
                });
            }
            else{
                console.log("ingredients not defined");
            }
        });
        //TODO: rank results in order of best match to least match
        let bestResults = [];



        //reorder results
        //toBeReturned = bestResults;

    })
    setTimeout(() =>{
        console.log("toBeReturned length: ", toBeReturned.length)
        return res.send(toBeReturned);
    }, 3000)
}





module.exports = {
    searchRecipes: searchRecipes
}