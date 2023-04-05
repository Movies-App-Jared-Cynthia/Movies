import { url } from './urls.js';
import * as dom from './dom.js';
import { addFave } from './post-movies.js';
import { removeFave } from './edit-movies.js';

export const resetSelect = () => {
    dom.sortBy.value = 'popular';
    dom.sortBy.dispatchEvent(new Event('change'));
};
export const getClassByRate = (vote) => vote >= 8 ? 'green' : vote >= 5 ? 'orange' : 'red';
export const createMovieElement = (vote_average, poster_path, title, overview) => {
    const movieElement = document.createElement('div');
    const average = Math.round(vote_average);
    movieElement.classList.add('movie');
    movieElement.innerHTML = `
        <img src="${url.poster}${poster_path}" alt="${title}${'movie poster'}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${average}</span>
        </div>
        <div class="overview"> 
            <h3>Overview</h3>
            <span class="overview-card">${overview}</span>
        </div>
        `;
    return movieElement;
};
export const createUserMovieElement = (vote_average, title, overview) => {
    const movieElement = document.createElement('div');
    const average = Math.round(vote_average);
    movieElement.classList.add('movie');
    movieElement.innerHTML = `
        <img src="${url.userPoster}" alt="${title}${'movie poster'}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${average}</span>
        </div>
         <div class="overview">
                <h3>Overview</h3>
                <span class="overview-card">${overview}</span>
            </div>
            <div id="edit-card" class="edit-card">
                <button id="edit-card-close-btn"><i class="fa-solid fa-rectangle-xmark"></i></button>
                <form id="edit-user-inputs" action="">
                            <div class="input-wrapper span-column-2">
                            <label for="edit-title-input">Title:</label>
                            <input type="text" id="edit-title-input" required>
                            </div>
                            <div class="input-wrapper span-column-2">
                            <label for="edit-overview-input">Description:</label>
                            <textarea id="edit-overview-input" rows="5" cols="10" required></textarea>
                            </div>
                                <div class="input-wrapper">
                                    <label for="edit-rating-input">Rating</label>
                                     <select name="edit-rating-select" id="edit-rating-input">
                                <option value="1" id="edit-rating-option1">1</option>
                                <option value="2" id="edit-rating-option2">2</option>
                                <option value="3" id="edit-rating-option3">3</option>
                                <option value="4" id="edit-rating-option4">4</option>
                                <option value="5" id="edit-rating-option5">5</option>
                            </select>
                                </div>
                                <div class="input-wrapper">
                                    <label for="edit-genre-input">Genre</label>
                                    <select name="edit-genre-select" id="edit-genre-input">
                                <option value="28" id="edit-genre-option1">Action</option>
                                <option value="12" id="edit-genre-option2">Adventure</option>
                                <option value="16" id="edit-genre-option3">Animation</option>
                                <option value="35" id="edit-genre-option4">Comedy</option>
                                <option value="80" id="edit-genre-option5">Crime</option>
                                <option value="99" id="edit-genre-option6">Documentary</option>
                                <option value="18" id="edit-genre-option7">Drama</option>
                                <option value="10751" id="edit-genre-option8">Family</option>
                                <option value="14" id="edit-genre-option9">Fantasy</option>
                                <option value="36" id="edit-genre-option10">History</option>
                                <option value="27" id="edit-genre-option11">Horror</option>
                                <option value="10402" id="edit-genre-option12">Music</option>
                                <option value="9648" id="edit-genre-option13">Mystery</option>
                                <option value="10749" id="edit-genre-option14">Romance</option>
                                <option value="878" id="edit-genre-option15">Science Fiction</option>
                                <option value="10770" id="edit-genre-option16">TV Movie</option>
                                <option value="53" id="edit-genre-option17">Thriller</option>
                                <option value="10752" id="edit-genre-option18">War</option>
                                <option value="37" id="edit-genre-option19">Western</option>
                            </select>
                                </div>
                            <div class="button-wrapper span-column-2">
                            <button id="edit-user-input-btn" type="submit">Submit Your Movie</button>
                            </div>
        `;
    return movieElement;
};
export const createFavoriteMovieElement = (vote_average, poster_path, title, overview) => {
    const movieElement = document.createElement('div');
    const average = Math.round(vote_average);
    movieElement.classList.add('movie');
    movieElement.innerHTML = `
            <img src="${url.poster + poster_path}" alt="Movie poster for the movie ${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <span class="overview-card">${overview}</span>
            </div>
        `;
    return movieElement;
};
export const createFaveBtn = (movie, movieElement) => {
    const faveBtn = document.createElement('button');
    faveBtn.classList.add('fav-btn');
    faveBtn.innerHTML = `<i class="fa-sharp fa-solid fa-heart"></i>`;
    faveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(movie);
        addFave(url.local, movie);
    });
    return faveBtn;
};
export const createDeleteBtn = (id) => {
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = `<i class="fa-solid fa-heart-crack"></i>`;
    return deleteBtn;
};
export const createEditBtn = (movieElement) => {
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    editBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const editCard = movieElement.querySelector('#edit-card');
        editCard.classList.toggle('edit');
    });
    return editBtn;
};
