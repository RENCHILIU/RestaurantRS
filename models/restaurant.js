var mongoose = require('mongoose');
var restaurantSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }

    ]
});

var restaurant = mongoose.model("restaurant", restaurantSchema);

//
// restaurant.create( {
//     name: "Pappas Bros. Steakhouse",
//     image: "https://s3-media1.fl.yelpcdn.com/bphoto/pJjvgTwcEvUcofvyA0r-zQ/o.jpg",
//     description: "this is a description for the res!!!"
// });
module.exports = restaurant;