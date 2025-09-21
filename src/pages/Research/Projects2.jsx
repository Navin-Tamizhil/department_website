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
      const res = await fetch("/research_excel/ongoing_projects.xlsx"); // ✅ Use correct file path
      if (res.ok) {
        const buf = await res.arrayBuffer();
        const wb = XLSX.read(buf, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });

        // Clean and map rows
        const cleaned = rows.map((r) => ({
          Year: r["Year"],
          PI: r["PI"],
          CoPI: r["Co-PI"],
          Agency: (r["Agency"] || "").trim(),
          FundingAgency: r["Funding Agency"],
          ProjectTitle: r["Project Title"],
          MonthYear: r["Month/Year"],
        }));

        // Sort and get unique years
        cleaned.sort((a, b) => b.Year - a.Year);
        const uniqueYears = [...new Set(cleaned.map((r) => r.Year))].sort((a, b) => b - a);

        setProjects(cleaned);
        setYears(uniqueYears);
        setSelectedYear(uniqueYears[0]);
      }
    } catch (err) {
      console.error("Failed to load Excel data:", err);
    }
  };

  const filteredProjects = projects.filter((p) => p.Year === selectedYear);

  // ✅ GROUPING Agencies by count
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
          "#6366F1", "#EC4899", "#F59E0B", "#10B981", "#3B82F6", "#EF4444", "#8B5CF6",
          "#14B8A6", "#F43F5E", "#EAB308", "#A78BFA", "#06B6D4", "#F87171", "#4ADE80",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h3 className="text-2xl font-bold mb-6">Research Projects 📊</h3>

      {/* Year Selector */}
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
        <h4 className="text-lg font-semibold mb-2">
          Projects per Agency ({selectedYear})
        </h4>
        {Object.keys(agencyCounts).length > 0 ? (
          <Pie data={pieData} />
        ) : (
          <p className="text-gray-500">No data for this year.</p>
        )}
      </div>

      {/* Project Cards */}
      <div className="space-y-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition border-l-4 border-indigo-500"
            >
              <p className="font-semibold text-gray-800 mb-1">
                PI: {project.PI || "N/A"}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Project Title:</strong> {project.ProjectTitle || "N/A"}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Month/Year:</strong> {project.MonthYear || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Funding Agency:</strong> {project.FundingAgency || "N/A"}
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
