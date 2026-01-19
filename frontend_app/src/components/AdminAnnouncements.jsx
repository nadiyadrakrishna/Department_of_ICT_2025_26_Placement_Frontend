// AdminAnnouncements.jsx
import { useEffect, useState } from 'react';
import { fetchAnnouncementsByAdmin, createAnnouncement, updateAnnouncementStatus } from '../api/announcementService';
import AnnouncementCard from './AnnouncementCard';
import Loader from './Loader';

export default function AdminAnnouncements() {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [form, setForm] = useState({ Title: '', Message: '', Deadline: '' });
    const [creating, setCreating] = useState(false);
    const adminId = '694943222800f0db477537dd'; // Replace with actual admin id logic

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    async function fetchAnnouncements() {
        setLoading(true);
        setError('');
        try {
            const data = await fetchAnnouncementsByAdmin(adminId);
            setAnnouncements(data.announcements || []);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }

    async function handleCreate(e) {
        e.preventDefault();
        setCreating(true);
        setError('');
        try {
            // Convert Deadline to ISO string
            const deadlineISO = new Date(form.Deadline).toISOString();
            await createAnnouncement({ ...form, Deadline: deadlineISO, AdminId: adminId });
            setForm({ Title: '', Message: '', Deadline: '' });
            fetchAnnouncements();
        } catch (err) {
            setError(err.message);
        }
        setCreating(false);
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Admin Announcements</h1>
            <form onSubmit={handleCreate} className="mb-8 bg-white p-4 rounded shadow">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-2">
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            placeholder="Title"
                            className="border px-3 py-2 rounded w-full"
                            value={form.Title}
                            onChange={e => setForm(f => ({ ...f, Title: e.target.value }))}
                            required
                        />
                    </div><br></br>
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Message</label>
                        <textarea
                            placeholder="Message"
                            className="border px-3 py-2 rounded w-full min-h-[40px] max-h-[80px] resize-y"
                            value={form.Message}
                            onChange={e => setForm(f => ({ ...f, Message: e.target.value }))}
                            required
                        />
                    </div><br></br>
                    <div className="flex flex-col gap-2 min-w-[180px]">
                        <label className="text-sm font-medium text-gray-700">Deadline</label>
                        <input
                            type="datetime-local"
                            className="border px-3 py-2 rounded w-full"
                            value={form.Deadline}
                            onChange={e => setForm(f => ({ ...f, Deadline: e.target.value }))}
                            required
                        />
                    </div><br></br>
                    <div className="flex flex-col gap-2 justify-end md:pb-0 pb-2">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded whitespace-nowrap mt-6 md:mt-0" disabled={creating}>
                            {creating ? 'Creating...' : 'Create Announcement'}
                        </button>
                    </div>
                </div>
            </form>
            {loading ? <Loader /> : (
                <div>
                    {announcements.length === 0 && <div className="text-gray-500">No announcements found.</div>}
                    {announcements.map(a => (
                        <AnnouncementCard
                            key={a.id || a._id}
                            title={a.Title}
                            message={a.Message}
                            deadline={a.Deadline}
                            isActive={a.is_Active}
                            statusAction={a.is_Active ? (
                                <button
                                    className="ml-2 px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition"
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        try {
                                            await updateAnnouncementStatus(a.id || a._id, false, adminId);
                                            fetchAnnouncements();
                                        } catch (err) {
                                            setError(err.message);
                                        }
                                    }}
                                >
                                    Set Inactive
                                </button>
                            ) : (
                                // <span className="ml-2 px-3 py-1 bg-gray-300 text-gray-600 rounded text-xs">Inactive</span>
                                null
                            )}
                        />
                    ))}
                </div>
            )}
            {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>
    );
}
