import * as vars from "./movie-variables.js";
import { api, search, local } from "./url.js";
import { getMovies, getFaves } from "./get-movies.js";
import { displayFaves } from "./movie-variables.js";

(async () => {
    await getMovies(api);

    vars.form.addEventListener("submit", (e) => {
        e.preventDefault();
        const searchTerm = vars.search.value;
        if (searchTerm && searchTerm !== "") {
            getMovies(search + searchTerm);
            vars.search.value = "";
        } else {
            window.location.reload();
        }
    });

    vars.showAllBtn.addEventListener("click", () => {
        getMovies(api);
    });

    vars.showFavesBtn.addEventListener("click", () => {
        getFaves(local);
        // displayFaves.classList.toggle("show");
    });

})();


