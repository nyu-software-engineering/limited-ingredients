// const Recipes = require('./../models/Recipes');
const data = require('./data.json')
var mongoose = require('mongoose');
Recipe = require('./../models/Recipes');
//var bulk = Recipe.initializeUnorderedBulkOp();
const Recipes = mongoose.model('Recipe');
// data.forEach(rec=>{
//     console.log(rec);
//     let recipe = new Recipes(rec);
//     recipe.save()
//     .then((err,success)=>{
//         if(err){console.log(err)}
//         console.log(success);
//     })
// })
/*
const recipe = new Recipes({
    recipes:data
})

recipe.save().then(err=>{console.log(err)})
*/
allRecipes = [];
data.forEach(recipe => {
    let myRecipe = new Recipes(recipe);
    allRecipes.push(myRecipe);
});
Recipes.insertMany(allRecipes, function (err, success){
    if (err){
        console.log(err);
    }
    else{
        console.log("success saving recipes");
    }
})