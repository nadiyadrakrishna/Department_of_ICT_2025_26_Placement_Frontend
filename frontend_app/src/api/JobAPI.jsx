import axios from 'axios';
const API_URL = 'http://localhost:3000/job';

export const postNewJob = async (jobData) => {
    const response = await axios.post(`${API_URL}/post-job`, jobData);
    return response.data;
};

export const getJobsByCompanyId = async (companyId) => {
    const response = await axios.get(`${API_URL}/jobs/${companyId}`);
    return response.data;
};