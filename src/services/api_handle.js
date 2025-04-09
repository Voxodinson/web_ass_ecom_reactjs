import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const handleError = (error) => {
    if (error.response) {
        console.error('API Error:', error.response.data?.message || 'API Error');
    } else if (error.request) {
        console.error('Network Error: No response from server. Check network connection.');
    } else {
        console.error('Request Error:', error.message);
    }
};

const apiRequest = async (method, endpoint, data = null) => {
    try {
        let response;
        switch (method) {
            case 'get':
                response = await axios.get(`${BASE_URL}/${endpoint}`);
                break;
            case 'post':
                response = await axios.post(`${BASE_URL}/${endpoint}`, data);
                break;
            case 'put':
                response = await axios.put(`${BASE_URL}/${endpoint}`, data);
                break;
            case 'delete':
                response = await axios.delete(`${BASE_URL}/${endpoint}`);
                break;
            default:
                throw new Error('Invalid HTTP method');
        }

        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

const apiHandle = {
    get: async (endpoint) => apiRequest('get', endpoint),
    post: async (endpoint, data) => apiRequest('post', endpoint, data),
    put: async (endpoint, data) => apiRequest('put', endpoint, data),
    delete: async (endpoint) => apiRequest('delete', endpoint),
};

export default apiHandle;