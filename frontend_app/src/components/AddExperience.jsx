import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addExperience } from '../api/ExperienceAPI';

const AddExperience = () => {
  // Default student ID for testing (replace with actual authentication later)
  const studentId = '6948ea0081d53d0b9d0d9958';
//   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    comapany_name: '',
    Role: '',
    start_date: '',
    end_date: '',
    techStack: '',
  });
  const [certificateFile, setCertificateFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCertificateFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.comapany_name || !formData.Role || !formData.start_date || !formData.end_date || !formData.techStack) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (new Date(formData.end_date) <= new Date(formData.start_date)) {
      toast.error('End date must be after start date');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await addExperience(
        {
          student_id: studentId,
          comapany_name: formData.comapany_name,
          Role: formData.Role,
          start_date: formData.start_date,
          end_date: formData.end_date,
          techStack: formData.techStack
        },
        certificateFile
      );

      toast.success('Experience added successfully!');
    //   navigate('/dashboard'); // Redirect to dashboard or wherever appropriate
      
    } catch (error) {
      console.error('Error adding experience:', error);
      toast.error(error.response?.data?.error || 'Failed to add experience');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Work Experience</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="comapany_name" className="block text-sm font-medium text-gray-700">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="comapany_name"
            name="comapany_name"
            value={formData.comapany_name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="Role" className="block text-sm font-medium text-gray-700">
            Role <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="Role"
            name="Role"
            value={formData.Role}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
              End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="techStack" className="block text-sm font-medium text-gray-700">
            Technologies Used <span className="text-red-500">*</span>
            <span className="text-xs text-gray-500 ml-1">(comma separated, e.g., React, Node.js, MongoDB)</span>
          </label>
          <input
            type="text"
            id="techStack"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="certificate" className="block text-sm font-medium text-gray-700">
            Certificate (Optional)
          </label>
          <input
            type="file"
            id="certificate"
            name="certificate"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <p className="mt-1 text-xs text-gray-500">
            Upload your experience certificate (PDF, JPG, or PNG)
          </p>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Adding...' : 'Add Experience'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExperience;
