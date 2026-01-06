import axios from 'axios';

const API_URL = 'http://localhost:3000/achievements';

// Get all achievements for a student
export const getAchievements = async (studentId) => {
  try {
    const response = await axios.get(API_URL, {
      params: { studentId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching achievements:', error);
    throw error;
  }
};

// Add a new achievement
export const addAchievement = async (achievementData) => {
  try {
    const formData = new FormData();
    formData.append('title', achievementData.title);
    formData.append('company', achievementData.company);
    if (achievementData.certificate) {
      formData.append('certificate', achievementData.certificate);
    }
    if (achievementData.studentId) {
      formData.append('studentId', achievementData.studentId);
    }
    console.log(formData);
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error adding achievement:', error);
    throw error;
  }
};

// Update an achievement
export const updateAchievement = async (id, achievementData) => {
  try {
    const formData = new FormData();
    formData.append('title', achievementData.title);
    formData.append('company', achievementData.company);
    if (achievementData.certificate) {
      formData.append('certificate', achievementData.certificate);
    }
    if (achievementData.studentId) {
      formData.append('studentId', achievementData.studentId);
    }

    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating achievement:', error);
    throw error;
  }
};

// Delete an achievement
export const deleteAchievement = async (id, studentId) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      data: { studentId }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting achievement:', error);
    throw error;
  }
};
