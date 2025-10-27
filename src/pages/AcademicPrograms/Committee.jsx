// src/pages/Academics/Committees.jsx
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { committees } from "./committeeData"; // Import the committees data

export default function Committees() {
  const [openCommittee, setOpenCommittee] = useState(null);

  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">Committees</h2>

      <div className="space-y-6">
        {committees.map((committee, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl shadow-sm overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() =>
                setOpenCommittee(openCommittee === index ? null : index)
              }
              className="w-full flex justify-between items-center px-6 py-4 bg-gradient-to-r from-indigo-50 to-white hover:from-indigo-100 transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {committee.name}
              </h3>
              {openCommittee === index ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Dropdown content */}
            {openCommittee === index && (
              <div className="p-6 space-y-6 bg-white">
                <div>
                  {Array.isArray(committee.members) ? (
                    <ul className="list-disc pl-6 text-gray-600 space-y-1">
                      {committee.members.map((member, i) => (
                        <li key={i}>{member}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="space-y-4">
                      {committee.members.convener && (
                        <div>
                          <p className="font-semibold text-gray-700">
                            Convener
                          </p>
                          <p className="text-gray-600 pl-4">
                            {committee.members.convener}
                          </p>
                        </div>
                      )}
                      {committee.members.faculty &&
                        committee.members.faculty.length > 0 && (
                          <div>
                            <p className="font-semibold text-gray-700">
                              Faculty Members
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 space-y-1">
                              {committee.members.faculty.map((member, i) => (
                                <li key={`faculty-${i}`}>{member}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      {committee.members.students &&
                        committee.members.students.length > 0 && (
                          <div>
                            <p className="font-semibold text-gray-700">
                              Student Members
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 space-y-1">
                              {committee.members.students.map((member, i) => (
                                <li key={`student-${i}`}>{member}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </div>
                  )}
                </div>

                {committee.responsibilities &&
                  committee.responsibilities.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">
                        Responsibilities
                      </h4>
                      <ul className="list-disc pl-6 text-gray-600 space-y-1">
                        {committee.responsibilities.map((task, i) => (
                          <li key={i}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
