
var mongoose = require('mongoose');
require('./../models/Recipes');
const Recipes = mongoose.model('Recipe');

function makeQueryRecipeSearchQuery(recipeArray) {
    recipeArray.forEach(element => {
        recipeArray.push(element + ",");
    });
    $q = [{
        "$project": {
            "_id": 1,
            "URL": 1,
            "nutrition": 1,
            "directions": 1,
            "totalTime": 1,
            "imageURL": 1,
            "name": 1,
            "cookTime": 1,
            "ingredients": 1,
            "URL": 1,
            "imageURL": 1,
            "prepTime": 1,
            "matchPerc": { 
                "$cond": [ { "$eq": [ {"$size": "$ingredients"}, 0 ] }, 0, 
                    {
                        "$divide": [{ "$size": {
                            "$setIntersection": [{
                                "$split": [{
                                    "$reduce": {
                                        "input": "$ingredients",
                                        "initialValue": '',
                                        "in": { "$concat": ["$$value", "$$this"] }
                                    }
                                }, " "]
                            }, recipeArray]
                        }},{"$size": "$ingredients"}]
                    } ]
            }
        }
    },{
        "$sort": {
            "matchPerc": -1
        }
    },{
        "$limit": 5
    }];
    return $q
}


function searchRecipes(req, res) {
    const data = req.body.query.split(" ");
    console.log("query on server: ", data);
    const query = makeQueryRecipeSearchQuery(data);
    Recipes.aggregate(query, (err, results) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        return res.send(results);
    });
}


module.exports = {
    searchRecipes: searchRecipes
}
