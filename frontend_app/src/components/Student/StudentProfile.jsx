import React, { useState, useEffect } from 'react';
import { getStudentById } from '../../api/StudentAPI';

const StudentProfile = () => {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await getStudentById();
                if (response.success && response.student) {
                    setStudent(response.student);
                } else {
                    setError('Failed to load student data');
                }
            } catch (err) {
                setError('Error fetching student data');
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, []);

    if (loading) return <div>Loading student data...</div>;
    if (error) return <div>{error}</div>;
    if (!student) return <div>No student data available</div>;

    return (
        <div className="student-profile">
            <h2>Student Profile</h2>

            {/* Personal Info */}
            <div className="profile-section">
                <p><strong>SPID:</strong> {student.SPID}</p>
                <p><strong>Course:</strong> {student.Course}</p>
                <p><strong>Area:</strong> {student.Area}</p>
                <p><strong>Gender:</strong> {student.Gender}</p>
                <p><strong>Role:</strong> {student.Role}</p>
            </div>

            {/* Contact Info */}
            <div className="profile-section">
                <p><strong>Phone:</strong> {student.Phone}</p>
                <p><strong>University Email:</strong> {student.VNSGU_Email}</p>
                <p><strong>Personal Email:</strong> {student.Personal_Email}</p>
            </div>

            {/* Description */}
            <div className="profile-section">
                <p><strong>About:</strong> {student.Description}</p>
            </div>

            {/* Links */}
            <div className="profile-section">
                <p>
                    <strong>GitHub:</strong>{' '}
                    <a href={student.Github_Link?.[0]} target="_blank" rel="noreferrer">
                        {student.Github_Link?.[0]}
                    </a>
                </p>

                <p>
                    <strong>LinkedIn:</strong>{' '}
                    <a href={student.Linkedin_Link} target="_blank" rel="noreferrer">
                        {student.Linkedin_Link}
                    </a>
                </p>
            </div>
        </div>
    );
};

export default StudentProfile;
