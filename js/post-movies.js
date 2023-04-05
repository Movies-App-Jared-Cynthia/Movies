export const addFave = async (url, movie) => {
    const { id, overview, poster_path, title, vote_average, genre_ids } = movie;
    let movieDetails = { id, rating: 3, title, poster_path, vote_average, overview, genre_ids };
    try {
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movieDetails)
        };
        let res = await fetch(url, options);
        let data = await res.json();
        console.log(options.body);
        return data;
    } catch (e) {
        console.log(e.message);
    }
};
export const addUser = async (movie) => {
    console.log(movie);
    try {
        let url = `http://localhost:3000/users/`;
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        };
        let res = await fetch(url, options);
        let data = await res.json();
        return data;
    } catch (e) {
        console.log(e.message);
    }
};