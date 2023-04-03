import { api_url, img_path, search_api, form, search } from "./movie-variables.js";
import { getMovies } from "./get-movies.js";

(async () => {
    await getMovies(api_url);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const searchTerm = search.value;
        if (searchTerm && searchTerm !== "") {
            getMovies(search_api + searchTerm);
            search.value = "";
        } else {
            window.location.reload();
        }
    });

})();