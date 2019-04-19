var mongoose = require('mongoose');
const User = mongoose.model('User');

function getUserInfo(req,res){
    const userId = req.body.userId;
    const error = {};
    User.findOne({_id: userId}).then(user => {
        if (user){
            res.json(user);
        }
        else{
            error.error = "cannot find user";
            res.status(404).json(error);
        }
    });
}

module.exports = {
    findUser: getUserInfo
}