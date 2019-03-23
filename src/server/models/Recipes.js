const mongoose = require('mongoose');

let RecipeSchema = new mongoose.Schema(
    {
        recipes:[],
    }
);

mongoose.model('Recipe', RecipeSchema);
const url = "mongodb://localhost:27017/limitedIngredients";
mongoose.connect(url);
