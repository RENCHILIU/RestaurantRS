var express = require('express');
var router = express.Router();
var restaurant = require("../models/restaurant");
var comment = require("../models/comment");


//--------------------------------------
//        new Route  (nest Routes)
//--------------------------------------
router.get('/restaurant/:id/comments/new', isLoggedIn, function (req, res) {
    restaurant.findById(req.params.id, function (err, foundRestaurant) {
        if (err) {
            console.log(err);
            res.render("error", {err: err});
        } else {
            res.render('comment/new', {restaurant: foundRestaurant});
        }
    });

});


//--------------------------------------
//        create Route  (nest Routes)
//--------------------------------------
router.post('/restaurant/:id/comments', isLoggedIn, function (req, res) {
    restaurant.findById(req.params.id).populate("comments").exec(function (err, foundRestaurant) {
        if (err) {
            console.log(err);
            res.redirect('/restaurant');
        } else {

            comment.create(req.body.comment, function (err, createdComment) {
                // console.log(createdComment);
                if (err) {
                    console.log(err);
                } else {
                    // console.log(foundRestaurant);

                    // console.log(req.user);
                    createdComment.author.username = req.user.username; // when logged in ,get username form auth
                    createdComment.author.id = req.user._id;


                    foundRestaurant.comments.push(createdComment);
                    foundRestaurant.save();
                     // console.log(createdComment);
                    res.redirect('/restaurant/' + req.params.id);
                }
            })
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