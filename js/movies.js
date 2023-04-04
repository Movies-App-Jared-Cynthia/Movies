import * as vars from "./movie-variables.js";
import { api, search, local, userLocal } from "./url.js";
import { getFaves, getMovies } from "./get-movies.js";
import { keys } from "./keys.js";
import { genreInput, modal, overviewInput, ratingInput, titleInput} from "./movie-variables.js";
import { addUser, editUser, getUsers, showUsers } from "./movies-functions.js";

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

    vars.sortBy.addEventListener("change", async (e) => {
        e.preventDefault();
        let sorted = "";
        switch (vars.sortBy.value) {
            case "popular":
            case "top_rated":
            case "now_playing":
            case "upcoming":
                sorted = `https://api.themoviedb.org/3/movie/${vars.sortBy.value}?api_key=${keys.tmdbV3}&language=en-US&page=1`;
                break;
            case "favorites":
                await getFaves(local);
                break;
            case "user":
                await getUsers(userLocal);
                break;
        }
        await getMovies(sorted);
    });

    vars.overlay.addEventListener("click", (e) => {
        vars.modal.classList.toggle("hidden");
        vars.overlay.classList.toggle("hidden");
        vars.body.style.overflow = "auto";
    });

    vars.modalShowBtn.addEventListener("click", (e) => {
            e.preventDefault();
            vars.modal.classList.toggle("hidden");
            vars.overlay.classList.toggle("hidden");
            if (!modal.classList.contains("hidden")) {
                // Disable scroll
                vars.body.style.overflow = "hidden";
            } else {
                // Enable scroll
                vars.body.style.overflow = "auto";
            }
        }
    )
    ;

    vars.userSubmitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("event fired");
        if (titleInput.value !== "" && overviewInput.value !== "") {
            let movie = {
                rating: parseFloat(ratingInput.value),
                title: titleInput.value,
                poster_path: "./img/userPoster.png",
                vote_average: parseFloat(ratingInput.value),
                overview: overviewInput.value,
                genre_ids: parseFloat(genreInput.value)
            };
            vars.modal.classList.toggle("hidden");
            vars.overlay.classList.toggle("hidden");
            addUser(movie);
            titleInput.innerText = "";
            overviewInput.innerText = "";
        } else {
            console.log("Title and Overview required");
        }

    });

})();
