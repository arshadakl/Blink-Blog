import axios from "axios";
import { useSelector } from "react-redux";

export const BLOG_API = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_API_URL}/api`,
    withCredentials: true
});

BLOG_API.interceptors.request.use(
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

export const _createPost = async (data) => {
    try {
        const response = await BLOG_API.post('/posts', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    } catch (error) {
        throw error;
    }
}

export const _editPost = async (postId,data) => {
    try {
        const response = await BLOG_API.put(`/posts/${postId}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    } catch (error) {
        throw error;
    }
}


export const _getPost = async () => {
    try {
        const response = await BLOG_API.get('/posts')
        return response.data
    } catch (error) {
        throw error;
    }
}

export const _getSinglePost = async (id) => {
    try {
        const response = await BLOG_API.get(`/posts/${id}`)
        return response.data
    } catch (error) {
        throw error;
    }
}

export const _getSingleUser = async (id) => {
    try {
        const response = await BLOG_API.get(`/getuser/${id}`)
        return response.data
    } catch (error) {
        throw error;
    }
}

export const _getUserPost = async () => {
    try {
        const response = await BLOG_API.get(`/getuserpost`)
        return response.data
    } catch (error) {
        throw error;
    }
}

export const _updateProfile = async (formData) => {
    try {
        const response = await BLOG_API.put('/users/profile',formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    } catch (error) {
        throw error;
    }
}