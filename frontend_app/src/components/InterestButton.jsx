// InterestButton.jsx
// Button for marking interest or not interest

export default function InterestButton({ interested, onClick, disabled }) {
    return (
        <button
            className={`px-4 py-1 rounded text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-400 mr-2 ${interested ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {interested ? 'Interested' : 'Not Interested'}
        </button>
    );
}
