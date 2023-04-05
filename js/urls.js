import { keys } from './keys.js';
import { titleInput } from './dom.js';

export const url = {
    api: `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${keys.tmdbV3}&page=1`,
    poster: 'https://image.tmdb.org/t/p/w1280',
    userPoster: './img/userPoster.png',
    search: `https://api.themoviedb.org/3/search/movie?api_key=${keys.tmdbV3}&query=`,
    local: `http://localhost:3000/favorites/`,
    userLocal: `http://localhost:3000/users/`,
    randomPhoto: `https://api.unsplash.com/photos/random?&query=${titleInput.value}&orientation=portrait&client_id=${keys.unsplash}`
};