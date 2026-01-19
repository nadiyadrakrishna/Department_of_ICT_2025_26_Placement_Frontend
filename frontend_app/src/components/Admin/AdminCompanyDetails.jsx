import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCompanyById } from '../../api/CompanyAPI';

const AdminCompanyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await getCompanyById(id);
                setCompany(data.company);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) return <div>Loading full details...</div>;
    if (!company) return <div>Company not found.</div>;

    return (
        <div style={{ padding: '30px', border: '1px solid #ccc', margin: '20px', borderRadius: '8px' }}>
            <button onClick={() => navigate('/admin/companies')} style={{ marginBottom: '20px' }}>
                ← Back to List
            </button>
            
            <h1>Full Company Details</h1>
            <hr />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                <div>
                    <p><strong>Company Name:</strong> {company.companyName}</p>
                    <p><strong>Email:</strong> {company.email}</p>
                    <p><strong>Contact:</strong> {company.contact}</p>
                </div>
                <div>
                    <p><strong>Status:</strong> {company.status}</p>
                    <p><strong>Active:</strong> {company.isActive ? "Yes" : "No"}</p>
                    <p><strong>Joined:</strong> {new Date(company.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            <div style={{ marginTop: '20px' }}>
                <h3>Description</h3>
                <p style={{ background: '#f9f9f9', padding: '15px', borderRadius: '4px' }}>
                    {company.description || "No description provided."}
                </p>
            </div>
        </div>
    );
};

export default AdminCompanyDetails;