import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

export default function Projects() {
  const [projects, setProjects] = useState({ ongoing: [], completed: {} });
  const [activeTab, setActiveTab] = useState("ongoing");
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    async function loadData() {
      // Load Ongoing Projects
      const ongoingRes = await fetch("/research_excel/ongoing_projects.xlsx");
      const ongoingBuffer = await ongoingRes.arrayBuffer();
      const ongoingWB = XLSX.read(ongoingBuffer, { type: "array" });
      const ongoingSheet = ongoingWB.Sheets[ongoingWB.SheetNames[0]];
      let ongoingData = XLSX.utils.sheet_to_json(ongoingSheet);

      // Sort ongoing by year (latest first)
      ongoingData = ongoingData.sort((a, b) => b["Year"] - a["Year"]);

      // Load Completed Projects
      const completedRes = await fetch("/research_excel/completed_projects.xlsx");
      const completedBuffer = await completedRes.arrayBuffer();
      const completedWB = XLSX.read(completedBuffer, { type: "array" });
      const completedSheet = completedWB.Sheets[completedWB.SheetNames[0]];
      const completedData = XLSX.utils.sheet_to_json(completedSheet);

      // Organize completed by year
      const completedByYear = {};
      completedData.forEach((proj) => {
        const year = proj["Year"];
        if (!completedByYear[year]) completedByYear[year] = [];
        completedByYear[year].push(proj);
      });

      setProjects({ ongoing: ongoingData, completed: completedByYear });
      setSelectedYear(Object.keys(completedByYear).sort((a, b) => b - a)[0]);
    }

    loadData();
  }, []);

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
        <ul className="list-disc ml-6 space-y-3">
          {projects.ongoing.map((proj, idx) => (
            <li key={idx} className="leading-relaxed">
              <span className="font-semibold text-indigo-700">{proj["PI"]}</span>
              {proj["Co-PI"] ? ` & ${proj["Co-PI"]}` : ""}:{" "}
              <span className="italic">{proj["Project Title"]}</span>
              <br />
              <span className="text-gray-700">{proj["Funding Agency"]}</span> |{" "}
              <span className="text-gray-500">{proj["Month/Year"]}</span> |{" "}
              <span className="text-green-700 font-medium">₹{proj["Amount"]}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Completed Projects */}
      {activeTab === "completed" && selectedYear && (
        <div>
          {/* Year Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.keys(projects.completed)
              .sort((a, b) => b - a)
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
          <ul className="list-disc ml-6 space-y-3">
            {projects.completed[selectedYear].map((proj, idx) => (
              <li key={idx} className="leading-relaxed">
                <span className="font-semibold text-indigo-700">{proj["Investigator"]}</span>:{" "}
                <span className="italic">{proj["Project Title"]}</span>
                <br />
                <span className="text-gray-700">{proj["Funding Agency"]}</span> |{" "}
                <span className="text-gray-500">{proj["Month/Year"]}</span> |{" "}
                <span className="text-green-700 font-medium">
                  ₹{proj["Amount (Lakhs)"]} Lakhs
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
