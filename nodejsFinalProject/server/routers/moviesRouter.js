const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const moviesBLL = require('../BLL/moviesBLL')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
const upload = multer({ storage})


router.get('/', async (req, res) => {
    let token = req.headers['x-access-token']
    let response = await moviesBLL.getAllMovies(token)
    res.send(response)
})

router.get('/userMovies', async (req, res) => {
    let token = req.headers['x-access-token']
    let user_id = req.headers['user_id']
    let response = await moviesBLL.getUserMovies(token, user_id)
    res.send(response)

})

router.post('/',upload.single('movie_poster'),async (req, res) => {
    let token = req.headers['x-access-token'];
    let movie = req.body;
    movie.movie_poster = req.file.filename;
    let response = await moviesBLL.addNewMovie(token, movie);
    res.send(response);

})

router.put('/:id', async (req, res) => {
  let token = req.headers['x-access-token'];
  let movie = req.body;
  let movieId = req.params.id
  let response = await moviesBLL.updateMovie(token, movie, movieId);
  res.send(response);
})



module.exports = router