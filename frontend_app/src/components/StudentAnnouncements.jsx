import { useEffect, useState } from 'react';
import { fetchAnnouncementsForStudent, markInterested, markNotInterested } from '../api/announcementService';
import AnnouncementCard from '../components/AnnouncementCard';
import InterestButton from '../components/InterestButton';
import Loader from '../components/Loader';

export default function StudentAnnouncements() {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [interest, setInterest] = useState({});
    const studentId = '6948ea0081d53d0b9d0d9958'; // Replace with actual student id logic

    // Helper to get/set not interested announcements in localStorage
    function getNotInterestedFromStorage(studentId) {
        try {
            const data = localStorage.getItem(`notInterested_${studentId}`);
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    }
    function setNotInterestedToStorage(studentId, arr) {
        localStorage.setItem(`notInterested_${studentId}, JSON.stringify(arr)`);
    }

    async function fetchAnnouncements() {
        setLoading(true);
        setError('');
        try {
            const data = await fetchAnnouncementsForStudent(studentId);
            console.log('API announcements:', data);

            setAnnouncements(data.announcements || []);
            // Set initial interest state from backend (persisted) and localStorage for not interested
            const notInterestedArr = getNotInterestedFromStorage(studentId);
            const interestState = {};
            (data.announcements || []).forEach(a => {
                const annId = a.id || a._id;
                if (a.hasAlreadyInterested) {
                    interestState[annId] = 'interested';
                } else if (notInterestedArr.includes(annId)) {
                    interestState[annId] = 'not_interested';
                }
            });
            setInterest(interestState);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }

    // Load not interested from localStorage
    useEffect(() => {
        fetchAnnouncements();
    }, []);

    async function handleInterest(announcementId, interested) {
        setInterest(i => ({ ...i, [announcementId]: 'loading' }));
        try {
            if (interested) {
                await markInterested(announcementId, studentId);
                setInterest(i => ({ ...i, [announcementId]: 'interested' }));
            } else {
                await markNotInterested(announcementId, studentId);
                // Save to localStorage
                const prev = getNotInterestedFromStorage(studentId);
                if (!prev.includes(announcementId)) {
                    setNotInterestedToStorage(studentId, [...prev, announcementId]);
                }
                setInterest(i => ({ ...i, [announcementId]: 'not_interested' }));
            }
        } catch (err) {
            setError(err.message);
            setInterest(i => ({ ...i, [announcementId]: null }));
        }
    }


    // Only show announcements that are active (let backend handle deadline logic)
    const freshAnnouncements = announcements.filter(a => a.is_Active);
    console.log('Filtered announcements:', freshAnnouncements);
    return (
        <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Student Announcements</h1>
            {loading ? <Loader /> : (
                <div>
                    {freshAnnouncements.length === 0 && <div className="text-gray-500">No announcements found.</div>}
                    {freshAnnouncements.map(a => {
                        const annId = a.id || a._id;
                        const status = interest[annId];
                        // If already interested (from backend or just now), show only the message
                        if (a.hasAlreadyInterested || status === 'interested') {
                            return (
                                <AnnouncementCard
                                    key={annId}
                                    title={a.Title}
                                    message={a.Message}
                                    deadline={a.Deadline}
                                    isActive={a.is_Active}
                                    statusAction={
                                        <span className="px-4 py-1 rounded bg-green-100 text-green-700 text-sm">You marked as Interested</span>
                                    }
                                />
                            );
                        }
                        // If just marked as not interested, show that message
                        if (status === 'not_interested') {
                            return (
                                <AnnouncementCard
                                    key={annId}
                                    title={a.Title}
                                    message={a.Message}
                                    deadline={a.Deadline}
                                    isActive={a.is_Active}
                                    statusAction={
                                        <span className="px-4 py-1 rounded bg-gray-200 text-gray-700 text-sm">You marked as Not Interested</span>
                                    }
                                />
                            );
                        }
                        // Otherwise, show both buttons
                        return (
                            <AnnouncementCard
                                key={annId}
                                title={a.Title}
                                message={a.Message}
                                deadline={a.Deadline}
                                isActive={a.is_Active}
                                statusAction={
                                    <div className="flex gap-2">
                                        <button
                                            className="px-4 py-1 rounded bg-green-500 text-white text-sm hover:bg-green-600 transition"
                                            onClick={() => handleInterest(annId, true)}
                                            disabled={status === 'loading'}
                                        >
                                            Interested
                                        </button>
                                        <button
                                            className="px-4 py-1 rounded bg-gray-300 text-gray-700 text-sm hover:bg-gray-400 transition"
                                            onClick={() => handleInterest(annId, false)}
                                            disabled={status === 'loading'}
                                        >
                                            Not Interested
                                        </button>
                                    </div>
                                }
                            />
                        );
                    })}
                </div>
            )}
                {error && <div className="text-red-500 mt-4">{error}</div>}
            </div>
        );
    }
