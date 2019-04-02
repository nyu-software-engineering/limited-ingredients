// const Recipes = require('./../models/Recipes');
const data = require('./data.json')
var mongoose = require('mongoose');
Recipe = require('./../models/Recipes');
//var bulk = Recipe.initializeUnorderedBulkOp();
const Recipes = mongoose.model('Recipe');
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
        console.log(success);
    }
});