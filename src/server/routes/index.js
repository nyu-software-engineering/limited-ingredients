const user = require('./user');
const search = require("./search");
const save = require("./save");

module.exports = (router) => {
    user(router);
    search(router);
    save(router);
    
};
