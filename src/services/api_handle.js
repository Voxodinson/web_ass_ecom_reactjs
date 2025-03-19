import axios from 'axios';

const BASE_URL = process.env.BASE_URL;   

const apiService = {
    get: async (endpoint) => {
        try {
            const response = await axios.get(`${BASE_URL}/${endpoint}`);
            return response.data;
        } 
        catch (error) 
        {
            console.log('Error fetching data:', error);
            throw error;
        }
    },

    post: async (endpoint, data) => {
        try {
            const response = await axios.post(`${BASE_URL}/${endpoint}`, data);
            return response.data;
        } 
        catch (error) 
        {
            console.log('Error creating data:', error);
            throw error;
        }
    },

    put: async (endpoint, id, data) => {
        try {
            const response = await axios.put(`${BASE_URL}/${endpoint}/${id}`, data);
            return response.data;
        } 
        catch (error) 
        {
            console.log('Error updating data:', error);
            throw error;
        }
    },

    delete: async (endpoint, id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/${endpoint}/${id}`);
            return response.data;
        } 
        catch (error) 
        {
            console.log('Error deleting data:', error);
            throw error;
        }
    },
};

export default apiService;
