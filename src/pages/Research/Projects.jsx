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
      const res = await fetch("/research_excel/projects_all.xlsx");
      if (!res.ok) throw new Error("HTTP error " + res.status);

      const buf = await res.arrayBuffer();
      const wb = XLSX.read(buf, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });

      const cleaned = rows.map((r) => ({
        Year: r["Year"],
        FundingAgency: (r["Funding Agency"] || "").trim(),
        ProjectTitle: r["Project Title"] || "",
      }));

      cleaned.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
      const uniqueYears = [...new Set(cleaned.map((r) => r.Year))].sort(
        (a, b) => parseInt(b) - parseInt(a)
      );

      setProjects(cleaned);
      setYears(uniqueYears);
      setSelectedYear(uniqueYears[0]);
    } catch (err) {
      console.error("Failed to load Excel data:", err);
    }
  };

  const filteredProjects = projects.filter((p) => p.Year === selectedYear);

  const fundingCounts = filteredProjects.reduce((acc, proj) => {
    const fa = proj.FundingAgency || "Unknown";
    acc[fa] = (acc[fa] || 0) + 1;
    return acc;
  }, {});

  // Calculate percentages for the pie chart labels
  const totalProjects = Object.values(fundingCounts).reduce(
    (a, b) => a + b,
    0
  );

  // Chart.js options to show percentages on tooltip and labels
  const pieOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const percentage = ((value / totalProjects) * 100).toFixed(1);
            return `${label}: ${percentage}% (${value})`;
          },
        },
      },
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 18,
          padding: 15,
        },
      },
    },
  };

  const pieData = {
    labels: Object.keys(fundingCounts),
    datasets: [
      {
        label: "Projects by Funding Agency",
        data: Object.values(fundingCounts),
        backgroundColor: [
          "#6366F1", "#EC4899", "#F59E0B", "#10B981",
          "#3B82F6", "#EF4444", "#8B5CF6", "#14B8A6",
          "#F43F5E", "#EAB308", "#A78BFA", "#06B6D4",
          "#F87171", "#4ADE80",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h3 className="text-3xl font-bold mb-8 text-center text-indigo-700">
        Research Projects
      </h3>

      

      {/* Centered Pie Chart */}
      <div className="flex justify-center mb-12">
        <div className="w-full max-w-md">
          <h4 className="text-lg font-semibold mb-4 text-center text-gray-700">
            Projects by Funding Agency 
          </h4>
          {Object.keys(fundingCounts).length > 0 ? (
            <Pie data={pieData} options={pieOptions} />
          ) : (
            <p className="text-center text-gray-500">No data for this year.</p>
          )}
        </div>
      </div>

      {/* Artistic Project Titles with Funding Agency name */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <div
              key={index}
              className="p-6 bg-gradient-to-br from-indigo-50 to-green-50 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <p className="text-indigo-600 text-center font-semibold mb-1 uppercase tracking-wider text-sm">
                {project.FundingAgency || "Unknown Agency"}
              </p>
              <p className="text-indigo-800 text-lg font-semibold text-center italic tracking-wide">
                {project.ProjectTitle || "Untitled Project"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No projects found for {selectedYear}.
          </p>
        )}
      </div>
    </div>
  );
}
