import * as vars from "./movie-variables.js";
import { getMovies } from "./get-movies.js";
import { displayFavs } from "./movie-variables.js";

(async () => {
    await getMovies(vars.api_url);

    vars.form.addEventListener("submit", (e) => {
        e.preventDefault();
        const searchTerm = vars.search.value;
        if (searchTerm && searchTerm !== "") {
            getMovies(vars.search_api + searchTerm);
            vars.search.value = "";
        } else {
            window.location.reload();
        }
    });
    
    vars.showFavsBtn.addEventListener('click', () => {
        displayFavs.classList.toggle('show');
    })
    
})();


