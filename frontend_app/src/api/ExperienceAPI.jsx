import axios from 'axios';

const API_URL = 'http://localhost:3000/experience';

export const addExperience = async (experienceData, certificateFile) => {
  const formDataToSend = new FormData();
  
  // Append all experience data
  Object.keys(experienceData).forEach(key => {
    if (key === 'techStack') {
      formDataToSend.append('techStack', experienceData.techStack.split(',').map(item => item.trim()));
    } else {
      formDataToSend.append(key, experienceData[key]);
    }
  });
  
  // Append certificate file if exists
  if (certificateFile) {
    formDataToSend.append('certificate', certificateFile);
  }

  const response = await axios.post(API_URL, formDataToSend, {
    headers: {
      'Content-Type': 'multipart/form-data',
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  console.log(response);
  return response.data;
};

export const getExperiencesByStudent = async (studentId) => {
  const response = await axios.get(`${API_URL}/student/${studentId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const updateExperience = async (id, experienceData, certificateFile = null) => {
  const formDataToSend = new FormData();
  
  // Append all experience data
  Object.keys(experienceData).forEach(key => {
    if (key === 'techStack' && Array.isArray(experienceData.techStack)) {
      formDataToSend.append('techStack', experienceData.techStack);
    } else if (experienceData[key] !== undefined) {
      formDataToSend.append(key, experienceData[key]);
    }
  });
  
  // Append certificate file if exists
  if (certificateFile) {
    formDataToSend.append('certificate', certificateFile);
  }

  const response = await axios.put(`${API_URL}/${id}`, formDataToSend, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  return response.data;
};

export const deleteExperience = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};