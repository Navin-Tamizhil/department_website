import { useState } from "react";

export default function Projects() {
  const projects = {
    ongoing: [
      { title: "", start: 2023 },
      { title: "", start: 2022 },
      { title: "", start: 2024 },
    ],
    completed: {
      2023: [
        "",
        "",
      ],
      2022: [
        
      ],
      2021: [
        
      ],
    },
  };

  const [activeTab, setActiveTab] = useState("ongoing");
  const [selectedYear, setSelectedYear] = useState(
    Object.keys(projects.completed)[0]
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Projects</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("ongoing")}
          className={`px-4 py-2 rounded ${
            activeTab === "ongoing"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Ongoing
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-4 py-2 rounded ${
            activeTab === "completed"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Completed
        </button>
      </div>

      {/* Ongoing Projects */}
      {activeTab === "ongoing" && (
        <ul className="list-disc ml-6 space-y-2">
          {projects.ongoing.map((proj, idx) => (
            <li key={idx}>
              {proj.title} <span className="text-gray-500">(Started {proj.start})</span>
            </li>
          ))}
        </ul>
      )}

      {/* Completed Projects by Year */}
      {activeTab === "completed" && (
        <div>
          {/* Year Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.keys(projects.completed)
              .sort((a, b) => b - a) // latest year first
              .map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-3 py-1 rounded ${
                    selectedYear === year
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {year}
                </button>
              ))}
          </div>

          {/* Projects List */}
          <ul className="list-disc ml-6 space-y-2">
            {projects.completed[selectedYear].map((proj, idx) => (
              <li key={idx}>{proj}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
