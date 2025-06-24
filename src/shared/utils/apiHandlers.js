import axios from 'axios';

const baseUrl = '';

axios.defaults.headers.common['Authorization'] = 'Bearer YOUR_ACCESS_TOKEN';

export const get = async (url, headers = {}) => {
    try {
        const response = await axios.get(`${baseUrl}/${url}`, { headers });
        return response.data;
    } catch (error) {
        // Handle error
        console.error('Error making GET request:', error);
        throw error;
    }
}

export const post = async (url, data, headers = {}) => {
    try {
        const response = await axios.post(`${baseUrl}/${url}`, data, { headers });
        return response.data;
    } catch (error) {
        // Handle error
        console.error('Error making POST request:', error);
        throw error;
    }
}

export const del = async (url, headers = {}) => {
    try {
        const response = await axios.delete(`${baseUrl}/${url}`, { headers });
        return response.data;
    } catch (error) {
        // Handle error
        console.error('Error making DELETE request:', error);
        throw error;
    }
}

export const put = async (url, data, headers = {}) => {
    try {
        const response = await axios.put(`${baseUrl}/${url}`, data, { headers });
        return response.data;
    } catch (error) {
        // Handle error
        console.error('Error making PUT request:', error);
        throw error;
    }
}
