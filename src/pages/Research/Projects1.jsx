import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#6366F1",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#3B82F6",
  "#9333EA",
  "#0EA5E9",
  "#D946EF",
  "#84CC16",
  "#FB923C",
  "#8B5CF6",
  "#F87171",
];

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

      // Sort ongoing by Year (latest first)
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

      // Set default selected year to latest completed projects year
      const completedYears = Object.keys(completedByYear);
      if (completedYears.length > 0) {
        setSelectedYear(completedYears.sort((a, b) => b - a)[0]);
      }
    }

    loadData();
  }, []);

  // Prepare Pie Chart data for ongoing projects (group by "Agency")
  const agencyCountMap = projects.ongoing.reduce((acc, proj) => {
    const agency = proj["Agency"]?.trim() || "Unknown";
    acc[agency] = (acc[agency] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(agencyCountMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value); // Sort descending

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Projects</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("ongoing")}
          className={`px-4 py-2 rounded-lg shadow-md ${
            activeTab === "ongoing"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Ongoing
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-4 py-2 rounded-lg shadow-md ${
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
        <div className="space-y-6">
          {/* Pie Chart */}
          {pieData.length > 0 && (
            <div className="w-full h-96 mb-6">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(1)}%)`
                    }
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} Projects`, "Agency"]} />
                  <Legend
                    formatter={(value) => {
                      const item = pieData.find((d) => d.name === value);
                      return `${value} (${item?.value || 0})`;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Ongoing Projects List */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.ongoing.map((proj, idx) => (
              <div
                key={idx}
                className="p-4 border border-gray-200 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-indigo-700">
                  {proj["Project Title"]}
                </h3>
                <p className="text-gray-600 mt-1">
                  <span className="font-medium">{proj["PI"]}</span>
                  {proj["Co-PI"] ? ` & ${proj["Co-PI"]}` : ""}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {proj["Funding Agency"]} | {proj["Month/Year"]}
                </p>
                {proj["Category"] && (
                  <span className="inline-block mt-3 px-2 py-1 text-xs rounded bg-indigo-100 text-indigo-700">
                    {proj["Category"]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Projects */}
      {activeTab === "completed" && selectedYear && (
        <div>
          {/* Year Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.keys(projects.completed)
              .sort((a, b) => b - a)
              .map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-3 py-1 rounded-lg shadow ${
                    selectedYear === year
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {year}
                </button>
              ))}
          </div>

          {/* Completed Projects List */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.completed[selectedYear].map((proj, idx) => (
              <div
                key={idx}
                className="p-4 border border-gray-200 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-indigo-700">
                  {proj["Project Title"]}
                </h3>
                <p className="text-gray-600 mt-1">
                  <span className="font-medium">
                    {proj["Investigator"] || proj["PI"] || "Unknown"}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {proj["Funding Agency"]} | {proj["Month/Year"]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
