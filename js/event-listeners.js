import { keys } from './keys.js';
import { url } from './urls.js';
import * as dom from './dom.js';
import { addUser } from './post-movies.js';
import { getFaves, getMovies, getUsers } from './get-movies.js';
import { resetSelect } from './functions.js';

export const searchEventListener = () => {
    dom.searchInputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = dom.searchInput.value;
        if (searchTerm && searchTerm !== '') {
            getMovies(url.search + searchTerm);
            dom.searchInput.value = '';
        } else {
            window.location.reload();
        }
    });
};
export const sortByEventListener = () => {
    dom.sortBy.addEventListener('change', async (e) => {
        e.preventDefault();
        let sorted = '';
        switch (dom.sortBy.value) {
            case 'popular':
            case 'top_rated':
            case 'now_playing':
            case 'upcoming':
                sorted = `https://api.themoviedb.org/3/movie/${dom.sortBy.value}?api_key=${keys.tmdbV3}&language=en-US&page=1`;
                break;
            case 'favorites':
                await getFaves(url.local);
                break;
            case 'user':
                await getUsers(url.userLocal);
                break;
        }
        await getMovies(sorted);
    });
};
export const overlayEventListener = () => {
    dom.overlay.addEventListener('click', (e) => {
        dom.modal.classList.toggle('hidden');
        dom.overlay.classList.toggle('hidden');
        dom.body.style.overflow = 'auto';
    });
};
export const addMovieBtnEventListener = () => {
    dom.addMovieBtn.addEventListener('click', (e) => {
        e.preventDefault();
        dom.titleInput.innerText = '';
        dom.overviewInput.innerText = '';
        dom.modal.classList.toggle('hidden');
        dom.overlay.classList.toggle('hidden');
        if (!dom.modal.classList.contains('hidden')) {
            // Disable scroll
            dom.body.style.overflow = 'hidden';
        } else {
            // Enable scroll
            dom.body.style.overflow = 'auto';
        }
    });
};
export const userSubmitBtnEventListener = () => {
    dom.userSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('event fired');
        if (dom.titleInput.value !== '' && dom.overviewInput.value !== '') {
            let movie = {
                rating: parseFloat(dom.ratingInput.value),
                title: dom.titleInput.value,
                poster_path: './img/userPoster.png',
                vote_average: parseFloat(dom.ratingInput.value),
                overview: dom.overviewInput.value,
                genre_ids: parseFloat(dom.genreInput.value)
            };
            dom.modal.classList.toggle('hidden');
            dom.overlay.classList.toggle('hidden');
            addUser(movie);
            dom.sortBy.value = 'user';
            dom.sortBy.dispatchEvent(new Event('change'));
        } else {
            console.log('Title and Overview required');
        }
        dom.titleInput.innerText = '';
        dom.overviewInput.innerText = '';
    });
};
export const returnHomeEventListener = () => {
    dom.homeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resetSelect();
    });
};

