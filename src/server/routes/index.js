const user = require('./user');
const search = require("./search");
const save = require("./save");
const deleteRecipe = require("./delete");

module.exports = (router) => {
    user(router);
    search(router);
    save(router);
    deleteRecipe(router);
    
};
