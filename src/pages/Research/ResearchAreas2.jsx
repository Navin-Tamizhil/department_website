import { useState } from "react";
import researchGroups from "./ResearchGroups1.json";

export default function Research() {
  const [activeGroupId, setActiveGroupId] = useState(null);

  const activeGroup = researchGroups.find((g) => g.id === activeGroupId);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-700 mb-10 text-center">
        Research Groups
      </h1>

      {/* Groups tabs */}
      <div
        className={`flex flex-wrap justify-center gap-6 mb-12 transition-transform duration-700 ease-in-out ${
          activeGroup ? "order-last mt-16" : "order-first"
        }`}
      >
        {researchGroups.map((group) => {
          const isActive = group.id === activeGroupId;
          return (
            <button
              key={group.id}
              onClick={() => setActiveGroupId(isActive ? null : group.id)}
              className={`
                px-5 py-3 rounded-lg font-semibold text-indigo-700
                border-2 border-indigo-700
                transition-transform duration-300
                hover:scale-105 hover:bg-indigo-50
                ${
                  isActive
                    ? "bg-indigo-700 text-white scale-110 shadow-lg"
                    : "bg-white"
                }
                min-w-[280px] text-center
              `}
            >
              {group.name}
            </button>
          );
        })}
      </div>

      {/* Details Section */}
      {activeGroup && (
        <div
          className="max-w-5xl mx-auto bg-gray-50 rounded-xl shadow-lg p-8
            transition-opacity duration-700 ease-in-out opacity-100"
        >
          {/* Enlarged image */}
          <div className="w-full flex justify-center mb-10">
            <img
              src={activeGroup.images}
              alt={activeGroup.name}
              className="max-w-full max-h-[700px] rounded-xl shadow-lg object-contain"
              draggable={false}
            />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-indigo-700 text-center">
            Principal Investigators' Lab Sites
          </h2>

          {/* List of PIs */}
          <ul className="flex flex-wrap justify-center gap-6">
            {activeGroup.professors.map((prof, idx) => (
              <li key={idx}>
                <a
                  href={prof.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-lg hover:text-indigo-700 transition"
                >
                  {prof.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
