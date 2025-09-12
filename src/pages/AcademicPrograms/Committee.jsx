// src/pages/Academics/Committees.jsx
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Committees() {
  const [openCommittee, setOpenCommittee] = useState(null);

  const committees = [
    {
      name: "Departmental Post-Graduate Committee (DPGC)",
      members: [
        "Dr Gunjan Mehta - Convener",
        "Prof. Anamika Bhargava (Ex officio, HOD) - Member",
        "Prof. Anindya Roy - Member",
        "Prof. Rajakumara Eerappa - Member",
        "Ms Sambita Laha (BT25MTECH14011) - Student Member MTech",
        "Ms Krutideepa Rout (BT24RESCH11008) - Student Member PhD",
      ],
      responsibilities: [
        "Oversee Masters and PhD curriculum implementation keeping track of changes/updates if any.",
        "Coordinating the offering of necessary courses/electives to meet the curriculum requirements for Masters/PhD students.",
        "Assigning duties to the TA category students.",
        "Coordinating the guide selection and allotment exercise.",
        "Coordinating the admissions for Masters and PhD programs.",
        "Handling conversion requests (BTech → BTech+MTech, MTech → MTech+PhD, etc.).",
        "Act as first contact point/mediator for guide-student issues.",
        "Act as member of SPGC.",
      ],
    },
    {
      name: "Departmental Under-Graduate Committee (DUGC)",
      members: [
        "Dr Rahul Kumar - Convener",
        "Prof. Anamika Bhargava (Ex officio, HOD) - Member",
        "Prof. Thenmalarchelvi Rathinavelan - Member",
        "Dr Sandipan Ray - Member",
        "Dr Avanthi Althuri - Member",
        "Dr Abhishek Subramanian - Member",
        "Mr Vasishta Krishna Chandrahas (BT24BTECH11025) - Student Member BTech",
      ],
      responsibilities: [
        "Oversee BTech/BDes curriculum implementation.",
        "Coordinate floating of necessary courses/electives for BTech, Minor, Honors, etc.",
        "Assist Faculty Advisors (special cases: double major, long leaves, etc.).",
        "Ensure timely execution of duties by Faculty Advisors.",
        "Assign duties to BTech TAs.",
        "Act as Member of SUGC.",
      ],
    },
  ];

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
                  <h4 className="font-medium text-gray-700 mb-2">Members</h4>
                  <ul className="list-disc pl-6 text-gray-600 space-y-1">
                    {committee.members.map((member, i) => (
                      <li key={i}>{member}</li>
                    ))}
                  </ul>
                </div>

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
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
