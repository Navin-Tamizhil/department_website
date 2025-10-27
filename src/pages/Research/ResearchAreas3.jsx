import { useState } from "react";
import researchGroups from "./ResearchGroups1.json";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function Research() {
  const [activeGroupId, setActiveGroupId] = useState(null);

  const activeGroup = researchGroups.find((g) => g.id === activeGroupId);

  const otherGroups = researchGroups.filter((g) => g.id !== activeGroupId);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 mb-12 text-center">
        Research Groups
      </h1>

      {/* Initial view: all group names */}
      {!activeGroup && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchGroups.map((group) => (
            <div
              key={group.id}
              onClick={() => setActiveGroupId(group.id)}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full transition-all duration-500 group-hover:w-32 group-hover:h-32"></div>
              <h3 className="relative text-xl font-bold text-white transition-colors">{group.name}</h3>
              <div className="relative flex items-center justify-end mt-4 text-sm font-semibold text-indigo-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>View Details</span>
                <ArrowRight className="w-4 h-4 ml-1 transition-transform transform -translate-x-2 group-hover:translate-x-0" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Active group selected */}
      {activeGroup && (
        <div
          className="mt-10 cursor-pointer animate-fadeIn"
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
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-10 max-w-7xl mx-auto border border-gray-200/80">
            {/* Large Image */}
            <div className="relative group flex justify-center mb-8">
              <img
                src={activeGroup.images}
                alt={activeGroup.name}
                className="rounded-xl object-contain mx-auto transition-transform duration-300 group-hover:scale-105"
                style={{
                  maxHeight: "80vh",
                  maxWidth: "90vw",
                  display: "block",
                  userSelect: "none",
                }}
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                <div className="text-center text-white">
                  <ArrowLeft className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-lg font-bold">Click to go back</p>
                </div>
              </div>
            </div>

            {/* PI Lab Links */}
            <div>
              <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                {activeGroup.professors.map((prof, idx) => (
                  <li key={idx}>
                    <a
                      href={prof.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()} // don't close view on link click
                      className="text-blue-600 hover:text-indigo-700 transition font-medium text-lg hover:underline"
                    >
                      {prof.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Other groups container */}
          <div className="max-w-7xl mx-auto p-6 rounded-2xl border border-gray-200 bg-gray-50/80 shadow-md">
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
                  className="px-6 py-3 rounded-full bg-white text-gray-700 text-base font-semibold shadow-sm border border-gray-300
                    hover:bg-gray-100 hover:border-gray-400 transition-all transform hover:scale-105"
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

const styles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
