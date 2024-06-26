import axios from "axios";

export const BLOG_API = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_API_URL}`,
    withCredentials: true
});

