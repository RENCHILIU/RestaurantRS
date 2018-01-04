var express = require('express'),
    bodyParse = require('body-parser'),
    mongoose = require('mongoose'),
    app = express();


app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParse.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/restaurants");

var restaurantSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var restaurant = mongoose.model("restaurant", restaurantSchema);


//
// restaurant.create( {
//     name: "Pappas Bros. Steakhouse",
//     image: "https://s3-media1.fl.yelpcdn.com/bphoto/pJjvgTwcEvUcofvyA0r-zQ/o.jpg",
//     description: "this is a description for the res!!!"
// });


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
            res.render("restaurantList", {restaurants: allRestaurants});
        }
    })
});


//--------------------------------------
//                  New Route
//--------------------------------------
app.get("/restaurant/new", function (req, res) {

    res.render("newRestaurant");
});


//--------------------------------------
//                  Crete Route
//--------------------------------------
app.post("/restaurant", function (req, res) {
    //get post data from the "/restaurantList/new"
    var name = req.body.name;
    var imageurl = req.body.image;
    var description = req.body.description;
    var newRestaurant = {name: name, image: imageurl,description:description};

    restaurant.create(newRestaurant, function (err, thisRestaurant) {
        if (err) {
            console.log(err);
            res.render("error", {err: err});
        }
        res.redirect("restaurantList");
    });
});

//--------------------------------------
//                  Show Route
//--------------------------------------
app.get('/restaurant/:id',function (req, res) {
    restaurant.findById(req.params.id ,function (err, thisResraurant) {
        if(err){
            console.log(err);
            res.render("error", {err: err});
        }else{
            res.render("showRestaurant",{restaurant:thisResraurant});
        }
    })

});

















app.listen(3000, function () {
    console.log("connected to the port:3000");
});