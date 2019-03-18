const user = require('./user')
//const User = require("../models/User").User;
const search = require("./search")

module.exports = (router) => {
    user(router);
    search(router);
};
