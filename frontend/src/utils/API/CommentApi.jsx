import axios from "axios";

export const COMMENT_API = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_API_URL}/api`,
    withCredentials: true
});


COMMENT_API.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem('persist:root'))?.user;
        const parsedToken = token ? JSON.parse(token)?.user?.token : null;

        if (parsedToken) {
            config.headers['Authorization'] = `${parsedToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const _createComment = async (postId,command) => {
    try {
        const response = await COMMENT_API.post(`/posts/${postId}/comments`,command)
        return response.data
    } catch (error) {
        throw error;
    }
}

export const _getComments = async (postId) => {
    try {
        const response = await COMMENT_API.get(`/posts/${postId}/comments`)
        return response.data
    } catch (error) {
        throw error;
    }
}