import { getMovies } from "./get-movies.js";
import { url } from "./urls.js";
import { addMovieBtnEventListener, overlayEventListener, overviewInputEventListener, returnHomeEventListener, searchEventListener, sortByEventListener, userSubmitBtnEventListener } from "./event-listeners.js";

(async () => {
    await getMovies(url.api);
    searchEventListener();
    sortByEventListener();
    overlayEventListener();
    overviewInputEventListener();
    addMovieBtnEventListener();
    userSubmitBtnEventListener();
    returnHomeEventListener();
})();
