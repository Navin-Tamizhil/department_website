// src/pages/WebTeam.jsx
import { Users } from "lucide-react";

const WebTeam = () => {
  const faculty = [
    { name: "Dr. Anamika Bhargava", role: "Professor and Head of the Department" },
    { name: "Dr. Abhishek Subramanian", role: "Assistant Professor" },
  ];

  const staff = [
    { name: "Naveenprasath T", role: "Junior Technician" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-500">
            BT Web Team
          </h1>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          {/* Faculty Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <Users className="w-7 h-7 text-indigo-600" />
              Faculty
            </h2>
            <ul className="space-y-4">
              {faculty.map((member, index) => (
                <li key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="font-semibold text-gray-800 text-lg">{member.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{member.role}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Staff Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <Users className="w-7 h-7 text-indigo-600" />
              Staff
            </h2>
            <ul className="space-y-4">
              {staff.map((member, index) => (
                <li key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="font-semibold text-gray-800 text-lg">{member.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{member.role}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebTeam;