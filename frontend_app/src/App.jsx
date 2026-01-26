import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import StudentProfile from "./components/Student/StudentProfile";
import StudentSkills from "./components/Student/StudentSkills";
import CompanyProfile from "./components/CompanyProfile";
import CompanyRegistration from "./components/CompanyRegistration";
import Profile from "./components/Admin/Profile";
import AdminAnnouncements from "./components/AdminAnnouncements";
import StudentAnnouncements from "./components/StudentAnnouncements";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* STUDENT */}
      <Route path="/student/studentprofile" element={<StudentProfile />} />
      <Route path="/student/announcements" element={<StudentAnnouncements />} />
      <Route path="/student/skills/add" element={<StudentSkills />} />
      <Route path="/student/skills/edit" element={<StudentSkills />} />

      {/* COMPANY */}
      <Route path="/company/profile" element={<CompanyProfile />} />
      <Route path="/company/register" element={<CompanyRegistration />} />

      {/* ADMIN */}
      <Route path="/admin/profile" element={<Profile />} />
      <Route path="/admin/announcements" element={<AdminAnnouncements />} />
    </Routes>
  );
};

export default App;
