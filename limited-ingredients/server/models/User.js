const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema(
    {
        name: String,
    }
);
//UserSchema.methods.somAction = function () {
//    
//    return this.save()
//}

module.exports = mongoose.model('User', UserSchema);