import axios from "axios";
import { useState } from "react";

const CompanyRegistration = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    contact: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending to backend 👉", formData);

      const response = await axios.post(
        "http://localhost:3000/company/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      alert(response.data.message || "Company Registered Successfully");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error 👉", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#34A394] outline-none";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E6F2EF]">
      <div className="w-[900px] h-[520px] bg-white rounded-2xl shadow-2xl overflow-hidden flex">

        {/* LEFT SIDE */}
        <div className="w-1/2 bg-[#34A394] text-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Network</h2>
          <p className="text-sm opacity-90">
            Register your company and connect with top talent through a secure platform.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6">Company Registration</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              required
              className={inputClass}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputClass}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className={inputClass}
            />

            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
              className={inputClass}
            />

            <textarea
              name="description"
              placeholder="Brief Company Description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className={inputClass}
            />

            <button
              type="submit"
              className="w-full bg-[#34A394] hover:bg-[#2C897F] text-white py-3 rounded-lg font-semibold transition"
            >
              Register Company
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default CompanyRegistration;
