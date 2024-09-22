

const setContainer = async () => {
    let { data: response } = await axios.get("http://localhost:3000/api/movies/userMovies",
        {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("token")),
                "user_id": JSON.parse(localStorage.getItem("user_id"))
            }
        })
    console.log(response);
    let container = document.getElementById("container")
    response.forEach(movie => {
        container.innerHTML += `
        <ul id="selected_movie_ul${movie._id}">
            <li>${movie.movie_name}</li>
            <li>${movie.date_of_broadcast}</li>
            <li>${movie.film_director}</li>
            <li>${movie.movie_length}</li>
            <li><img src="/uploads/${movie.movie_poster}" alt="Movie Poster" class="poster-image" ></li> 
            <li><button id="edit_movie_btn${movie._id}" onclick="edit_movie('${movie._id}')">edit</button></li>     
        </ul>
        `
        let movieId = movie.movie_id


    });
}

setContainer()




const add_movie = async () => {
    let movie_name = document.getElementById('movie_name').value
    let date_of_broadcast = document.getElementById('date_of_broadcast').value
    let film_director = document.getElementById('film_director').value
    let movie_length = document.getElementById('movie_length').value
    let movie_poster = document.getElementById('movie_poster').files[0]

    if (!movie_name || !date_of_broadcast || !film_director || !movie_length || !movie_poster) {
        alert("Please fill all the fields")
    } else {
        let { data: response } = await axios.post("http://localhost:3000/api/movies", {
            movie_name: movie_name,
            date_of_broadcast: date_of_broadcast,
            film_director: film_director,
            movie_length: movie_length,
            movie_poster: movie_poster,
            user_id: JSON.parse(localStorage.getItem("user_id"))
        }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "x-access-token": JSON.parse(localStorage.getItem("token")),
                    "user_id": JSON.parse(localStorage.getItem("user_id"))
                }
})
    alert(response)
    }
}



document.getElementById("submit_btn").addEventListener("click", add_movie)


const edit_movie = async (movieId) => {
    let { data: response } = await axios.get("http://localhost:3000/api/movies/userMovies",
        {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("token")),
                "user_id": JSON.parse(localStorage.getItem("user_id"))
            }
        })
    let movieToEdit;
    for (let i = 0; i < response.length; i++) {
        if (response[i]._id == movieId) {
            movieToEdit = response[i];
        }
    }
    if (movieToEdit) {
        movieId = movieToEdit._id
        let container = document.getElementById("container")
        container.innerHTML = `
    <input type="text" name="movie_name" value="${movieToEdit.movie_name}" id="movie_name">
    <input type="text" name="date_of_broadcast" value="${movieToEdit.date_of_broadcast}" id="date_of_broadcast">
    <input type="text" name="film_director" value="${movieToEdit.film_director}" id="film_director">
    <input type="text" name="movie_length" value="${movieToEdit.movie_length}" id="movie_length">
    <input type="file" name="movie_poster" id="movie_poster">
    <input type="submit" value="Submit" onclick="edit_movie_submit('${movieId}')">
    `
    } else {
        alert("problem with editing the movie, please try again later")
    }
}


const edit_movie_submit = async (movieId) => {
    console.log(movieId);
    let movie_name = document.getElementById('movie_name').value
    let date_of_broadcast = document.getElementById('date_of_broadcast').value
    let film_director = document.getElementById('film_director').value
    let movie_length = document.getElementById('movie_length').value
    let movie_poster = document.getElementById('movie_poster').files[0]
    console.log(movie_name);

    const { data: response } = await axios.put(
        `http://localhost:3000/api/movies/${movieId}`,
        {
            movie_name: movie_name,
            date_of_broadcast: date_of_broadcast,
            film_director: film_director,
            movie_length: movie_length,
            movie_poster: movie_poster,
        },
        {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": JSON.parse(localStorage.getItem("token")),
            },
        }
    );
    alert(response)
}






