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
    alumni: { btech: [], mtech: [], phd: [] },
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
    // Use .json files for faster loading
    const files = [
      "btech_2022.json",
      "btech_2023.json",
      "btech_2024.json",
      "btech_2025.json",
      "mtech_2024.json",
      "mtech_2025.json",
      "phd_2015_january.json",
      "phd_2017_january.json",
      "phd_2017_july.json",
      "phd_2018_july.json",
      "phd_2019_january.json",
      "phd_2020_january.json",
      "phd_2020_july.json",
      "phd_2021_january.json",
      "phd_2021_july.json",
      "phd_2022_january.json",
      "phd_2022_july.json",
      "phd_2023_january.json",
      "phd_2023_july.json",
      "phd_2024_january.json",
      "phd_2024_july.json",
      "phd_2025_january.json",
    ];


    // Alumni files based on your folder structure
    const alumniFiles = [
      "btech_2021.json", // Assuming this file exists and is correct
      "MTech_Alumni_2012___2014_Batch.json",
      "MTech_Alumni_2013___2015_Batch.json",
      "MTech_Alumni_2014___2016_Batch.json",
      "MTech_Alumni_2015___2017_Batch.json",
      "MTech_Alumni_2016___2018_Batch.json",
      "MTech_Alumni_2017___2019_Batch.json",
      "MTech_Alumni_2018___2020_Batch.json",
      "MTech_Alumni_2019___2021_Batch.json",
      "MTech_Alumni_2020___2022_Batch.json",
      "MTech_Alumni_2021___2023_Batch.json",
      "MTech_Alumni_2022___2024_Batch.json",
      "MTech_Alumni_2023___2025_Batch.json",
      "PhD_Alumni.json",
    ];

    const newData = { btech: [], mtech: [], phd: [], alumni: { btech: [], mtech: [], phd: [] } };

    // Load student files
    const studentPromises = files.map(async (file) => { // e.g., btech_2022.json
      try {
        const res = await fetch(`/students_excel/${file}`);
        if (!res.ok) {
          console.warn(`Failed to fetch student file: ${file}`);
          return;
        }
        const rows = await res.json(); // JSON is likely an array of strings
        const students = rows.map(capitalizeName);

        if (file.startsWith("btech")) {
          const year = parseInt(file.match(/btech_(\d+)/)[1], 10);
          newData.btech.push({ year, students });
        } else if (file.startsWith("mtech")) {
          const year = parseInt(file.match(/mtech_(\d+)/)[1], 10);
          newData.mtech.push({ year, students });
        } else if (file.startsWith("phd")) {
          // Make regex more flexible for PhD files
          const match = file.match(/phd_(\d+)(?:_(january|july))?/); // e.g., phd_2022_january.json or phd_2021.json
          if (!match) return;
          const [, yearStr, batch] = match;
          const year = parseInt(yearStr, 10);
          newData.phd.push({
            year, // e.g., 2022
            batch: batch ? batch.charAt(0).toUpperCase() + batch.slice(1) : "Annual", // e.g., "January" or "Annual"
            students, // Array of student names
          });
        }
      } catch (err) {
        console.error("Error loading", file, err);
      }
    });

    // Load alumni files
    const alumniPromises = alumniFiles.map(async (file) => { // e.g., mtech_2012.json
      try {
        const res = await fetch(`/alumini_excel/${file}`);
        if (!res.ok) {
          console.warn(`Failed to fetch alumni file: ${file}`);
          return;
        }
        // Fetch as text first to handle invalid JSON with NaN values
        const text = await res.text();
        // Replace standalone NaN with null to make it valid JSON
        const sanitizedText = text.replace(/:\s*NaN/g, ":null");
        const rows = JSON.parse(sanitizedText);

        if (file.startsWith("btech_")) {
          const yearMatch = file.match(/_(\d{4})/);
          if (!yearMatch) return;
          const year = parseInt(yearMatch[1], 10);
          const studentNames = Array.isArray(rows) ? rows.map(row => capitalizeName(row.Name || Object.values(row)[0])) : [];
          newData.alumni.btech.push({ year, students: studentNames });
        } else if (file.startsWith("MTech")) {
          // Correctly handle M.Tech alumni files which are arrays of objects
          const yearMatch = file.match(/(\d{4})/);
          if (yearMatch) {
            const year = parseInt(yearMatch[1], 10);
            const studentNames = Array.isArray(rows) ? rows.map(row => capitalizeName(row.Name || Object.values(row)[0])) : [];
            newData.alumni.mtech.push({ year, students: studentNames });
          }
        } else if (file.startsWith("PhD_Alumni")) {
            // Assuming PhD alumni file is an array of student objects
            const studentNames = Array.isArray(rows) ? rows.map(row => capitalizeName(row.Name || Object.values(row)[0])) : [];
            newData.alumni.phd.push({ year: "Alumni", students: studentNames });
        } else { // Fallback for simple btech/mtech_year.json format
          const match = file.match(/(btech|mtech)_(\d{4})\.json$/i);
          if (!match) return;
          const [, program, yearStr] = match;
          const year = parseInt(yearStr, 10);
          const studentNames = Array.isArray(rows) ? rows.map(row => capitalizeName(row.Name || Object.values(row)[0])) : [];
          newData.alumni[program.toLowerCase()].push({ year, students: studentNames });
        }
      } catch (err) {
        console.error("Error loading alumni file", file, err);
      }
    });

    await Promise.all([...studentPromises, ...alumniPromises]);

    // Sort by year
    newData.btech.sort((a, b) => a.year - b.year);
    newData.mtech.sort((a, b) => a.year - b.year);
    newData.phd.sort((a, b) =>
      a.year === b.year ? (a.batch === "January" ? -1 : 1) : a.year - b.year
    );
    newData.alumni.btech.sort((a, b) => a.year - b.year);
    newData.alumni.mtech.sort((a, b) => a.year - b.year);
    // No need to sort PhD alumni as it's a single group

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
      return data.phd.filter((b) => b.year === parseInt(year, 10));
    }
    return [];
  };

  // Calculate statistics
  const totalBtech = data.btech.reduce((acc, d) => acc + d.students.length, 0);
  const totalMtech = data.mtech.reduce((acc, d) => acc + d.students.length, 0);
  const totalPhd = data.phd.reduce((acc, d) => acc + d.students.length, 0);
  const totalBtechAlumni = data.alumni.btech.reduce((acc, d) => acc + d.students.length, 0);
  const totalMtechAlumni = data.alumni.mtech.reduce((acc, d) => acc + d.students.length, 0);
  const totalPhdAlumni = data.alumni.phd.reduce((acc, d) => acc + d.students.length, 0);

  // Overall ratio pie chart
  const overallPieData = [
    { name: "B.Tech Current", value: totalBtech, color: "#0f78be" },
    { name: "M.Tech Current", value: totalMtech, color: "#10B981" },
    { name: "Ph.D. Current", value: totalPhd, color: "#e99a11" },
    { name: "B.Tech Alumni", value: totalBtechAlumni, color: "#60a5fa" },
    { name: "M.Tech Alumni", value: totalMtechAlumni, color: "#34d399" },
    { name: "Ph.D. Alumni", value: totalPhdAlumni, color: "#facc15" },
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
  // Add PhD Alumni as a single bar
  if (totalPhdAlumni > 0) {
    phdBarData.push({ year: "Alumni", Students: totalPhdAlumni });
  }


  return (
    <section className="container mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10 drop-shadow-lg">
        Our Students
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <div className="bg-white p-1.5 rounded-full shadow-md border flex flex-wrap justify-center gap-2">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-colors duration-300 text-sm sm:text-base ${
              activeTab === key
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
        </div>
      </div>

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
            .filter((d) => d.year === parseInt(selectedYear, 10))
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
                <Bar dataKey="Current" fill="#00f8aae5" />
                <Bar dataKey="Alumni" fill="rgba(15, 128, 75, 1)" />
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
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={programRatioPieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
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
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={overallPieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
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