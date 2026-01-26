import { useState } from "react";
import axios from "axios";
import RoleDropdown from "../components/RoleDropdown";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.role) {
      alert("Please select a role");
      return;
    }

    try {
      let endpoint = "";

      if (loginData.role === "company") endpoint = "http://localhost:3000/company/login";
      if (loginData.role === "admin") endpoint = "http://localhost:3000/admin/login";
      if (loginData.role === "student") endpoint = "http://localhost:3000/student/login";

      const res = await axios.post(endpoint, {
        VNSGU_Email: loginData.email,
        Password: loginData.password
      });
      console.log(loginData);


      if (loginData.role === "student") {
        localStorage.setItem("studentId", res.data.student._id);
        console.log(res.data.student._id);
        navigate("/student/studentprofile");
      } 
    } catch (err) {
      console.log("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E6F2EF]">
      <div className="w-[900px] h-[520px] bg-white rounded-2xl shadow-2xl overflow-hidden flex">

        {/* LEFT */}
        <div className="w-1/2 bg-[#34A394] text-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-3">Welcome Back</h2>
          <p className="text-sm opacity-90">
            Login to continue to your dashboard.
          </p>
        </div>

        {/* RIGHT */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6">Login</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#34A394] outline-none"
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#34A394] outline-none"
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            
            <RoleDropdown
              value={loginData.role}
              onChange={(role) =>
                setLoginData({ ...loginData, role })
              }
            />

            <button
              type="submit"
              className="w-full bg-[#34A394] hover:bg-[#2C897F] text-white py-3 rounded-lg font-semibold transition"
            >
              Login
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;
