const User = require('./../models/User');
module.exports = {
	editUserPage: (req, res, next) => {
		return res.json({"message":"change this to render"});
	}, 
	helloWorld: (req, res, next) => {
    return res.send("<h2>Hello World</h2>");
  }
};