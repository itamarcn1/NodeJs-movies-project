const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
    "movie_name": {type:String, required: true},
    "date_of_broadcast": {type:String, required: true},
    "film_director": {type:String, required: true},
    "movie_length": {type:String, required: true},
    "movie_poster": {type:String, required: true},
    "user_id": {type:String}
}, {
    versionKey: false
})

const moviesModel = new mongoose.model("movie", moviesSchema, "movies")

module.exports = moviesModel;