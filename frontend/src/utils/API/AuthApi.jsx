import axios from "axios";

export const AUTH_API = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_API_URL}/auth`,
    withCredentials: true
});

export const _signupAPI = async (data) => {
    try {
        console.log(data);
        const response = await AUTH_API.post('/register', data)
        return response.data
    } catch (error) {
        throw error;
    }
}

export const _login = async (data) => {
    try {
        const response = await AUTH_API.post('/login', data)
        return response.data
    } catch (error) {
        throw error;
    }
}