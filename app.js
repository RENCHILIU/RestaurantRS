var express = require('express'),
    bodyParse = require('body-parser'),
    mongoose = require('mongoose'),
    app = express(),
    restaurant = require('./models/restaurant'),
    comment = require('./models/comment'),
    seedDB = require("./seeds"),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    User = require("./models/user.js"),
    methodOverride = require("method-override"),
    flash = require('connect-flash');




//---------------------------------------------
// configure
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParse.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());
//---------------------------------------------


// mongoose.Promise = global.Promise;

//---------------------------------------------
// passport configuration
app.use(require('express-session')({
    secret: "Vincent is a handsome guy",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//---------------------------------------------


// seedDB();

//---------------------------------------------
// mongodb connect
mongoose.connect("mongodb://localhost/restaurants");
//---------------------------------------------






//---------------------------------------------
// check user
// every page can access the user info , in order to auth
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    // console.log(req.user);
    next();
});
//---------------------------------------------





//---------------------------------------------
// Route  !!!! must follow the method above!!!!
var commentRoutes    = require("./routes/comments"),
    restaurantRoutes = require("./routes/restaurants"),
    authRoutes       = require("./routes/auth");

app.use(commentRoutes);

app.use(restaurantRoutes);
// app.use("/restaurant",restaurantRoutes);
// this means all start with /restaurant
// if there is param in the url. need add
// """ var router = express.Router({mergeParams: true}); """
// in the router


app.use(authRoutes);
//---------------------------------------------




app.listen(3000, function () {
    console.log("connected to the port:3000");
});