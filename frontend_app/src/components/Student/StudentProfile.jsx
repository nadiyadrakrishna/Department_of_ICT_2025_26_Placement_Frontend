import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaUser,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaGithub,
  FaLinkedin,
  FaEdit,
  FaSave,
  FaCamera,
  FaPlus      
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [completion, setCompletion] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  const YEAR = "2025-26";
  const SPID = "ICT202501";

  useEffect(() => {
    axios
      .get(`http://localhost:3000/student/${YEAR}/${SPID}`)
      .then(res => {
        setStudent(res.data.student);
        setFormData(res.data.student);
        setCompletion(res.data.profileCompletion);
      })
      .catch(err => console.error(err));
  }, []);

  if (!student) return null;

  /* ================= HANDLERS ================= */

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, Image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
  try {
    const res = await axios.put(
      `http://localhost:3000/student/update/${student._id}`,
      formData
    );

    // IMPORTANT: use backend response
    setStudent(res.data.student || formData);
    setFormData(res.data.student || formData);
    setEditMode(false);
  } catch (err) {
    console.error("Profile update failed", err);
  }
};


  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F5F2] to-[#D9F1EC] px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* ================= LEFT CARD ================= */}
        <div className="rounded-3xl bg-gradient-to-br from-[#2FAE9E] to-[#238F82] p-6 text-white shadow-xl">
          <div className="flex flex-col items-center">

            {/* PROFILE IMAGE */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
                <img
                  src={formData.Image || "/profile.png"}
                  className="w-full h-full object-cover"
                />
              </div>

              {editMode && (
                <label className="absolute bottom-2 right-2 bg-white text-[#2FAE9E] p-2 rounded-full cursor-pointer shadow">
                  <FaCamera />
                  <input type="file" hidden onChange={handleImageChange} />
                </label>
              )}
            </div>

            <h2 className="mt-4 text-xl font-semibold">Student</h2>
            <p className="text-sm opacity-90">ICT Student</p>

            {/* EDIT / SAVE BUTTON */}
            <button
                onClick={() => editMode ? handleSaveProfile() : setEditMode(true)}
                className="mt-4 flex items-center gap-2 bg-[#1F8F82] hover:bg-[#18766C] transition px-5 py-2 rounded-full text-sm font-semibold text-white shadow"
              >
                {editMode ? <><FaSave /> Save Profile</> : <><FaEdit /> Edit Profile</>}
              </button>
          </div>

          <div className="mt-8 space-y-3 text-sm">
            <EditableField
              icon={<FaPhoneAlt />}
              name="Phone"
              value={formData.Phone}
              editMode={editMode}
              onChange={handleChange}
            />

            <EditableField
              icon={<FaMapMarkerAlt />}
              name="Area"
              value={formData.Area}
              editMode={editMode}
              onChange={handleChange}
            />

            <EditableField
              icon={<FaGraduationCap />}
              name="Course"
              value={formData.Course}
              editMode={editMode}
              onChange={handleChange}
            />

            <Info icon={<FaEnvelope />} value={student.Personal_Email} />
            <Info icon={<FaUser />} value={student.Gender} />
          </div>


          {/* SOCIAL LINKS */}
          <div className="mt-6 space-y-3">
            {editMode ? (
              <>
                <Input
                  icon={<FaGithub />}
                  name="Github_Link"
                  value={formData.Github_Link || ""}
                  placeholder="GitHub link"
                  onChange={handleChange}
                />
                <Input
                  icon={<FaLinkedin />}
                  name="Linkedin_Link"
                  value={formData.Linkedin_Link || ""}
                  placeholder="LinkedIn link"
                  onChange={handleChange}
                />
              </>
            ) : (
              <div className="flex justify-center gap-6 text-xl">
                {student.Github_Link && <a href={student.Github_Link} target="_blank"><FaGithub /></a>}
                {student.Linkedin_Link && <a href={student.Linkedin_Link} target="_blank"><FaLinkedin /></a>}
              </div>
            )}
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="lg:col-span-3 space-y-6">

          {/* PROFILE COMPLETION */}
          <div className="relative rounded-3xl bg-gradient-to-r from-[#238F82] to-[#2FAE9E] p-8 text-white shadow-xl">
            <h2 className="text-2xl font-semibold">Profile Completion</h2>
            <p className="text-sm opacity-90">Complete your profile to improve visibility</p>

            <div className="absolute right-8 top-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-[#2FAE9E] shadow-lg">
              {completion}%
            </div>
          </div>

          {/* ABOUT */}
          <Section title="About">
            {editMode ? (
              <textarea
                name="Description"
                value={formData.Description || ""}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 text-sm"
              />
            ) : (
              student.Description || "No description added"
            )}
          </Section>

          {/* SKILLS */}
          <Section
            title="Skills"
            onAdd={() => navigate("/student/skills/add")}
            onEdit={() => navigate("/student/skills/edit")}
          >
            No skills added
          </Section>

          {/* EXPERIENCE */}
          <Section
            title="Experience"
            onAdd={() => navigate("/student/experience/add")}
            onEdit={() => navigate("/student/experience/edit")}
          >
            No experience added
          </Section>

          {/* CERTIFICATIONS */}
          <Section
            title="Certifications"
            onAdd={() => navigate("/student/certificates/add")}
            onEdit={() => navigate("/student/certificates/edit")}
          >
            No certifications added
          </Section>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

const EditableField = ({ icon, name, value, editMode, onChange }) => (
  <div className="flex items-center gap-3 bg-white/15 p-3 rounded-xl">
    <span className="text-lg">{icon}</span>

    {editMode ? (
      <input
        name={name}
        value={value || ""}
        onChange={onChange}
        className="bg-transparent border-b border-white/50 outline-none w-full text-sm"
      />
    ) : (
      <span className="truncate">{value}</span>
    )}
  </div>
);


const Info = ({ icon, value }) => (
  <div className="flex items-center gap-3 bg-white/15 p-3 rounded-xl">
    <span className="text-lg">{icon}</span>
    <span className="truncate">{value}</span>
  </div>
);

const Input = ({ icon, ...props }) => (
  <div className="flex items-center gap-3 bg-white/15 p-3 rounded-xl">
    <span>{icon}</span>
    <input
      {...props}
      className="bg-transparent outline-none w-full text-sm placeholder-white/70"
    />
  </div>
);

const Section = ({ title, children, onAdd, onEdit }) => (
  <div className="bg-white rounded-2xl shadow p-6 border border-[#CFEDEA]">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-semibold">{title}</h3>

      <div className="flex gap-4 text-sm">
        {onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center gap-1 text-[#2FAE9E] font-medium hover:underline"
          >
            <FaPlus size={12} />
          </button>
        )}

        {onEdit && (
          <button
            onClick={onEdit}
            className="flex items-center gap-1 text-[#2FAE9E] font-medium hover:underline"
          >
            <FaEdit size={12} />
          </button>
        )}
      </div>
    </div>

    <p className="text-gray-600 text-sm">{children}</p>
  </div>
);
