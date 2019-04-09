
var mongoose = require('mongoose');
require('./../models/Recipes');
const Recipes = mongoose.model('Recipe');

function searchRecipes (req, res){
    const data = req.body.query.split(" ");
    let toBeReturned = [];
    console.log("query: ", data);
    /*
    Recipes.find({
        ingredients: {$elemMatch: {$all: data }}
    }).exec(function (err, result) {
        if (err){
            console.log("err: ", err);
        }else {
            console.log("result: ", result[0]);
            toBeReturned.push(result);
            //return res.send(toBeReturned);
        }
    });
    */
    
    Recipes.find().then(success=>{
        console.log("success length, ", success.length);
        success.forEach (recipe => {
            if (recipe.ingredients){
                recipe.ingredients.forEach((ingredient) => {
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
                        //else, dont include recipe because it doesn't have this ingredient: exit loop?
                        else {

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