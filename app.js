var express     = require('express'),
    bodyParse   = require('body-parser'),
    mongoose    = require('mongoose'),
    app         = express(),
    restaurant  = require('./models/restaurant'),
    comment     = require('./models/comment'),
    seedDB      = require("./seeds");


app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParse.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/restaurants");


seedDB();




app.get("/", function (req, res) {
    res.render("index");
});


//--------------------------------------
//                  Index Route
//--------------------------------------
app.get("/restaurant", function (req, res) {
    //get all data from the mongoDB

    restaurant.find({}, function (err, allRestaurants) {
        if (err) {
            console.log(err);
            res.render("error");
        } else {
            res.render("restaurant/index", {restaurants: allRestaurants});
        }
    })
});


//--------------------------------------
//                  New Route
//--------------------------------------
app.get("/restaurant/new", function (req, res) {

    res.render("restaurant/new");
});


//--------------------------------------
//                  Crete Route
//--------------------------------------
app.post("/restaurant", function (req, res) {
    //get post data from the "/restaurant index/ new"
    var name = req.body.name;
    var imageurl = req.body.image;
    var description = req.body.description;
    var newRestaurant = {name: name, image: imageurl,description:description};

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
app.get('/restaurant/:id',function (req, res) {
    /*
    MongoDB has the join-like $lookup aggregation operator in versions >= 3.2.
    Mongoose has a more powerful alternative called populate(), which lets you
    reference documents in other collections.
    * */
    restaurant.findById(req.params.id).populate("comments").exec(function (err, thisResraurant) {
        if(err){
            console.log(err);
            res.render("error", {err: err});
        }else{
            // console.log(thisResraurant);
            res.render("restaurant/show",{restaurant:thisResraurant});
        }
    })

});


//--------------------------------------
//       nest Routes-  new Route
//--------------------------------------
app.get('/restaurant/:id/comments/new',function (req,res) {
    restaurant.findById(req.params.id,function (err, foundRestaurant) {
        if(err){
            console.log(err);
            res.render("error", {err: err});
        }else{
            res.render('comment/new',{restaurant:foundRestaurant});
        }
    });

});




app.post('/restaurant/:id/comments',function (req, res) {
    restaurant.findById(req.params.id).populate("comments").exec(function (err, foundRestaurant) {
        if(err){
            console.log(err);
            res.redirect('/restaurant');
        }else{
            comment.create(req.body.comment,function (err,createdComment) {
                // console.log(createdComment);
                if(err){
                    console.log(err);
                }else {
                     console.log(foundRestaurant);
                    foundRestaurant.comments.push(createdComment);
                    foundRestaurant.save();
                    res.redirect('/restaurant/'+req.params.id);
                }
            })
        }
    })
});

















app.listen(3000, function () {
    console.log("connected to the port:3000");
});