const mongoose = require('mongoose');

let RecipeSchema = new mongoose.Schema(
    {
        //recipes:[],
        nutrition: {type: Object, required: true},
        directions: {type: Array , required: true},
        totalTime: {type: String, required: true}, 
        imageURL: {type: String, required: true},
        name: {type: String, required: true},
        cookTime: {type: String, required: true},
        ingredients: {type: Array, required: true},
        URL: {type: String, required: true},
        prepTime: {type: String, required: true}
    }
);

mongoose.model('Recipe', RecipeSchema);
const url = "mongodb://localhost:27017/limitedIngredients";
mongoose.connect(url);

module.exports = mongoose.model("Recipe", RecipeSchema);