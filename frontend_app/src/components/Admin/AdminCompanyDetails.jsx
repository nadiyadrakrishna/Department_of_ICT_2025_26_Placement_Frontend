// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getCompanyById } from '../../api/CompanyAPI';

// const AdminCompanyDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [company, setCompany] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchDetails = async () => {
//             try {
//                 const data = await getCompanyById(id);
//                 setCompany(data.company);
//             } catch (err) {
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchDetails();
//     }, [id]);

//     if (loading) return <div>Loading full details...</div>;
//     if (!company) return <div>Company not found.</div>;

//     return (
//         <div style={{ padding: '30px', border: '1px solid #ccc', margin: '20px', borderRadius: '8px' }}>
//             <button onClick={() => navigate('/admin/companies')} style={{ marginBottom: '20px' }}>
//                 ← Back to List
//             </button>
            
//             <h1>Full Company Details</h1>
//             <hr />
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
//                 <div>
//                     <p><strong>Company Name:</strong> {company.companyName}</p>
//                     <p><strong>Email:</strong> {company.email}</p>
//                     <p><strong>Contact:</strong> {company.contact}</p>
//                 </div>
//                 <div>
//                     <p><strong>Status:</strong> {company.status}</p>
//                     <p><strong>Active:</strong> {company.isActive ? "Yes" : "No"}</p>
//                     <p><strong>Joined:</strong> {new Date(company.createdAt).toLocaleDateString()}</p>
//                 </div>
//             </div>
//             <div style={{ marginTop: '20px' }}>
//                 <h3>Description</h3>
//                 <p style={{ background: '#f9f9f9', padding: '15px', borderRadius: '4px' }}>
//                     {company.description || "No description provided."}
//                 </p>
//             </div>
//         </div>
//     );
// };
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCompanyById } from '../../api/CompanyAPI';
import { getJobsByCompanyId } from '../../api/JobAPI';

const AdminCompanyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // Fetch both Company Info and Job Data simultaneously
                const [companyData, jobData] = await Promise.all([
                    getCompanyById(id),
                    getJobsByCompanyId(id)
                ]);

                setCompany(companyData.company);
                setJobs(jobData.jobs || []);
                
                console.log("Jobs found:", jobData.jobs); 
            } catch (err) {
                console.error("Error fetching admin details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, [id]);

    if (loading) return <div style={{ padding: '20px' }}>Loading complete details...</div>;
    if (!company) return <div style={{ padding: '20px' }}>Company not found.</div>;

    return (
        <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto' }}>
            {/* Navigation Header */}
            <button 
                onClick={() => navigate('/admin/companies')} 
                style={{ marginBottom: '20px', cursor: 'pointer', padding: '8px 15px' }}
            >
                ← Back to Company List
            </button>

            {/* --- SECTION 1: FULL COMPANY INFORMATION --- */}
            <div style={{ border: '1px solid #ccc', padding: '25px', borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ margin: 0, color: '#2c3e50' }}>{company.companyName}</h1>
                    <span style={{ 
                        padding: '5px 15px', 
                        borderRadius: '20px', 
                        backgroundColor: company.status === 'active' ? '#e8f5e9' : '#fff3e0',
                        color: company.status === 'active' ? '#2e7d32' : '#ef6c00',
                        fontWeight: 'bold',
                        textTransform: 'capitalize'
                    }}>
                        {company.status}
                    </span>
                </div>
                <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #eee' }} />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    <div>
                        <h4 style={{ color: '#7f8c8d', marginBottom: '10px' }}>Contact Details</h4>
                        <p><strong>Email:</strong> {company.email}</p>
                        <p><strong>Phone:</strong> {company.contact}</p>
                        <p><strong>Member Since:</strong> {new Date(company.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <h4 style={{ color: '#7f8c8d', marginBottom: '10px' }}>System Status</h4>
                        <p><strong>Account Active:</strong> {company.isActive ? "✅ Yes" : "❌ No"}</p>
                        <p><strong>Current Role:</strong> {company.role}</p>
                    </div>
                </div>

                <div style={{ marginTop: '25px' }}>
                    <h4 style={{ color: '#7f8c8d', marginBottom: '10px' }}>Company Description</h4>
                    <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', lineHeight: '1.6', color: '#34495e' }}>
                        {company.description || "No description provided by the company."}
                    </div>
                </div>
            </div>

            {/* --- SECTION 2: JOB OPENINGS --- */}
            <div style={{ marginTop: '40px' }}>
                <h2 style={{ borderBottom: '2px solid #3498db', display: 'inline-block', paddingBottom: '5px', color: '#2c3e50' }}>
                    Current Job Openings
                </h2>
                
                {jobs.length === 0 ? (
                    <div style={{ padding: '20px', textAlign: 'center', background: '#f8f9fa', borderRadius: '8px', marginTop: '15px' }}>
                        <p style={{ color: '#7f8c8d' }}>This company hasn't posted any job descriptions (JDs) yet.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
                        {jobs.map(job => (
                            <div key={job._id} style={{ 
                                border: '1px solid #e0e0e0', 
                                padding: '20px', 
                                borderRadius: '10px', 
                                backgroundColor: '#ffffff',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <h3 style={{ margin: '0 0 10px 0', color: '#2980b9' }}>{job.role}</h3>
                                    <span style={{ fontSize: '0.85rem', color: '#95a5a6' }}>
                                        Type: {job.jobType}
                                    </span>
                                </div>
                                
                                <p style={{ margin: '5px 0' }}><strong>Tech Stack:</strong> {job.techStack}</p>
                                
                                <div style={{ display: 'flex', gap: '20px', margin: '15px 0', padding: '10px', background: '#f1f8ff', borderRadius: '6px' }}>
                                    {job.stipend && <p style={{ margin: 0 }}><strong>Stipend:</strong> {job.stipend}</p>}
                                    {job.package && <p style={{ margin: 0 }}><strong>Package:</strong> {job.package}</p>}
                                </div>

                                <p style={{ color: '#525e6a', fontSize: '0.95rem' }}>
                                    <strong>Details:</strong> {job.description}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCompanyDetails;