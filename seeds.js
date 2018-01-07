var mongoose = require('mongoose'),
    restaurant = require("./models/restaurant"),
    comment = require("./models/comment");


var data = [
    {
        name: "Steak With Ginger Butter Sauce",
        image: "https://static01.nyt.com/images/2015/04/29/dining/steak-ginger-sauce/steak-ginger-sauce-articleLarge.jpg",
        description: "It would be hard to find a simpler meal than Mr. Claiborne’s hearty beef stew, which goes beautifully with buttered noodles and a stout glass of red wine. (Or, for the children, a glass of milk.) A small scattering of cloves adds a floral note to the gravy, augmented by just a little thyme, and the combination pairs beautifully with the carrots you add near the end of the cooking process, to prevent them from going mushy in the heat. Sprinkle chopped parsley over the finished dish, of course, a nod to the past that rewards in beauty and flavor alike."

    },
    {
        name: "Craig Claiborne's Beef Stew",
        image: "https://static01.nyt.com/images/2014/04/11/dining/beefstew/beefstew-articleLarge.jpg",
        description: "It would be hard to find a simpler meal than Mr. Claiborne’s hearty beef stew, which goes beautifully with buttered noodles and a stout glass of red wine. (Or, for the children, a glass of milk.) A small scattering of cloves adds a floral note to the gravy, augmented by just a little thyme, and the combination pairs beautifully with the carrots you add near the end of the cooking process, to prevent them from going mushy in the heat. Sprinkle chopped parsley over the finished dish, of course, a nod to the past that rewards in beauty and flavor alike."

    },
    {
        name: "Spicy Chickpeas With Ginger",
        image: "https://static01.nyt.com/images/2015/04/29/dining/spicy-chickpeas/spicy-chickpeas-articleLarge.jpg",
        description: "It would be hard to find a simpler meal than Mr. Claiborne’s hearty beef stew, which goes beautifully with buttered noodles and a stout glass of red wine. (Or, for the children, a glass of milk.) A small scattering of cloves adds a floral note to the gravy, augmented by just a little thyme, and the combination pairs beautifully with the carrots you add near the end of the cooking process, to prevent them from going mushy in the heat. Sprinkle chopped parsley over the finished dish, of course, a nod to the past that rewards in beauty and flavor alike."

    },
    {
        name: "Craig Claiborne's Beef Stew",
        image: "https://static01.nyt.com/images/2014/04/11/dining/beefstew/beefstew-articleLarge.jpg",
        description: "It would be hard to find a simpler meal than Mr. Claiborne’s hearty beef stew, which goes beautifully with buttered noodles and a stout glass of red wine. (Or, for the children, a glass of milk.) A small scattering of cloves adds a floral note to the gravy, augmented by just a little thyme, and the combination pairs beautifully with the carrots you add near the end of the cooking process, to prevent them from going mushy in the heat. Sprinkle chopped parsley over the finished dish, of course, a nod to the past that rewards in beauty and flavor alike."

    },
    {
        name: "Seared Steak",
        image: "https://static01.nyt.com/images/2017/06/30/dining/30COOKING-SLICED_STEAK1/30COOKING-SLICED_STEAK1-articleLarge.jpg",
        description: "It would be hard to find a simpler meal than Mr. Claiborne’s hearty beef stew, which goes beautifully with buttered noodles and a stout glass of red wine. (Or, for the children, a glass of milk.) A small scattering of cloves adds a floral note to the gravy, augmented by just a little thyme, and the combination pairs beautifully with the carrots you add near the end of the cooking process, to prevent them from going mushy in the heat. Sprinkle chopped parsley over the finished dish, of course, a nod to the past that rewards in beauty and flavor alike."

    },
    {
        name: "Braised Cube Steak",
        image: "https://static01.nyt.com/images/2014/06/05/dining/Braised-Cube-Steak/Braised-Cube-Steak-articleLarge.jpg",
        description: "It would be hard to find a simpler meal than Mr. Claiborne’s hearty beef stew, which goes beautifully with buttered noodles and a stout glass of red wine. (Or, for the children, a glass of milk.) A small scattering of cloves adds a floral note to the gravy, augmented by just a little thyme, and the combination pairs beautifully with the carrots you add near the end of the cooking process, to prevent them from going mushy in the heat. Sprinkle chopped parsley over the finished dish, of course, a nod to the past that rewards in beauty and flavor alike."

    }
];

function seedDB() {
    //remove all restaurant
    restaurant.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed restaurant!");

            // add a few restaurant

            // data.forEach(function (seed) {
            //     restaurant.create(seed, function (err, thisdata) {
            //         if (err) {
            //             console.log(err);
            //         } else {
            //             console.log("created a restaurant");
            //
            //             // comment.create({
            //             //     text: "this is a good place!! ",
            //             //     author: "John"
            //             // }, function (err, thiscomment) {
            //             //     if (err) {
            //             //         console.log(err);
            //             //     } else {
            //             //         thisdata.comments.push(thiscomment);
            //             //         thisdata.save();
            //             //         console.log("created a new comment")
            //             //
            //             //     }
            //             // })
            //         }
            //     })
            // })
        }
    });

}


module.exports = seedDB;

