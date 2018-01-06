


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
            res.render("error");
        } else {
            res.render("restaurant/index", {restaurants: allRestaurants, currentUser: req.user});
        }
    })
});


//--------------------------------------
//                  New Route
//--------------------------------------
router.get("/restaurant/new", function (req, res) {

    res.render("restaurant/new");
});


//--------------------------------------
//                  Crete Route
//--------------------------------------
router.post("/restaurant", function (req, res) {
    //get post data from the "/restaurant index/ new"
    var name = req.body.name;
    var imageurl = req.body.image;
    var description = req.body.description;
    var newRestaurant = {name: name, image: imageurl, description: description};

    restaurant.create(newRestaurant, function (err, thisRestaurant) {
        if (err) {
            console.log(err);
            res.render("error", {err: err});
        }
        res.redirect("restaurant/index");
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
    * */
    restaurant.findById(req.params.id).populate("comments").exec(function (err, thisResraurant) {
        if (err) {
            console.log(err);
            res.render("error", {err: err});
        } else {
            // console.log(thisResraurant);
            res.render("restaurant/show", {restaurant: thisResraurant});
        }
    })

});
module.exports = router;