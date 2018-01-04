var express = require('express'),
bodyParse   = require('body-parser'),
app         = express();


app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParse.urlencoded({extended:true}));



app.get("/", function (req, res) {
    res.render("index");
});

var restaurants = [
    {
        name: "Pappas Bros. Steakhouse",
        image: "https://s3-media1.fl.yelpcdn.com/bphoto/pJjvgTwcEvUcofvyA0r-zQ/o.jpg"
    },
    {
        name: "Pappas Bros. Steakhouse",
        image: "https://s3-media2.fl.yelpcdn.com/bphoto/U5rcSL8TYjLQqqHZPAU7VQ/o.jpg"
    }, {
        name: "Pappas Bros. Steakhouse",
        image: "https://s3-media3.fl.yelpcdn.com/bphoto/H7S8NkBxLklXDZir9sIlVg/o.jpg"
    },
    {
        name: "Pappas Bros. Steakhouse",
        image: "https://s3-media1.fl.yelpcdn.com/bphoto/pJjvgTwcEvUcofvyA0r-zQ/o.jpg"
    }, {
        name: "Pappas Bros. Steakhouse",
        image: "https://s3-media1.fl.yelpcdn.com/bphoto/pJjvgTwcEvUcofvyA0r-zQ/o.jpg"
    },
    {
        name: "Pappas Bros. Steakhouse",
        image: "https://s3-media2.fl.yelpcdn.com/bphoto/U5rcSL8TYjLQqqHZPAU7VQ/o.jpg"
    }, {
        name: "Pappas Bros. Steakhouse",
        image: "https://s3-media1.fl.yelpcdn.com/bphoto/pJjvgTwcEvUcofvyA0r-zQ/o.jpg"
    },
    {
        name: "Pappas Bros. Steakhouse",
        image: "https://s3-media1.fl.yelpcdn.com/bphoto/pJjvgTwcEvUcofvyA0r-zQ/o.jpg"
    }
];

app.get("/restaurantList", function (req, res) {


    res.render("restaurantList",{restaurants:restaurants})
});


// create Route

app.get("/restaurantList/new", function (req, res) {

    res.render("newRestaurant");
});






app.post("/restaurantList",function (req, res) {

    //get data from the "/restaurantList/new"

    var name = req.body.name;
    var imageurl = req.body.image;
    var newRestaurant = {name:name,image:imageurl};
    restaurants.push(newRestaurant);

    res.redirect("/restaurantList");




});





app.listen(3000, function () {
    console.log("connected to the port:3000");
});