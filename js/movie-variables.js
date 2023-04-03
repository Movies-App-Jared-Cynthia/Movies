import { keys } from "./keys.js";
const api_url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${keys.tmdbV3}&page=1`;
const img_path = "https://image.tmdb.org/t/p/w1280";
const search_api = `https://api.themoviedb.org/3/search/movie?api_key=${keys.tmdbV3}&query="`;
const main = document.querySelector('#main');
const form = document.querySelector('#form');
const search = document.querySelector('#search');

export {api_url, img_path, search_api, main, form, search};