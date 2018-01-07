var mongoose = require('mongoose');
var commentSchema = new mongoose.Schema({
    text: String,
    author:
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
        }
});

var comment = mongoose.model("comment", commentSchema);

//
// restaurant.create( {
//     name: "Pappas Bros. Steakhouse",
//     image: "https://s3-media1.fl.yelpcdn.com/bphoto/pJjvgTwcEvUcofvyA0r-zQ/o.jpg",
//     description: "this is a description for the res!!!"
// });
module.exports = comment;