import { url } from './urls.js';
import * as dom from './dom.js';
import { createFaveBtn, createMovieElement, createDeleteBtn, createFavoriteMovieElement, createEditBtn, createUserMovieElement } from './functions.js';
import { editMovie, removeFave, removeUser } from './edit-movies.js';

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
        showFaves(data);
    } catch (e) {
        console.log(e.message);
    }
};
export const getUsers = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        showUsers(data);
    } catch (e) {
        console.log(e.message);
    }
};

export const showMovies = (movies) => {
    dom.main.innerHTML = '';
    movies.forEach(movie => {
        const { title, id, poster_path, vote_average, overview } = movie;
        const faveBtn = createFaveBtn(movie);
        const movieElement = createMovieElement(vote_average, poster_path, title, overview);
        movieElement.appendChild(faveBtn);
        dom.main.appendChild(movieElement);
    });
};
export const showFaves = (movies) => {
    dom.main.innerHTML = '';
    movies.forEach(movie => {
        const { title, id, poster_path, vote_average, overview } = movie;
        const movieElement = createFavoriteMovieElement(vote_average, poster_path, title, overview);
        const deleteBtn = createDeleteBtn(id);
        movieElement.appendChild(deleteBtn);
        deleteBtn.addEventListener('click', () => {
            removeFave(id);
            getFaves(url.local);
        });
        dom.main.appendChild(movieElement);
    });
};

export const showUsers = (movies) => {
    dom.main.innerHTML = '';
    movies.forEach(movie => {
        const { title, id, poster_path, vote_average, overview } = movie;
        const movieElement = createUserMovieElement(vote_average, title, overview);
        const average = Math.round(vote_average);
        const faveBtn = createFaveBtn(movie, movieElement);
        const deleteBtn = createDeleteBtn(faveBtn, id);
        const editBtn = createEditBtn(movieElement);
        movieElement.appendChild(faveBtn);
        movieElement.appendChild(deleteBtn);
        deleteBtn.addEventListener('click', () => {
            removeUser(id);
            getUsers(url.userLocal);
        });
        movieElement.appendChild(editBtn);
        dom.main.appendChild(movieElement);
        const editTitleInput = movieElement.querySelector('#edit-title-input');
        const editRatingInput = movieElement.querySelector('#edit-rating-input');
        const editOverviewInput = movieElement.querySelector('#edit-overview-input');
        const editGenreInput = movieElement.querySelector('#edit-genre-input');
        const editSubmitBtn = movieElement.querySelector('#edit-user-input-btn');
        editSubmitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (editTitleInput.value !== '' && editOverviewInput.value !== '') {
                let movie = {
                    rating: parseFloat(editRatingInput.value),
                    title: editTitleInput.value,
                    poster_path: `${url.userPoster}`,
                    vote_average: parseFloat(editRatingInput.value),
                    overview: editOverviewInput.value,
                    genre_ids: parseFloat(editGenreInput.value)
                };
                console.log('event fired');
                console.log(id);
                console.log(movie);
                editMovie(id, movie);
            } else {
                console.log('Title and Overview required');
            }
        });
    });
};