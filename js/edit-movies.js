import { url } from "./urls.js";

export const removeFave = async (id) => {
    try {
        if (!id) {
            throw new Error("Id required");
        }
        const url = `http://localhost:3000/favorites/${id}`;
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
export const editMovie = async (id, movie) => {
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
        console.log("info sent to db");
        console.log(movie);
        return data;
    } catch (e) {
        console.log(e.message);
    }
};