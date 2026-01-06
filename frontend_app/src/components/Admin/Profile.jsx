// src/components/Admin/Profile.jsx
import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { getAdminById } from '../../api/AdminAPI';

const Profile = () => {
  const id="694943222800f0db477537dd"
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // const token = localStorage.getItem('token');
        // if (!token) {
        //   throw new Error('No authentication token found');
        // }

        const response = await getAdminById(id);
        if (response.success) {
          setAdmin(response.data);
        } else {
          setError('Failed to fetch admin data');
        }
      } catch (err) {
        console.error('Error:', err);
        setError(err.message || 'Error fetching admin data');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <strong>Error: </strong>
        <span>{error}</span>
      </div>
    );
  }

  if (!admin) {
    return <div>No admin data found</div>;
  }

  return (
    <div>
      <div>
        <h3>Admin Profile</h3>
        <p>Personal details and information</p>
      </div>
      <div>
        <div>
          <div>
            <div>Full Name</div>
            <div>{admin.name}</div>
          </div>
          <div>
            <div>Email</div>
            <div>{admin.email}</div>
          </div>
          <div>
            <div>College Contact</div>
            <div>{admin.college_contact}</div>
          </div>
          <div>
            <div>College Email</div>
            <div>{admin.college_email}</div>
          </div>
          <div>
            <div>Member Since</div>
            <div>{new Date(admin.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;