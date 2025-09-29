import { useState } from "react";
import researchGroups from "./ResearchGroups1.json";

export default function Research() {
  const [activeGroupId, setActiveGroupId] = useState(null);

  const activeGroup = researchGroups.find((g) => g.id === activeGroupId);

  const otherGroups = researchGroups.filter((g) => g.id !== activeGroupId);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-700 mb-10 text-center">
        Research Groups
      </h1>

      {/* Initial view: all group names */}
      {!activeGroup && (
        <div className="flex flex-wrap justify-center gap-6">
          {researchGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => setActiveGroupId(group.id)}
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white text-lg font-semibold shadow-md
                hover:bg-indigo-700 transition"
            >
              {group.name}
            </button>
          ))}
        </div>
      )}

      {/* Active group selected */}
      {activeGroup && (
        <div
          className="mt-10 cursor-pointer"
          onClick={() => setActiveGroupId(null)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setActiveGroupId(null)}
        >
           {/* Group Name - displayed once at the top */}
    <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
      {activeGroup.name}
    </h2>
          {/* Image + PI Labs container */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-10 max-w-7xl mx-auto">
            {/* Large Image */}
            <div className="flex justify-center mb-8">
              <img
                src={activeGroup.images}
                alt={activeGroup.name}
                className="rounded-xl object-contain mx-auto"
                style={{
                  maxHeight: "80vh",
                  maxWidth: "90vw",
                  display: "block",
                  userSelect: "none",
                }}
                draggable={false}
              />
            </div>

            {/* PI Lab Links */}
            <div>
             
              <ul className="flex flex-wrap justify-center gap-6">
                {activeGroup.professors.map((prof, idx) => (
                  <li key={idx}>
                    <a
                      href={prof.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()} // don't close view on link click
                      className="text-blue-600 underline text-lg hover:text-indigo-700 transition"
                    >
                      {prof.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Other groups container */}
          <div className="max-w-7xl mx-auto p-4 rounded-lg border border-gray-200 bg-gray-50 shadow-sm">
            <h4 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              Other Research Groups
            </h4>
            <div className="flex flex-wrap justify-center gap-6">
              {otherGroups.map((group) => (
                <button
                  key={group.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveGroupId(group.id);
                  }}
                  className="px-6 py-3 rounded-xl bg-gray-200 text-gray-700 text-lg font-semibold shadow-md
                    hover:bg-gray-300 transition"
                >
                  {group.name}
                </button>
              ))}
            </div>
          </div>

         
        </div>
      )}
    </div>
  );
}

