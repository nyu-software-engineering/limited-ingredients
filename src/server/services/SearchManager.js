
var mongoose = require('mongoose');
require('./../models/Recipes');
const Recipes = mongoose.model('Recipe');

function searchRecipes (req, res){
    const data = req.body.query.split(" ");
    
    let toBeReturned = ""
    console.log("query: ", data);
    Recipes.find().then(success=>{
        // console.log(success);
        //console.log(success[0].recipes.length)
        success[0].recipes.forEach(bob=>{
            // console.log(bob.ingredients.split(" "));
            /*
            if(bob.ingredients.split(" ").includes(data.query)){
                
                toBeReturned += bob.name + ","
                console.log(bob.name);
            }
            */
            //let ingredients = bob.ingredients.split(",")
            //let ingredients = JSON.stringify(bob.ingredients)
            let ingredients = JSON.parse("[" + bob.ingredients + "]");
            console.log("recipe: ")
            console.log("type of ingredients: ", typeof(ingredients[0]))
            //console.log("ingredients ", ingredients)
            //ingredients = ingredients[0].split(",")
            ingredients[0].forEach((ingredient) => {
                //console.log("ingredient: ", ingredient)
                if (ingredient.includes(data.query)){
                    toBeReturned += bob.name + ","
                    console.log(bob.name, " has the ingredient ", data.query);

                }
            })
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