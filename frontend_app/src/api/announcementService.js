
const API_BASE = 'http://localhost:3000/Announcement';
export async function updateAnnouncementStatus(announcementId, is_Active, adminId) {
    const res = await fetch(`${API_BASE}/${announcementId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_Active, AdminId: adminId }),
    });
    if (!res.ok) throw new Error('Failed to update announcement status');
    return res.json();
}
// announcementService.js
// Handles API calls for announcements
 // Changed port to 3000

export async function fetchAnnouncementsByAdmin(adminId) {
    const res = await fetch(`${API_BASE}/admin/${adminId}`);
    if (!res.ok) throw new Error('Failed to fetch admin announcements');
    return res.json();
}

export async function fetchAnnouncementsForStudent(studentId) {
    const res = await fetch(`${API_BASE}/student/${studentId}`);
    if (!res.ok) throw new Error('Failed to fetch student announcements');
    return res.json();
}

export async function createAnnouncement(data) {
    const res = await fetch(`${API_BASE}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create announcement');
    return res.json();
}

export async function markInterested(announcementId, studentId) {
    const res = await fetch(`${API_BASE}/${announcementId}/interested`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId }),
    });
    if (!res.ok) throw new Error('Failed to mark interested');
    return res.json();
}

export async function markNotInterested(announcementId, studentId) {
    const res = await fetch(`${API_BASE}/${announcementId}/not-interested`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId }),
    });
    if (!res.ok) throw new Error('Failed to mark not interested');
    return res.json();
}

export async function fetchAnnouncementById(announcementId) {
    const res = await fetch(`${API_BASE}/${announcementId}`);
    if (!res.ok) throw new Error('Failed to fetch announcement details');
    return res.json();
}
//
// export async function fetchAnnouncementById(announcementId) {
//     const res = await fetch(http://localhost:3000/announcements/${announcementId});
//     if (!res.ok) throw new Error('Failed to fetch announcement details');
//     return res.json();
// 