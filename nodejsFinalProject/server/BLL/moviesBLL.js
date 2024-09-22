const moviesModel = require("../models/moviesModel")
const jwt = require("jsonwebtoken")
const env = require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY


const getAllMovies = async (token) => {
    if (!token) {
        return "token not provided"
    }
    else {
        try {
            let response = jwt.verify(token, SECRET_KEY)
            if (response) {
                let movies = await moviesModel.find({})
                return movies
            } else {
                return "movies not found"
            }
        }
        catch (err) {
            return "tokens not valid"
        }
    }
}

const getUserMovies = async (token, user_id) => {
    if (!token) {
        return "token not provided"
    }
    else {
        try {
            let response = jwt.verify(token, SECRET_KEY)
            if (response) {
                let movies = await moviesModel.find({ user_id: user_id })
                return movies
            } else {
                return "movies not found"
            }
        }
        catch (err) {
            return "tokens not valid"
        }
    }
}


const addNewMovie = async (token, movie) => {
    if (!token) {
        return "token not provided"
    }
    else {
        try {
            let response = jwt.verify(token, SECRET_KEY)
            if (response) {
                try {
                    let newMovie = await moviesModel(movie)
                    console.log(newMovie);
                    await newMovie.save()
                    return "new movie added successfully!"

                } catch (err) {
                    console.log("error in saving movie");
                }
            } else {
                return "problem with adding the movie, try again later"
            }
        }
        catch (err) {
            return "tokens not valid"
        }
    }

}

const updateMovie = async (token, movie, movieId) => {
    if (!token) {
        return "token not provided"
    }
    else {
        try {
            let response = jwt.verify(token, SECRET_KEY)
            if (response) {
                try {
                    console.log(movie);
                    await moviesModel.findByIdAndUpdate(movieId, movie)
                    return "updatedMovie"
                } catch (err) {
                    console.log("error in updating movie");
                }
            } else {
                return "problem with updating the movie, try again later"
            }
        }
        catch (err) {
            return "tokens not valid"
        }
    }


}




module.exports = {
    getAllMovies,
    getUserMovies,
    addNewMovie,
    updateMovie
}