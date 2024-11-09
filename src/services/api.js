import axios from "axios";

export const api = axios.create({
    baseURL: process.env.API_HOST,
    headers: {
        apikey: process.env.API_KEY,
        Authorization: process.env.API_AUTH
    }
})