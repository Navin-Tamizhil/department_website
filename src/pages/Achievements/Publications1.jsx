import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await fetch(`/achivements_excel/publications_data.xlsx`);
      if (res.ok) {
        const buf = await res.arrayBuffer();
        const wb = XLSX.read(buf, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        let rows = XLSX.utils.sheet_to_json(ws, { defval: "" });

        // Sort by year
        rows = rows.sort((a, b) => b.Year - a.Year);

        // Get unique years
        const uniqueYears = [...new Set(rows.map((r) => r.Year))].sort((a, b) => b - a);

        setProjects(rows);
        setYears(uniqueYears);
        setSelectedYear(uniqueYears[0]); // default latest year
      }
    } catch (err) {
      console.error("Error loading projects:", err);
    }
  };

  // Filter projects by selected year
  const filteredProjects = projects.filter((proj) => proj.Year === selectedYear);

  // Group by Agency for pie chart
  const agencyCounts = filteredProjects.reduce((acc, proj) => {
    const agency = proj.Agency || "Unknown";
    acc[agency] = (acc[agency] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(agencyCounts),
    datasets: [
      {
        data: Object.values(agencyCounts),
        backgroundColor: [
          "#6366F1", "#EC4899", "#F59E0B", "#10B981", "#3B82F6", "#EF4444"
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Research Projects 📊</h3>

      {/* Year Filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 rounded-lg border font-medium ${
              selectedYear === year
                ? "bg-indigo-100 border-indigo-500 text-indigo-700"
                : "bg-gray-50 hover:bg-gray-100 border-gray-300"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Pie Chart */}
      <div className="max-w-md mb-10">
        <h4 className="text-lg font-semibold mb-2">Projects per Agency ({selectedYear})</h4>
        <Pie data={pieData} />
      </div>

      {/* Project List */}
      <div className="space-y-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((proj, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition border-l-4 border-indigo-500"
            >
              <p className="font-semibold text-gray-800 mb-1">
                PI: {proj["PI"] || "N/A"}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Project Title:</strong> {proj["Project Title"]}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Month/Year:</strong> {proj["Month/Year"] || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Funding Agency:</strong> {proj["Funding Agency"] || "N/A"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No projects for {selectedYear}.</p>
        )}
      </div>
    </div>
  );
}
