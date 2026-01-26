import { useState } from "react";

const RoleDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const roles = [
    { label: "Student", value: "student" },
    { label: "Company", value: "company" },
    { label: "Admin", value: "admin" },
  ];

  return (
    <div className="relative mb-6">

      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          w-full px-4 py-3 rounded-xl
          border border-[#34A394]
          bg-white flex justify-between items-center
          text-gray-700 font-medium
          focus:ring-2 focus:ring-[#34A394]
        "
      >
        {value
          ? roles.find(r => r.value === value)?.label
          : "Select Role"}
        <span className="text-[#34A394]">▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="
          absolute w-full mt-2 z-10
          bg-white border border-[#34A394]
          rounded-xl shadow-lg overflow-hidden
        ">
          {roles.map(role => (
            <div
              key={role.value}
              onClick={() => {
                onChange(role.value);
                setOpen(false);
              }}
              className={`
                px-4 py-3 cursor-pointer
                transition
                ${
                  value === role.value
                    ? "bg-[#34A394] text-white"
                    : "hover:bg-[#E6F2EF]"
                }
              `}
            >
              {role.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoleDropdown;
