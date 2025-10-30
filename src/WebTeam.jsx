// src/pages/WebTeam.jsx
import { Users, Mail } from "lucide-react";

const WebTeam = () => {
  // Faculty Mentors
  const faculty = [
    { name: "Dr. Anamika Bhargava", role: "Professor & Head of the Department" },
    { name: "Dr. Abhishek Subramanian", role: "Assistant Professor" },
  ];

  // Supporting Staff
  const staff = [
    { name: "Naveenprasath T", role: "Junior Technician" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="container mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-500">
            BT Web Team
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Department of Biotechnology, IIT Hyderabad
          </p>
        </div>

        {/* Faculty Section */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Users className="w-7 h-7 text-indigo-600" />
            Faculty Mentors
          </h2>
          <ul className="space-y-4">
            {faculty.map((member, index) => (
              <li
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition"
              >
                <p className="font-semibold text-gray-800 text-lg">{member.name}</p>
                <p className="text-sm text-gray-600 mt-1">{member.role}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Staff Section */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Users className="w-7 h-7 text-indigo-600" />
            Supporting Staff
          </h2>
          <ul className="space-y-4">
            {staff.map((member, index) => (
              <li
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition"
              >
                <p className="font-semibold text-gray-800 text-lg">{member.name}</p>
                <p className="text-sm text-gray-600 mt-1">{member.role}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Feedback / Queries Line */}
        <div className="text-center mt-8">
          <p className="text-gray-700 text-sm flex justify-center items-center gap-2">
            For feedback or queries, please contact
            <Mail className="w-4 h-4 text-indigo-600" />
            <a
              href="mailto:naveen@bt.gmail.com"
              className="text-indigo-600 font-medium hover:underline"
            >
              naveenprasth.t@bt.iith.ac.in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WebTeam;
