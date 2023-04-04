import { keys } from "./keys.js";

export const api = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${keys.tmdbV3}&page=1`;
export const poster = "https://image.tmdb.org/t/p/w1280";
export const search = `https://api.themoviedb.org/3/search/movie?api_key=${keys.tmdbV3}&query=`;
export const local = `http://localhost:3000/favorites`;
export const userLocal = `http://localhost:3000/users`;