import React, { useState } from 'react';
import { addAchievement } from '../api/AchievementAPI';

const Achievements = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    certificate: null,
    studentId: '6948ea0081d53d0b9d0d9958'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      certificate: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAchievement(formData);
      // Reset form
      setFormData({
        title: '',
        company: '',
        certificate: null,
        studentId: '6948ea0081d53d0b9d0d9958'
      });
      // Reset file input
      document.getElementById('certificate-upload').value = '';
      alert('Achievement added successfully!');
    } catch (error) {
      console.error('Error adding achievement:', error);
      alert('Failed to add achievement');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add Achievement</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px' }}>
        <div>
          <label>
            Title *:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </label>
        </div>
        
        <div>
          <label>
            Company:
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '8px' }}
            />
          </label>
        </div>
        
        <div>
          <label>
            Certificate:
            <input
              id="certificate-upload"
              type="file"
              onChange={handleFileChange}
              style={{ marginTop: '5px' }}
            />
          </label>
        </div>
        
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Add Achievement
        </button>
      </form>
    </div>
  );
};

export default Achievements;