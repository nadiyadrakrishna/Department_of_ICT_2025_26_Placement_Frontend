// import Achievements from "./components/Achivements"
// import Profile from "./components/Admin/Profile"
// import CompanyProfile from "./components/CompanyProfile"
// import CompanyRegistration from "./components/CompanyRegistration"
// import StudentProfile from "./components/Student/StudentProfile"

// const App=()=>{
//   return (
//     // <Achievements/>
//     // <Profile/>
//     // <CompanyRegistration/>
//     // <CompanyProfile/>
//     <StudentProfile/>
//   )
// }

// export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Achievements from "./components/Achivements";
import Profile from "./components/Admin/Profile";
import CompanyProfile from "./components/Company/CompanyProfile";
import CompanyRegistration from "./components/Company/CompanyRegistration";
import StudentProfile from "./components/Student/StudentProfile";
import CompanyLogin from "./components/Company/CompanyLogin";
import CompanyList from "./components/Admin/CompanyList";
import AdminCompanyDetails from "./components/Admin/AdminCompanyDetails";
import CreateJob from "./components/Company/CreateJob";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<CompanyLogin />} />

          {/* Default Home route */}
          <Route path="/" element={<StudentProfile />} />

          {/* Type http://localhost:5173/admin */}
          <Route path="/admin" element={<Profile />} />

          {/* Type http://localhost:5173/register */}
          <Route path="/register" element={<CompanyRegistration />} />

          {/* Type http://localhost:5173/student */}
          <Route path="/student" element={<StudentProfile />} />

          {/* Type http://localhost:5173/company/PASTE_ID_HERE */}
          <Route path="/company/:id" element={<CompanyProfile />} />

          <Route path="/admin/companies" element={<CompanyList />} />
          <Route path="/" element={<h1>Welcome to Placement Portal</h1>} />

          <Route path="/admin/company-details/:id" element={<AdminCompanyDetails />} />

          <Route path="/company/create-job" element={<CreateJob />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;