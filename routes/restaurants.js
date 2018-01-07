var express = require('express');
var router = express.Router();
var restaurant = require("../models/restaurant");


router.get("/", function (req, res) {
    res.redirect('/restaurant');
});

//--------------------------------------
//                  Index Route
//--------------------------------------
router.get("/restaurant", function (req, res) {
    //get all data from the mongoDB

    restaurant.find({}, function (err, allRestaurants) {
        if (err) {
            console.log(err);
        } else {
            res.render("restaurant/index", {restaurants: allRestaurants, currentUser: req.user});
        }
    })
});


//--------------------------------------
//                  New Route
//--------------------------------------
router.get("/restaurant/new",isLoggedIn, function (req, res) {

    res.render("restaurant/new");
});


//--------------------------------------
//                  Crete Route
//--------------------------------------
router.post("/restaurant",isLoggedIn, function (req, res) {
    //get post data from the "/restaurant index/ new"
    var name = req.body.name;
    var imageurl = req.body.image;
    var description = req.body.description;
    var author = {id: req.user._id, username: req.user.username}; // add the author



    var newRestaurant = {name: name, image: imageurl, description: description, author: author};

    restaurant.create(newRestaurant, function (err, thisRestaurant) {
        if (err) {
            console.log(err);
            res.redirect('/')
        }
        res.redirect("/");
    });
});

//--------------------------------------
//                  Show Route
//--------------------------------------
router.get('/restaurant/:id', function (req, res) {
    /*
    MongoDB has the join-like $lookup aggregation operator in versions >= 3.2.
    Mongoose has a more powerful alternative called populate(), which lets you
    reference documents in other collections.
    * */ // pop object
    // comments is in the restaurant, not the name of the comment db
    restaurant.findById(req.params.id).populate("comments").exec(function (err, thisResraurant) {
       // console.log(thisResraurant);
        if (err) {
            console.log(err);
        } else {
            res.render("restaurant/show", {restaurant: thisResraurant});
        }
    })

});


//middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();

    }

    res.redirect('/login');
}


module.exports = router;