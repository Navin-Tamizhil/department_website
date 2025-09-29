import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

// Simple CSV parsing helper to get trimmed lines
const parseCSV = (csvText) =>
  csvText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

export default function Students() {
  const tabs = [
    { key: "btech", label: "B.Tech." },
    { key: "mtech", label: "M.Tech." },
    { key: "phd", label: "Ph.D." },
    { key: "stats", label: "Statistics" },
  ];

  const [activeTab, setActiveTab] = useState("btech");
  const [selectedYear, setSelectedYear] = useState(null);

  const [data, setData] = useState({
    btech: [],
    mtech: [],
    phd: [],
    alumni: { btech: [], mtech: [] },
  });

  // Capitalize names helper
  const capitalizeName = (name) =>
    name
      ? name
          .toString()
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(" ")
      : "";

  // Load data for students and alumni
  const loadData = async () => {
    const studentFiles = [
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

    // Alumni files based on your folder structure
    const alumniFiles = [
      "alumini_excel/btech_2021.csv",
      "alumini_excel/mtech_2012.csv",
      "alumini_excel/mtech_2013.csv",
      "alumini_excel/mtech_2014.csv",
      "alumini_excel/mtech_2015.csv",
      "alumini_excel/mtech_2016.csv",
      "alumini_excel/mtech_2017.csv",
      "alumini_excel/mtech_2018.csv",
      "alumini_excel/mtech_2019.csv",
    ];

    const newData = { btech: [], mtech: [], phd: [], alumni: { btech: [], mtech: [] } };

    // Load student files
    for (const file of studentFiles) {
      try {
        const res = await fetch(`/students_excel/${file}`);
        if (!res.ok) continue;
        const text = await res.text();
        const rows = parseCSV(text).map(capitalizeName);

        if (file.startsWith("btech")) {
          const year = parseInt(file.match(/btech_(\d+)/)[1], 10);
          newData.btech.push({ year, students: rows });
        } else if (file.startsWith("mtech")) {
          const year = parseInt(file.match(/mtech_(\d+)/)[1], 10);
          newData.mtech.push({ year, students: rows });
        } else if (file.startsWith("phd")) {
          const [, yearStr, batch] = file.match(/phd_(\d+)_(january|july)/);
          const year = parseInt(yearStr, 10);
          newData.phd.push({
            year,
            batch: batch.charAt(0).toUpperCase() + batch.slice(1),
            students: rows,
          });
        }
      } catch (err) {
        console.error("Error loading", file, err);
      }
    }

    // Load alumni files
    for (const file of alumniFiles) {
      try {
        const res = await fetch(`/${file}`);
        if (!res.ok) continue;
        const text = await res.text();
        const rows = parseCSV(text).map(capitalizeName);

        const match = file.match(/(btech|mtech)_(\d{4})\.csv$/i);
        if (match) {
          const [, program, yearStr] = match;
          const year = parseInt(yearStr, 10);
          newData.alumni[program.toLowerCase()].push({
            year,
            students: rows,
          });
        }
      } catch (err) {
        console.error("Error loading alumni file", file, err);
      }
    }

    // Sort by year
    newData.btech.sort((a, b) => a.year - b.year);
    newData.mtech.sort((a, b) => a.year - b.year);
    newData.phd.sort((a, b) =>
      a.year === b.year ? (a.batch === "January" ? -1 : 1) : a.year - b.year
    );
    newData.alumni.btech.sort((a, b) => a.year - b.year);
    newData.alumni.mtech.sort((a, b) => a.year - b.year);

    setData(newData);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Get years for tabs
  const getYears = (tab) => {
    if (tab === "btech") return data.btech.map((b) => `${b.year}-${b.year + 4}`);
    if (tab === "mtech") return data.mtech.map((m) => `${m.year}-${m.year + 2}`);
    if (tab === "phd") return [...new Set(data.phd.map((p) => p.year))];
    return [];
  };

  useEffect(() => {
    const years = getYears(activeTab);
    setSelectedYear(years.length > 0 ? years[0] : null);
  }, [activeTab, data]);

  // Get students by tab and year selection
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

  // Calculate statistics
  const totalBtech = data.btech.reduce((acc, d) => acc + d.students.length, 0);
  const totalMtech = data.mtech.reduce((acc, d) => acc + d.students.length, 0);
  const totalPhd = data.phd.reduce((acc, d) => acc + d.students.length, 0);
  const totalBtechAlumni = data.alumni.btech.reduce((acc, d) => acc + d.students.length, 0);
  const totalMtechAlumni = data.alumni.mtech.reduce((acc, d) => acc + d.students.length, 0);

  // Overall ratio pie chart
  const overallPieData = [
    { name: "B.Tech Current", value: totalBtech, color: "#0f78be" },
    { name: "M.Tech Current", value: totalMtech, color: "#10B981" },
    { name: "Ph.D. Current", value: totalPhd, color: "#e99a11" },
    { name: "B.Tech Alumni", value: totalBtechAlumni, color: "#60a5fa" },
    { name: "M.Tech Alumni", value: totalMtechAlumni, color: "#34d399" },
  ];

  // Program ratio pie chart
  const programRatioPieData = [
    { name: "B.Tech", value: totalBtech, color: "#0f78be" },
    { name: "M.Tech", value: totalMtech, color: "#10B981" },
    { name: "Ph.D.", value: totalPhd, color: "#e99a11" },
  ];

  // BTech bar chart data (year-wise current + alumni)
  const allBtechYears = [...new Set([
    ...data.btech.map(d => d.year),
    ...data.alumni.btech.map(d => d.year)
  ])].sort();

  const btechBarData = allBtechYears.map(year => ({
    year: year.toString(),
    Current: data.btech.find(d => d.year === year)?.students.length || 0,
    Alumni: data.alumni.btech.find(d => d.year === year)?.students.length || 0,
  }));

  // MTech bar chart data
  const allMtechYears = [...new Set([
    ...data.mtech.map(d => d.year),
    ...data.alumni.mtech.map(d => d.year)
  ])].sort();

  const mtechBarData = allMtechYears.map(year => ({
    year: year.toString(),
    Current: data.mtech.find(d => d.year === year)?.students.length || 0,
    Alumni: data.alumni.mtech.find(d => d.year === year)?.students.length || 0,
  }));

  // PhD bar chart data
  const allPhdYears = [...new Set(data.phd.map(d => d.year))].sort();
  const phdBarData = allPhdYears.map(year => ({
    year: year.toString(),
    Students: data.phd.filter(d => d.year === year).reduce((sum, d) => sum + d.students.length, 0),
  }));

  return (
    <section className="container mx-auto px-6 py-16">
      {/* Tabs */}
      <ul className="flex gap-4 border-b border-gray-300 mb-8">
        {tabs.map(({ key, label }) => (
          <li
            key={key}
            className={`cursor-pointer px-4 py-2 ${
              activeTab === key
                ? "border-b-2 border-indigo-700 text-indigo-700 font-semibold"
                : "text-gray-600 hover:text-indigo-700"
            }`}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </li>
        ))}
      </ul>

      {/* Year/Batch selector */}
      {activeTab !== "stats" && (
        <div className="mb-6">
          <select
            className="border border-gray-300 rounded px-3 py-1"
            value={selectedYear || ""}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {getYears(activeTab).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Content for B.Tech, M.Tech */}
      {(activeTab === "btech" || activeTab === "mtech") && selectedYear && (
        <ul className="list-disc pl-6 max-h-[400px] overflow-auto bg-white shadow rounded p-4">
          {getStudents(activeTab, selectedYear).map((student, i) => (
            <li key={i} className="mb-1">
              {student}
            </li>
          ))}
        </ul>
      )}

      {/* PhD batches */}
      {activeTab === "phd" && selectedYear && (
        <>
          {data.phd
            .filter((d) => d.year === selectedYear)
            .map(({ batch, students }) => (
              <div key={batch} className="mb-6">
                <h4 className="text-lg font-semibold mb-2 text-indigo-700">
                  Batch: {batch}
                </h4>
                <ul className="list-disc pl-6 max-h-[300px] overflow-auto bg-white shadow rounded p-4">
                  {students.map((student, i) => (
                    <li key={i} className="mb-1">
                      {student}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </>
      )}

      {/* Statistics Tab */}
      {activeTab === "stats" && (
        <div className="space-y-8">
          {/* BTech Statistics */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-indigo-700 text-center">
              B.Tech Statistics
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={btechBarData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Current" fill="#0f78be" />
                <Bar dataKey="Alumni" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* MTech Statistics */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-green-700 text-center">
              M.Tech Statistics
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={mtechBarData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Current" fill="#10B981" />
                <Bar dataKey="Alumni" fill="#34d399" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* PhD Statistics */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-yellow-700 text-center">
              Ph.D. Statistics
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={phdBarData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Students" fill="#e99a11" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Charts */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Program Ratio Pie Chart */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-indigo-700 text-center">
                Current Students Ratio
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={programRatioPieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {programRatioPieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Overall Distribution Pie Chart */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-indigo-700 text-center">
                Current & Alumni Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={overallPieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {overallPieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}