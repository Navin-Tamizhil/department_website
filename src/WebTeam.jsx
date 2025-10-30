// src/pages/WebTeam.jsx
import { Users, Mail } from "lucide-react";

const WebTeam = () => {
  const teamMembers = [
    { name: "Dr. Anamika Bhargava", role: "Professor and Head Of the Department" },
    { name: "Dr. Abhishek Subramanian", role: "Assistant Professor" },
    { name: "Naveenprasath T", role: "Junior Technician", email: "naveenprasath.t@bt.iith.ac.in" },
  ];


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-500">
            BT Web Team
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            The minds behind the design, development, and maintenance of this website.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Users className="w-7 h-7 text-indigo-600" />
            Meet the Team
          </h2>
          <ul className="space-y-4">
            {teamMembers.map((member, index) => (
              <li key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-800 text-lg">{member.name}</p>
                <p className="text-sm text-gray-600 mt-1">{member.role}</p>
                {member.email && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-indigo-600">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${member.email}`} className="hover:underline">
                      {member.email}
                    </a>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WebTeam;