
function searchRecipes (req, res){
    const data = req.body;
    console.log("data in SearchManager: ", data);
    return res.json({recipe: "dummy recipe"});
}





module.exports = {
    searchRecipes: searchRecipes
}