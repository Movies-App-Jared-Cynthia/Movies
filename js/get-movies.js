import * as vars from "./movie-variables.js";
import { poster, local } from "./url.js";
import { displayFaves, showFavesBtn } from "./movie-variables.js";

export const getMovies = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        showMovies(data.results);
    } catch (e) {
        console.log(e);
    }
};

export const getFaves = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayFaves.innerHTML = "";
        showFaves(data);
    } catch (e) {
        console.log(e.message);
    }
};

export const showMovies = (movies) => {
    vars.main.innerHTML = "";
    movies.forEach(movie => {
        const { title, id, poster_path, vote_average, overview } = movie;
        const movieElement = document.createElement("div");
        const average = Math.round(vote_average);
        const favBtn = document.createElement("button");
        favBtn.classList.add("fav-btn");
        favBtn.innerHTML = `<i class="fa-sharp fa-solid fa-heart"></i>`;
        favBtn.addEventListener("click", () => {
            movieElement.classList.add('fave');
            addFave(movie);
        });
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
            <img src="${poster + poster_path}" alt="${title}}">
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
        vars.main.appendChild(movieElement);
    });
};

export const showFaves = (movies) => {
    vars.main.innerHTML = "";
    movies.forEach(movie => {
        const { title, id, poster_path, vote_average, overview } = movie;
        const movieElement = document.createElement("div");
        const average = Math.round(vote_average);
        const favBtn = document.createElement("button");
        favBtn.classList.add("fav-btn");
        favBtn.innerHTML = `<i class="fa-sharp fa-solid fa-heart"></i>`;
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML = `<i class="fa-solid fa-heart-crack"></i>`;
        favBtn.addEventListener("click", () => {
            addFave(movie);
        });
        favBtn.addEventListener("mouseenter", () => {
            favBtn.classList.toggle("hide");
        });
        deleteBtn.addEventListener('mouseleave', () => {
            favBtn.classList.toggle('hide');
        })
        deleteBtn.addEventListener("click", () => {
            displayFaves.innerHTML = "";
            removeFave(id);
            showFavesBtn.click();
            showFavesBtn.click();
        });
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
            <img src="${poster + poster_path}" alt="${title}}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${average}</span>
            </div>
            <div class="overview"> 
                <h3>Overview</h3>
                <span class="overview-card">${overview}</span>
            </div>
        `;
        movieElement.appendChild(deleteBtn);
        movieElement.appendChild(favBtn);
        vars.main.appendChild(movieElement);
    });
};

// export const showFaves = (favorites) => {
//     vars.favoritesWrapper.innerHTML = "";
//     favorites.forEach(favorite => {
//         const { title, id, poster_path, vote_average, overview } = favorite;
//         const favoriteElement = document.createElement("div");
//         const average = Math.round(vote_average);
//         const deleteBtn = document.createElement("button");
//         deleteBtn.classList.add("delete-btn");
//         deleteBtn.innerHTML = `<i class="fa-solid fa-heart-crack"></i>`;
//         deleteBtn.addEventListener("click", () => {
//             displayFaves.innerHTML = '';
//             removeFave(id);
//             showFavesBtn.click();
//             showFavesBtn.click();
//         });
//         favoriteElement.classList.add("favorite");
//         favoriteElement.innerHTML = `
//             <img src="${poster + poster_path}" alt="${title}}">
//             <div class="favorite-info">
//                 <h3>${title}</h3>
//                 <span class="${getClassByRate(vote_average)}">${average}</span>
//             </div>
//             <div class="favorite-overview">
//                 <h3>Overview</h3>
//                 <span class="favorite-overview-card">${overview}</span>
//             </div>
//         `;
//         favoriteElement.appendChild(deleteBtn);
//         vars.displayFaves.appendChild(favoriteElement);
//     });
// };

export const addFave = async (movie) => {
    // const { id, title, rating } = movie;
    try {
        const url = local;
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

export const removeFave = async (id) => {
    try {
        if (!id) {
            throw new Error("Id required");
        }
        const url = `http://localhost:3000/favorites/${id}`;
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        };
        const res = await fetch(url, options);
        const data = await res.json();
        return data;
    } catch (e) {
        console.log(e.message);
    }

};

export const getClassByRate = (vote) => vote >= 8 ? "green" : vote >= 5 ? "orange" : "red";
