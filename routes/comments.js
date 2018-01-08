var express = require('express');
var router = express.Router();
var restaurant = require("../models/restaurant");
var comment = require("../models/comment");
var middlewareObj = require("../middleware");


//--------------------------------------
//        new Route  (nest Routes)
//--------------------------------------
router.get('/restaurant/:id/comments/new', middlewareObj.isLoggedIn, function (req, res) {
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
router.post('/restaurant/:id/comments', middlewareObj.isLoggedIn, function (req, res) {
    restaurant.findById(req.params.id,function (err, foundRestaurant) {
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
                    createdComment.save();

                    foundRestaurant.comments.push(createdComment._id);
                    foundRestaurant.save();
                    // console.log(foundRestaurant);
                    res.redirect('/restaurant/' + req.params.id);
                }
            })
        }
    })



});


//--------------------------------------
//        edit Route  (nest Routes)
//--------------------------------------
router.get("/restaurant/:id/comments/:comment_id/edit", middlewareObj.checkCommentOwnership,function (req, res) {
    comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
            console.logout(err);
            res.redirect("back");
        } else {
            res.render('comment/edit', {restaurant_id: req.params.id, comment: foundComment});
        }
    });

});

//--------------------------------------
//        update Route  (nest Routes)
//--------------------------------------
router.put("/restaurant/:id/comments/:comment_id",middlewareObj.checkCommentOwnership, function (req, res) {

   comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function (err, updatedComment) {
       if(err){
           res.redirect("back");
       }else{
           // console.log(updatedComment);
           res.redirect("/restaurant/"+req.params.id);

       }
   })
});

//--------------------------------------
//        delete Route  (nest Routes)
//--------------------------------------
router.delete("/restaurant/:id/comments/:comment_id",middlewareObj.checkCommentOwnership, function (req, res) {

    comment.findByIdAndRemove(req.params.comment_id,function (err) {

        if(err){
            console.log(err);
        }else{
            res.redirect("/restaurant/"+req.params.id);
        }
    })

});












module.exports = router;