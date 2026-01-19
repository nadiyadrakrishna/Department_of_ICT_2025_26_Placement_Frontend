// import React, { useEffect, useState } from 'react';
// import { getAllCompanies } from '../../api/CompanyAPI';

// const CompanyList = () => {
//     const [companies, setCompanies] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchCompanies = async () => {
//             try {
//                 const data = await getAllCompanies();
//                 setCompanies(data.companies);
//             } catch (err) {
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchCompanies();
//     }, []);

//     if (loading) return <p>Loading companies...</p>;

//     return (
//         <div>
//             <h2>All Registered Companies</h2>
//             <table border="1" style={{ width: '100%', textAlign: 'left' }}>
//                 <thead>
//                     <tr>
//                         <th>Company Name</th>
//                         <th>Email</th>
//                         <th>Contact</th>
//                         <th>Status</th>
//                         <th>Year Block</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {companies.map((company) => (
//                         <tr key={company._id}>
//                             <td>{company.companyName}</td>
//                             <td>{company.email}</td>
//                             <td>{company.contact}</td>
//                             <td>{company.status}</td>
//                             {/* Note: Year is accessible if you adjust backend to include it in the flat list */}
//                             <td>{company.isActive ? "Active" : "Inactive"}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default CompanyList;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { getAllCompanies } from '../../api/CompanyAPI';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const data = await getAllCompanies();
                setCompanies(data.companies);
            } catch (err) {
                console.error('Error fetching companies:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCompanies();
    }, []);

    if (loading) return <p>Loading companies...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Admin: Company Management</h2>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '10px' }}>Company Name (Click to View)</th>
                        <th style={{ padding: '10px' }}>Email</th>
                        <th style={{ padding: '10px' }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company) => (
                        <tr key={company._id}>
                            <td style={{ padding: '10px' }}>
                                {/* Link to the details page */}
                                <Link 
                                    to={`/admin/company-details/${company._id}`} 
                                    style={{ color: '#007bff', fontWeight: 'bold', textDecoration: 'none' }}
                                >
                                    {company.companyName}
                                </Link>
                            </td>
                            <td style={{ padding: '10px' }}>{company.email}</td>
                            <td style={{ padding: '10px' }}>{company.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompanyList;