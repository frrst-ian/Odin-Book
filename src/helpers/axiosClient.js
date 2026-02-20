import axios from "axios";

export const client = axios.create({
    baseURL: "https://project-odin-book-dime.onrender.com/api",
});
