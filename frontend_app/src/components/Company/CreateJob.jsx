import React, { useState, useEffect } from 'react';
import { postNewJob } from '../../api/JobAPI';

const CreateJob = () => {
    // Function to calculate current academic year
    const getCurrentYear = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth() is 0-indexed
        return month >= 6 ? `${year}-${(year + 1).toString().slice(-2)}` : `${year - 1}-${year.toString().slice(-2)}`;
    };

    const [formData, setFormData] = useState({
        companyId: localStorage.getItem('companyId') || "69673c528e03a5850f20133e", 
        year: getCurrentYear(), // Dynamic year
        role: "",
        techStack: "",
        description: "",
        package: "",
        stipend: "",
        jobType: "Internship + Full-time" // Default option
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await postNewJob(formData);
            alert(data.message);
        } catch (error) {
            alert("Check terminal for error details.");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', border: '1px solid #ddd', borderRadius: '10px' }}>
            <h2>Create Job Opening</h2>
            <form onSubmit={handleSubmit}>
                <p><strong>Academic Year:</strong> {formData.year}</p>
                
                <label>Job Type:</label>
                <select name="jobType" value={formData.jobType} onChange={handleChange} style={{ width: '100%', padding: '8px', marginBottom: '10px' }}>
                    <option value="Internship + Full-time">Internship + Full-time (Both)</option>
                    <option value="Full-time">Full-time Only</option>
                    <option value="Internship">Internship Only</option>
                </select>

                <input name="role" placeholder="Role" onChange={handleChange} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} required />
                <input name="techStack" placeholder="Tech Stack" onChange={handleChange} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} required />
                
                <label>Package details:</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input name="stipend" placeholder="Stipend (Monthly)" onChange={handleChange} style={{ flex: 1, padding: '8px' }} />
                    <input name="package" placeholder="Package (LPA)" onChange={handleChange} style={{ flex: 1, padding: '8px' }} />
                </div>

                <textarea name="description" placeholder="Description" onChange={handleChange} style={{ width: '100%', padding: '8px', height: '100px', marginTop: '10px' }} required />
                <button type="submit" style={{ marginTop: '10px', background: '#007bff', color: '#fff', border: 'none', padding: '10px', cursor: 'pointer' }}>Post Job</button>
            </form>
        </div>
    );
};

export default CreateJob;