import { useState } from "react";
import researchGroups from "./ResearchGroups.json";


export default function Research() {
  const [activeGroup, setActiveGroup] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Research Groups</h1>

      {/* Flip Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {researchGroups.map((group) => (
          <div
            key={group.id}
            className="w-full h-80 perspective"
            onClick={() =>
              setActiveGroup(activeGroup === group.id ? null : group.id)
            }
          >
            <div
              className={`relative w-full h-full duration-700 preserve-3d cursor-pointer ${
                activeGroup === group.id ? "rotate-y-180" : ""
              }`}
            >
              {/* Front */}
              <div className="absolute w-full h-full bg-indigo-600 text-white flex items-center justify-center rounded-xl shadow-lg backface-hidden">
                <h2 className="text-xl font-semibold">{group.name}</h2>
              </div>

              {/* Back → Only Professors */}
              <div className="absolute w-full h-full bg-white rounded-xl shadow-lg p-4 overflow-y-auto backface-hidden rotate-y-180">
                <h3 className="text-lg font-bold mb-2 text-indigo-700">
                  Professors
                </h3>
                <ul className="space-y-2">
                  {group.professors.map((prof, idx) => (
                    <li key={idx}>
                      <a
                        href={prof.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {prof.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      
          {/* Details Section with Animation */}
          <div
            className={`transition-all duration-700 ease-in-out overflow-hidden ${
              activeGroup ? "max-h-[1000px] opacity-100 mt-8" : "max-h-0 opacity-0"
            }`}
          >
            {activeGroup && (
              <div className="bg-gray-50 p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                  {researchGroups.find((g) => g.id === activeGroup).name}
                </h2>

                {/* Bullet Points */}
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  {researchGroups
                    .find((g) => g.id === activeGroup)
                    .description.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                </ul>

                {/* Images */}
                {researchGroups.find((g) => g.id === activeGroup).images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {researchGroups
                      .find((g) => g.id === activeGroup)
                      .images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="Research visual"
                          className="rounded-lg object-cover h-32 w-full"
                        />
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>

    </div>
  );
}
