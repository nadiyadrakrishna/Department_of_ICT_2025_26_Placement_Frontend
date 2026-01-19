// AnnouncementCard.jsx
// Reusable card for displaying an announcement

export default function AnnouncementCard({ title, message, deadline, isActive, onClick, statusAction }) {
    return (
        <div className={`bg-white rounded-lg shadow p-6 mb-4 border-l-4 ${isActive ? 'border-blue-500' : 'border-gray-300'} transition`}
            onClick={onClick}>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                    <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded ${isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-500'}`}>{isActive ? 'Active' : 'Inactive'}</span><br></br>
                        {statusAction}
                    </div>
                </div>
                <p className="text-gray-600">{message}</p>
                <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-gray-500">Deadline: {new Date(deadline).toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}
