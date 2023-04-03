import { img_path, main } from "./movie-variables.js";

export const getMovies = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        showMovies(data.results);
    } catch (e) {
        console.log(e);
    }
};

const showMovies = (movies) => {
    main.innerHTML = "";
    movies.forEach(movie => {
        const { title, id, poster_path, vote_average, overview } = movie;
        const movieElement = document.createElement("div");
        const average = Math.round(vote_average);
        const favBtn = document.createElement("button");
        favBtn.classList.add("fav-btn");
        favBtn.innerText = "+";
        favBtn.addEventListener("click", () => {
            const { title, id, poster_path, vote_average, overview } = movie;
            addMovie(movie);
        });
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
            <img src="${img_path + poster_path}" alt="${title}}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${average}</span>
            </div>
            <div class="overview"> 
                <h3>Overview</h3>
                <span class="overview-card">${overview}</span>
            </div>
        `;
        movieElement.appendChild(favBtn);
        main.appendChild(movieElement);
    });

};

const addMovie = async (movie) => {
    const { id, title, rating } = movie;
    try {
        const url = `http://localhost:3000/favorites`;
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movie)
        };
        let res = await fetch(url, options);
        let data = await res.json();
        return data;
    } catch (e) {
        console.log(e.message);
    }
};

const getClassByRate = (vote) => vote >= 8 ? "green" : vote >= 5 ? "orange" : "red";

export { showMovies, getClassByRate, addMovie };