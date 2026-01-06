import axios from 'axios';

const API_URL = 'http://localhost:3000/student'; 

export const getStudentById = async (studentId = '6948ea0081d53d0b9d0d9958') => {
    try {
        const response = await axios.get(`${API_URL}/${studentId}`);
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error fetching student data:', error);
        throw error.response?.data || "Failed to fetch student data";
    }
};