import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

export default function Students() {
  const tabs = [
    { key: "btech", label: "B.Tech." },
    { key: "mtech", label: "M.Tech." },
    { key: "phd", label: "Ph.D." },
    { key: "stats", label: "Statistics" },
  ];

  const [activeTab, setActiveTab] = useState("btech");
  const [selectedYear, setSelectedYear] = useState(null);
  const [data, setData] = useState({ btech: [], mtech: [], phd: [] });

  useEffect(() => {
    loadData();
  }, []);

  const capitalizeName = (name) => {
    if (!name) return "";
    return name
      .toString()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  };

  const loadData = async () => {
    const files = [
      "btech_2022.csv",
      "btech_2023.csv",
      "btech_2024.csv",
      "mtech_2024.csv",
      "phd_2017_july.csv",
      "phd_2020_january.csv",
      "phd_2021_july.csv",
      "phd_2023_january.csv",
      "phd_2024_july.csv",
      "phd_2015_january.csv",
      "phd_2018_july.csv",
      "phd_2020_july.csv",
      "phd_2022_january.csv",
      "phd_2023_july.csv",
      "phd_2025_january.csv",
      "phd_2017_january.csv",
      "phd_2019_january.csv",
      "phd_2021_january.csv",
      "phd_2022_july.csv",
      "phd_2024_january.csv",
    ];

    const newData = { btech: [], mtech: [], phd: [] };

    for (const file of files) {
      try {
        const res = await fetch(`/students_excel/${file}`);
        if (!res.ok) continue;
        const text = await res.text();

        const rows = text.split("\n").map((r) => r.trim()).filter((r) => r);
        const students = rows.map((r) => capitalizeName(r));

        if (file.startsWith("btech")) {
          const year = parseInt(file.match(/btech_(\d+)/)[1], 10);
          newData.btech.push({ year, students });
        } else if (file.startsWith("mtech")) {
          const year = parseInt(file.match(/mtech_(\d+)/)[1], 10);
          newData.mtech.push({ year, students });
        } else if (file.startsWith("phd")) {
          const [, year, batch] = file.match(/phd_(\d+)_(january|july)/);
          const batchName = batch.charAt(0).toUpperCase() + batch.slice(1);
          newData.phd.push({ year: parseInt(year, 10), batch: batchName, students });
        }
      } catch (err) {
        console.error("Error loading", file, err);
      }
    }

    newData.btech.sort((a, b) => a.year - b.year);
    newData.mtech.sort((a, b) => a.year - b.year);
    newData.phd.sort((a, b) =>
      a.year === b.year ? (a.batch === "January" ? -1 : 1) : a.year - b.year
    );

    setData(newData);
  };

  const getYears = (tab) => {
    if (tab === "btech") return ["2022-2026", "2023-2027", "2024-2028"];
    if (tab === "mtech") return ["2024-2026"];
    if (tab === "phd") return [...new Set(data.phd.map((b) => b.year))];
    return [];
  };

  const getStudents = (tab, year) => {
    if (tab === "btech") {
      const startYear = parseInt(year.split("-")[0], 10);
      return data.btech.find((b) => b.year === startYear)?.students || [];
    }
    if (tab === "mtech") {
      const startYear = parseInt(year.split("-")[0], 10);
      return data.mtech.find((m) => m.year === startYear)?.students || [];
    }
    if (tab === "phd") {
      return data.phd.filter((b) => b.year === year);
    }
    return [];
  };

  // 🎨 Colors (3 main colors + lighter variations)
  const COLOR_SCHEME = {
    btech: ["#0f78beff", "#719ab8ff"], // Indigo + light indigo
    mtech: ["#10B981", "#6EE7B7"], // Emerald + light green
    phd: ["#e99a11ff", "#FCD34D"],   // Amber + light amber
  };

  // Stats data for charts
  const statsData = () => {
    const btech = data.btech.map((b, i) => ({
      course: `B.Tech ${b.year}`,
      count: b.students.length,
      color: COLOR_SCHEME.btech[i % 2],
    }));
    const mtech = data.mtech.map((m, i) => ({
      course: `M.Tech ${m.year}`,
      count: m.students.length,
      color: COLOR_SCHEME.mtech[i % 2],
    }));
    const phd = data.phd.map((p, i) => ({
      course: `Ph.D ${p.year}-${p.batch}`,
      count: p.students.length,
      color: COLOR_SCHEME.phd[i % 2],
    }));
    return [...btech, ...mtech, ...phd];
  };

  // Pie chart totals
  const totalCounts = {
    btech: data.btech.reduce((a, b) => a + b.students.length, 0),
    mtech: data.mtech.reduce((a, b) => a + b.students.length, 0),
    phd: data.phd.reduce((a, b) => a + b.students.length, 0),
  };
  const grandTotal = totalCounts.btech + totalCounts.mtech + totalCounts.phd;

  const pieData = [
    { name: "B.Tech", value: totalCounts.btech, color: COLOR_SCHEME.btech[0] },
    { name: "M.Tech", value: totalCounts.mtech, color: COLOR_SCHEME.mtech[0] },
    { name: "Ph.D.", value: totalCounts.phd, color: COLOR_SCHEME.phd[0] },
  ];

  return (
    <section className="container mx-auto px-8 py-16">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-indigo-700 tracking-wide drop-shadow-lg">
        Meet Our Students </h1>

      {/* Tabs */}
      <div className="flex gap-6 mb-10 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setSelectedYear(null);
            }}
            className={`px-5 py-2 font-semibold border-b-2 transition ${
              activeTab === tab.key
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-600 hover:text-indigo-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Year buttons */}
      {activeTab !== "stats" && (
        <div className="flex flex-wrap gap-3 mb-8">
          {getYears(activeTab).map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-5 py-2 rounded-lg border font-medium shadow-sm transition ${
                selectedYear === year
                  ? "bg-indigo-100 border-indigo-500 text-indigo-700"
                  : "bg-gray-50 hover:bg-gray-100 border-gray-300"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      )}

      {/* Student list - only render if students exist */}
      {selectedYear && activeTab !== "stats" && (() => {
        if (activeTab === "phd") {
          const janStudents = getStudents("phd", selectedYear).find(b => b.batch === "January")?.students || [];
          const julStudents = getStudents("phd", selectedYear).find(b => b.batch === "July")?.students || [];

          if (janStudents.length === 0 && julStudents.length === 0) {
            return null; // No students in either batch, don't show section
          }

          return (
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4 text-indigo-700">
                {tabs.find(t => t.key === activeTab)?.label} – {selectedYear}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {["January", "July"].map((batch) => {
                  const students = getStudents("phd", selectedYear).find(b => b.batch === batch)?.students || [];
                  if (students.length === 0) return null; // Skip batch with no students

                  return (
                    <div key={batch}>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        {selectedYear} – {batch}
                      </h4>
                      <ul className="list-disc ml-6 space-y-1">
                        {students.map((s, j) => (
                          <li key={j}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        } else {
          const students = getStudents(activeTab, selectedYear);
          if (students.length === 0) return null; // No students, don't show section

          return (
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4 text-indigo-700">
                {tabs.find(t => t.key === activeTab)?.label} – {selectedYear}
              </h3>
              <ul className="list-disc ml-6 space-y-1">
                {students.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          );
        }
      })()}

      {/* Statistics */}
      {activeTab === "stats" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Bar chart */}
          <div className="bg-white shadow-lg rounded-xl p-6">
          
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={statsData()} margin={{ top: 20, right: 40, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="course" angle={-60} textAnchor="end" interval={0} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count">
                  {statsData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <LabelList dataKey="count" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie chart */}
          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold mb-6 text-indigo-700">
              Overall Student Distribution
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={({ name, value }) =>
                    `${name}: ${value} (${((value / grandTotal) * 100).toFixed(1)}%)`
                  }
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val, name) => [`${val} students`, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <p className="mt-4 font-semibold text-gray-700">
              Grand Total: <span className="text-indigo-600">{grandTotal}</span> Students
            </p>
          </div>
        </div>
      )}
    </section>
  );
}