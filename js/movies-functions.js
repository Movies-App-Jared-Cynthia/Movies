import * as vars from "./movie-variables.js";
import { poster, userLocal } from "./url.js";
import { getClassByRate } from "./get-movies.js";
import { editsModal } from "./movie-variables.js";

export const getUsers = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        showUsers(data);
    } catch (e) {
        console.log(e.message);
    }
};

export const showUsers = (movies) => {
    vars.main.innerHTML = "";
    movies.forEach(movie => {
        const { title, id, poster_path, vote_average, overview } = movie;
        const movieElement = document.createElement("div");
        const average = Math.round(vote_average);
        const favBtn = document.createElement("button");
        favBtn.classList.add("fav-btn");
        favBtn.innerHTML = `<i class="fa-sharp fa-solid fa-heart"></i>`;
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML = `<i class="fa-solid fa-heart-crack"></i>`;
        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
        favBtn.addEventListener("click", () => {
            addUser(movie);
        });
        favBtn.addEventListener("mouseenter", () => {
            favBtn.classList.toggle("hide");
        });
        deleteBtn.addEventListener("mouseleave", () => {
            favBtn.classList.toggle("hide");
        });
        deleteBtn.addEventListener("click", () => {
            removeUser(id);
        });
        editBtn.addEventListener("click", (e) => {
                e.preventDefault();
                const editModal = document.createElement("section");
                editModal.classList.add("edit-modal");
                editModal.id = "edits";
                editModal.innerHTML = `
                <div class="modal-wrapper">
                    <button id="edits-btn"><i class="fa-solid fa-square-xmark"></i></button>
                        <form id="user-edits" action="">
                            <label for="title-edit">Movie Title:</label>
                            <input type="text" id="title-edit" required>
                            <label for="overview-edit">Movie Overview:</label>
                            <textarea id="overview-edit" rows="10" cols="10" required></textarea>
                            <label for="rating-edit">Movie Rating:</label>
                            <select name="rating-select" id="rating-edit">
                                <option value="1" id="edit-rating-option1">1</option>
                                <option value="2" id="edit-rating-option2">2</option>
                                <option value="3" id="edit-rating-option3">3</option>
                                <option value="4" id="edit-rating-option4">4</option>
                                <option value="5" id="edit-rating-option5">5</option>
                            </select>
                            <label for="genre-edit">Movie Genre:</label>
                            <select name="genre-select" id="genre-edit">
                                <option value="28" id="edit-genre-option1">Action</option>
                                <option value="12" id="edit-genre-option2">Adventure</option>
                                <option value="16" id="edit-genre-option3">Animation</option>
                                <option value="35" id="edit-genre-option4">Comedy</option>
                                <option value="80" id="edit-genre-option5">Crime</option>
                                <option value="99" id="edit-genre-option6">Documentary</option>
                                <option value="18" id="edit-genre-option7">Drama</option>
                                <option value="10751" id="edit-genre-option8">Family</option>
                                <option value="14" id="edit-genre-option9">Fantasy</option>
                                <option value="36" id="edit-genre-option10">History</option>
                                <option value="27" id="edit-genre-option11">Horror</option>
                                <option value="10402" id="edit-genre-option12">Music</option>
                                <option value="9648" id="edit-genre-option13">Mystery</option>
                                <option value="10749" id="edit-genre-option14">Romance</option>
                                <option value="878" id="edit-genre-option15">Science Fiction</option>
                                <option value="10770" id="edit-genre-option16">TV Movie</option>
                                <option value="53" id="edit-genre-option17">Thriller</option>
                                <option value="10752" id="edit-genre-option18">War</option>
                                <option value="37" id="edit-genre-option19">Western</option>
                            </select>
                            <button id="user-edit-btn" type="submit">Submit Your Movie</button>
                        </form>
                    </div>
                `;
                vars.columnElement.appendChild(editModal);
            }
        );

        movieElement.classList.add("movie");
        movieElement.innerHTML = `
            <img src="${poster + poster_path}" alt="Movie poster for the movie ${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <span class="overview-card">${overview}</span>
            </div>
        `;
        movieElement.appendChild(deleteBtn);
        movieElement.appendChild(favBtn);
        movieElement.appendChild(editBtn);
        vars.main.appendChild(movieElement);
    });
};
export const addUser = async (movie) => {
    const { id, overview, poster_path, title, vote_average, genre_ids } = movie;
    let movieDetails = { id, rating: 3, title, poster_path, vote_average, overview, genre_ids };

    try {
        const url = userLocal;
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movieDetails)
        };
        let res = await fetch(url, options);
        let data = await res.json();
        return data;
    } catch (e) {
        console.log(e.message);
    }
};

export const removeUser = async (id) => {
    try {
        if (!id) {
            throw new Error("ID required");
        }
        const url = `http://localhost:3000/users/${id}`;
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        };
        const res = await fetch(url, options);
        const data = await res.json();
        return data;
    } catch (e) {
        console.log(e.message);
    }
};

export const editUser = async (id, movie) => {
    if (!id) {
        throw new Error("ID required");
    }

    try {
        const url = `http://localhost:3000/users/${id}`;
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movie)
        };
        const res = await fetch(url, options);
        const data = await res.json();
        return data;
    } catch (e) {
        console.log(e.message);
    }
};