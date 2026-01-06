// src/components/Company/CompanyProfile.jsx
import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import axios from 'axios';

const CompanyProfile = () => {
  const id = "69495caceb31f0d5747edc27";
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/company/${id}`);
        if (response.data.company) {
          setCompany(response.data.company);
        } else {
          setError('Company data not found');
        }
      } catch (err) {
        console.error('Error fetching company data:', err);
        setError(err.response?.data?.message || 'Error loading company data');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [id]);

  if (loading) {
    return <div>Loading company information...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!company) {
    return <div>No company data available</div>;
  }

  return (
    <div className="company-profile-container">
      <div className="profile-header">
        <h1>{company.companyName}</h1>
        <div className={`status-badge ${company.status}`}>
          {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
        </div>
      </div>

      <div className="profile-section">
        <h2>Contact Information</h2>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Email:</span>
            <span className="value">{company.email}</span>
          </div>
          <div className="info-item">
            <span className="label">Phone:</span>
            <span className="value">{company.contact}</span>
          </div>
        </div>
      </div>

      {company.description && (
        <div className="profile-section">
          <h2>About Us</h2>
          <p className="description">{company.description}</p>
        </div>
      )}

      <div className="profile-section">
        <h2>Company Details</h2>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Member Since:</span>
            <span className="value">
              {new Date(company.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="info-item">
            <span className="label">Account Status:</span>
            <span className="value">
              {company.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;