import { getMovies } from "./get-movies.js";
import { url } from "./urls.js";
import { addMovieBtnEventListener, overlayEventListener, returnHomeEventListener, searchEventListener, sortByEventListener, userSubmitBtnEventListener } from "./event-listeners.js";

(async () => {
    await getMovies(url.api);
    await searchEventListener();
    await sortByEventListener();
    await overlayEventListener();
    await addMovieBtnEventListener();
    await userSubmitBtnEventListener();
    await returnHomeEventListener();
})();
