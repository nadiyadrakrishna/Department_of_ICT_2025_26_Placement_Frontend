import axios from 'axios';

const API_URL = 'http://localhost:3000/company';

export const getCompanyById = async (companyId) => {
    try {
        const response = await axios.get(`${API_URL}/${companyId}`);
        return response.data; // This returns { message, company }
    } catch (error) {
        console.error('Error fetching company:', error);
        throw error.response?.data || "Failed to fetch company data";
    }
};


// Fetch all companies (Flattened by backend)
export const getAllCompanies = async () => {
    try {
        const response = await axios.get(`${API_URL}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all companies:', error);
        throw error.response?.data || "Failed to fetch companies";
    }
};

export const loginCompany = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Login failed";
    }
};


// export const loginCompany = async (credentials) => {
//     return await axios.post(`${API_URL}/login`, credentials);
// };