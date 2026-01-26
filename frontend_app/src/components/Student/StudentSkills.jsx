import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash, FaSave } from "react-icons/fa";

const StudentSkills = () => {
  const STUDENT_ID = "PUT_STUDENT_OBJECT_ID_HERE";

  const [skillsData, setSkillsData] = useState(null);
  const [newSkill, setNewSkill] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [skills, setSkills] = useState([]);
  const [parttime, setParttime] = useState(false);

  /* ================= FETCH SKILLS ================= */

  useEffect(() => {
    axios
      .get(`http://localhost:3000/student/skills/${STUDENT_ID}`)
      .then(res => {
        if (res.data) {
          setSkillsData(res.data);
          setSkills(res.data.skills || []);
          setParttime(res.data.parttime || false);
        }
      })
      .catch(() => {});
  }, []);

  /* ================= HANDLERS ================= */

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setSkills([...skills, newSkill.trim()]);
    setNewSkill("");
  };

  const removeSkill = index => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const saveSkills = async () => {
    try {
      if (skillsData) {
        // UPDATE
        await axios.put(
          `http://localhost:3000/student/skills/${skillsData._id}`,
          { skills, parttime }
        );
      } else {
        // CREATE
        await axios.post(`http://localhost:3000/student/skills`, {
          studentId: STUDENT_ID,
          skills,
          parttime
        });
      }

      setEditMode(false);
      alert("Skills saved successfully");
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F5F2] to-[#D9F1EC] px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Skills</h2>

          <button
            onClick={() => editMode ? saveSkills() : setEditMode(true)}
            className="flex items-center gap-2 bg-[#2FAE9E] hover:bg-[#238F82] text-white px-4 py-2 rounded-full text-sm font-medium"
          >
            {editMode ? <><FaSave /> Save</> : <><FaEdit /> Edit</>}
          </button>
        </div>

        {/* SKILLS LIST */}
        <div className="flex flex-wrap gap-3 mb-6">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-[#E6F5F2] px-4 py-2 rounded-full text-sm font-medium"
              >
                {skill}

                {editMode && (
                  <button onClick={() => removeSkill(index)}>
                    <FaTrash className="text-red-500 text-xs" />
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No skills added</p>
          )}
        </div>

        {/* ADD SKILL */}
        {editMode && (
          <div className="flex gap-3 mb-6">
            <input
              value={newSkill}
              onChange={e => setNewSkill(e.target.value)}
              placeholder="Enter skill (e.g. React)"
              className="flex-1 border rounded-full px-4 py-2 text-sm"
            />

            <button
              onClick={addSkill}
              className="flex items-center gap-1 bg-[#2FAE9E] text-white px-4 py-2 rounded-full text-sm"
            >
              <FaPlus /> Add
            </button>
          </div>
        )}

        {/* PART TIME */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={parttime}
            disabled={!editMode}
            onChange={e => setParttime(e.target.checked)}
          />
          <span className="text-sm text-gray-700">
            Available for part-time work
          </span>
        </div>

      </div>
    </div>
  );
};

export default StudentSkills;
