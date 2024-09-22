

const setContainer = async () => {
    let { data: response } = await axios.get("http://localhost:3000/api/movies",
        {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": JSON.parse(localStorage.getItem("token"))
            }
        })
    console.log(response);
    let container = document.getElementById("container")
    response.forEach(movie => {
        container.innerHTML += `
        <ul>
            <li>${movie.movie_name}</li>
            <li>${movie.date_of_broadcast}</li>
            <li>${movie.film_director}</li>
            <li>${movie.movie_length}</li>
            <li><img src="/uploads/${movie.movie_poster}" alt="Movie Poster" class="poster-image" ></li>      
        </ul>
        `
    });
}

setContainer()