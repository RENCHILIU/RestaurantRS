
// need input the model
var restaurant = require("../models/restaurant");
var comment = require("../models/comment");


//all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCommentOwnership = function (req, res, next) {
    // is logged in or not
    // does user own this model ?
    if (req.isAuthenticated()) {
        comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                console.log(err);
                res.redirect("back")
            } else {
                // foundRestaurant.author.id is an object
                // req.user._id is a String       cannot use == or  ===
                // mongoose provide the method equals()
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back")
                }
            }
        })
    } else {
        res.redirect("back")
    }
};
middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();

    }

    res.redirect('/login');
};


// middleware
middlewareObj.checkRestaurantOwnership = function(req,res,next) {
    // is logged in or not
    // does user own this model ?
    if(req.isAuthenticated()){
        restaurant.findById(req.params.id, function (err, foundRestaurant) {
            if (err) {
                console.log(err);
                res.redirect("back")
            } else {
                // foundRestaurant.author.id is an object
                // req.user._id is a String       cannot use == or  ===
                // mongoose provide the method equals()
                if(foundRestaurant.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back")
                }
            }
        })
    }else{
        res.redirect("back")
    }
};







module.exports = middlewareObj;