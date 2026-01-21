// AnnouncementInterestedStudents.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAnnouncementById } from '../services/announcementService';
import StudentList from '../components/StudentList';
import Loader from '../components/Loader';

export default function AnnouncementInterestedStudents() {
    const { announcementId } = useParams();
    const [announcement, setAnnouncement] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError('');
            try {
                const data = await fetchAnnouncementById(announcementId);
                console.log('Fetched announcement:', data); // <-- Add this line
                setAnnouncement(data.announcement);
            } catch (err) {
                setError(err.message || 'Failed to fetch announcement');
            }
            setLoading(false);
        }
        fetchData();
    }, [announcementId]);

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Interested Students</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <>
                    <div className="mb-4">
                        <strong>Announcement:</strong> {announcement?.Title}
                    </div>
                    <StudentList students={announcement?.interestedCandidates || []} />
                </>
            )}
        </div>
    );
}