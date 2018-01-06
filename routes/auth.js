



var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require("../models/user.js");

//--------------------------------------
//                  Auth Route
//--------------------------------------
router.get('/register', function (req, res) {
    res.render('auth/register');
});
// handle user sign up
router.post('/register', isRegister, function (req, res) {

    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {

        if (err) {
            console.log(err);
            res.render('auth/register');
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/");
        })
    })


});

function isRegister(req, res, next) {
    var name = req.body.username;
    // var user = User.find({ 'username': username });

    User.find({ 'username': name },function (err,foundUser) {

        if(foundUser.length != 0){
            console.log(foundUser);
            //don't register
            console.log("already register!")
            res.redirect('/register');
        }else{
            return next();
            //go to register
        }
    });
}


router.get('/login', function (req, res) {
    res.render('auth/login');
});


// middleware  , before the call back function
//passport.use(new LocalStrategy(User.authenticate()));
router.post('/login', passport.authenticate("local", {
    successRedirect: '/',
    failureRedirect: '/login'
}), function (req, res) {
    console.log(req.body);
});


//log out
router.get('/logout', function (req, res) {
    req.logout(); // dont track the session
    console.log("log out")
    res.redirect('/');
});



module.exports = router;