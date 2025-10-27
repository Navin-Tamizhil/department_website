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
  const [selectedYear, setSelectedYear] = useState("2022-2026");
  const [data, setData] = useState({ btech: [], mtech: [], phd: [] });

  // Capitalize student names properly
  const capitalizeName = (name) => {
    if (!name) return "";
    return name
      .toString()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  };

  // Fetch and process CSV files
  const loadData = async () => {
    const files = [
      "btech_2022.csv",
      "btech_2023.csv",
      "btech_2024.csv",
      "btech_2025.csv",
      "mtech_2024.csv",
      "mtech_2025.csv",
      "phd_2015_january.csv",
      "phd_2017_january.csv",
      "phd_2017_july.csv",
      "phd_2018_july.csv",
      "phd_2019_january.csv",
      "phd_2020_january.csv",
      "phd_2020_july.csv",
      "phd_2021_january.csv",
      "phd_2021_july.csv",
      "phd_2022_january.csv",
      "phd_2022_july.csv",
      "phd_2023_january.csv",
      "phd_2023_july.csv",
      "phd_2024_january.csv",
      "phd_2024_july.csv",
      "phd_2025_january.csv",
    ];

    const newData = { btech: [], mtech: [], phd: [] };

    for (const file of files) {
      try {
        const res = await fetch(`/students_excel/${file}`);
        if (!res.ok) continue;
        const text = await res.text();
        const rows = text.split("\n").map((r) => r.trim()).filter(Boolean);
        const students = rows.map(capitalizeName);

        if (file.startsWith("btech")) {
          const year = parseInt(file.match(/btech_(\d+)/)[1], 10);
          newData.btech.push({ year, students });
        } else if (file.startsWith("mtech")) {
          const year = parseInt(file.match(/mtech_(\d+)/)[1], 10);
          newData.mtech.push({ year, students });
        } else if (file.startsWith("phd")) {
          const [, year, batch] = file.match(/phd_(\d+)_(january|july)/);
          newData.phd.push({
            year: parseInt(year, 10),
            batch: batch.charAt(0).toUpperCase() + batch.slice(1),
            students,
          });
        }
      } catch (err) {
        console.error("Error loading", file, err);
      }
    }

    newData.btech.sort((a, b) => a.year - b.year);
    newData.mtech.sort((a, b) => a.year - b.year);
    newData.phd.sort((a, b) =>
      a.year === b.year
        ? a.batch === "January"
          ? -1
          : 1
        : a.year - b.year
    );

    setData(newData);
  };

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Automatically select the first year when tab or data changes
  useEffect(() => {
    const years = getYears(activeTab);
    if (years.length > 0) setSelectedYear(years[0]);
    else setSelectedYear(null);
  }, [activeTab, data]);

  const getYears = (tab) => {
    if (tab === "btech") return data.btech.map((b) => `${b.year}-${b.year + 4}`);
    if (tab === "mtech") return data.mtech.map((m) => `${m.year}-${m.year + 2}`);
    if (tab === "phd") return [...new Set(data.phd.map((p) => p.year))];
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

  // Color palette
  const COLOR_SCHEME = {
    btech: ["#0f78be", "#719ab8"],
    mtech: ["#10B981", "#6EE7B7"],
    phd: ["#e99a11", "#FCD34D"],
  };

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
    <section className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10 drop-shadow-lg">
        Meet Our Students
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 font-medium border-b-2 transition ${
              activeTab === tab.key
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-600 hover:text-indigo-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Year Selection */}
      {activeTab !== "stats" && (
        <div className="flex flex-wrap gap-3 mb-6">
          {getYears(activeTab).map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 rounded-md border font-medium shadow-sm transition ${
                selectedYear === year
                  ? "bg-indigo-100 border-indigo-600 text-indigo-800"
                  : "bg-white hover:bg-gray-100 border-gray-300"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      )}

      {/* Student List */}
      {selectedYear && activeTab !== "stats" && (() => {
        if (activeTab === "phd") {
          const jan = getStudents("phd", selectedYear).find((b) => b.batch === "January")?.students || [];
          const jul = getStudents("phd", selectedYear).find((b) => b.batch === "July")?.students || [];

          if (jan.length === 0 && jul.length === 0) return null;

          return (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-indigo-700">
                Ph.D. – {selectedYear}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[{ name: "January", list: jan }, { name: "July", list: jul }].map(({ name, list }) =>
                  list.length > 0 ? (
                    <div key={name}>
                      <h4 className="font-semibold text-gray-700 mb-2">{selectedYear} – {name}</h4>
                      <ul className="list-disc ml-5 space-y-1">{list.map((s, i) => <li key={i}>{s}</li>)}</ul>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          );
        } else {
          const students = getStudents(activeTab, selectedYear);
          if (students.length === 0) return null;

          return (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-indigo-700">
                {tabs.find((t) => t.key === activeTab)?.label} – {selectedYear}
              </h3>
              <ul className="list-disc ml-5 space-y-1">
                {students.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          );
        }
      })()}

      {/* Statistics Section */}
{activeTab === "stats" && (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
    {/* 2/3 Width Bar Chart */}
    <div className="bg-white shadow-lg rounded-lg p-2 lg:col-span-2 col-span-1">
      <h3 className="text-2xl font-bold mb-6 text-indigo-700 text-center">
        Students Per Batch (All Programs)
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={statsData()}
          margin={{ top: 20, right: 20, left: 10, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="course"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={100}
          />
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

    {/* 1/3 Width Pie Chart */}
    <div className="bg-white shadow-lg rounded-lg p-1 text-center col-span-1">
      <h3 className="text-2xl font-bold mb-6 text-indigo-700">
        Student Distribution
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
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
        Total: <span className="text-indigo-700">{grandTotal}</span> Students
      </p>
    </div>
  </div>
)}

    </section>
  );
}
