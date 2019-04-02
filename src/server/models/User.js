const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Recipe = require("./Recipes.js");
let UserSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        recipes: [{type: Schema.Types.ObjectId, ref: 'Recipe'}]
    }
);

module.exports = mongoose.model('User', UserSchema);
