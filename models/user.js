var mongoose = require('mongoose');

var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username:String,
    password:String
});


// User.serializeUser() User.deserializeUser()
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);