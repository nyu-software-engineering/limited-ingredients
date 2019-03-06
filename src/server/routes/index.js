const user = require('./user')
const User = require("../models/User").User;

module.exports = (router) => {
    user(router);
};
