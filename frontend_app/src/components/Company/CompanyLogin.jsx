import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginCompany } from '../../api/CompanyAPI';

const CompanyLogin = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginCompany(credentials);
            localStorage.setItem('token', data.token); // Store session token
            alert("Login Successful!");
            // Redirect to the dynamic profile using the ID from backend response
            navigate(`/company/${data.company.id || data.company._id}`); 
        } catch (err) {
            setError(err.message || "Invalid Email or Password");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px' }}>
            <h2>Company Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <input 
                        name="email" 
                        type="email" 
                        placeholder="Email" 
                        onChange={handleChange} 
                        style={{ width: '100%', padding: '8px' }}
                        required 
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="Password" 
                        onChange={handleChange} 
                        style={{ width: '100%', padding: '8px' }}
                        required 
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default CompanyLogin;