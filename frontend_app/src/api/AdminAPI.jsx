// src/api/AdminAPI.jsx
import axios from 'axios';

const API_URL = 'http://localhost:3000/admin';

// Get admin by ID
export const getAdminById = async (adminId) => {
  try {
    const response = await axios.get(`${API_URL}/${adminId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching admin:', error);
    throw error;
  }
};