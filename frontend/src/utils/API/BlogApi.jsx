import axios from "axios";

export const BLOG_API = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_API_URL}/api`,
    withCredentials: true
});


export const _createPost = async (data) => {
    try {
        const response = await BLOG_API.post('/posts', data,{
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