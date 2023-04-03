import { img_path, main } from "./movie-variables.js";

export const getMovies = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        showMovies(data.results);
    } catch (e) {
        console.log(e.message);
    }
};

const showMovies = (movies) => {
    main.innerHTML = "";
    movies.forEach(movie => {
        const { title, genre_ids, poster_path, vote_average, overview } = movie;
        const movieElement = document.createElement("div");
        const average = Math.round(vote_average);
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
        main.appendChild(movieElement);
    });
};

const getClassByRate = (vote) => vote >= 8 ? "green" : vote >= 5 ? "orange" : "red";

export { showMovies, getClassByRate };