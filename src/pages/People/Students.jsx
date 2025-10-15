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

    // Load and process the single PhD data file
    const loadPhdData = async () => {
      try {
        const res = await fetch(`/students_excel/phd_all.json`);
        if (!res.ok) {
          console.warn(`Failed to fetch phd_all.json`);
          return;
        }
        const allPhdStudents = await res.json();

        const onRollStudents = allPhdStudents.filter(s => s.Status === "Onroll");
        const graduatedStudents = allPhdStudents.filter(s => s.Status === "Graduated");

        const phdByYear = onRollStudents.reduce((acc, student) => {
          const year = student.Year;
          if (!acc[year]) acc[year] = [];
          acc[year].push(capitalizeName(student.Name));
          return acc;
        }, {});

        newData.phd = Object.entries(phdByYear).map(([year, students]) => ({ year: parseInt(year, 10), batch: 'Annual', students }));
        newData.alumni.phd = graduatedStudents; // Keep full object for stats
      } catch (err) {
        console.error("Error loading phd_all.json", err);
      }
    };
    await Promise.all([...studentPromises, ...alumniPromises, loadPhdData()]);

    // Sort by year
    newData.btech.sort((a, b) => b.year - a.year);
    newData.mtech.sort((a, b) => b.year - a.year);
    newData.phd.sort((a, b) =>
      a.year === b.year ? (a.batch === "July" ? -1 : 1) : b.year - a.year
    );
    newData.alumni.btech.sort((a, b) => b.year - a.year);
    newData.alumni.mtech.sort((a, b) => b.year - a.year);
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
  const totalPhdAlumni = data.alumni.phd.length;
  const totalOnRoll = totalBtech + totalMtech + totalPhd;


  // Overall ratio pie chart
  const overallPieData = [
    { name: "B.Tech Current", value: totalBtech, color: "#0f78be" },
    { name: "M.Tech Current", value: totalMtech, color: "#10B981" },
    { name: "Ph.D. Current", value: totalPhd, color: "#ffc658" },
    { name: "B.Tech Alumni", value: totalBtechAlumni, color: "#8884d8" },
    { name: "M.Tech Alumni", value: totalMtechAlumni, color: "#82ca9d" },
    { name: "Ph.D. Alumni", value: totalPhdAlumni, color: "#ff8042" },
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
  ])].sort((a, b) => b - a);

  const btechBarData = allBtechYears.map(year => ({
    year: year.toString(),
    Current: data.btech.find(d => d.year === year)?.students.length || 0,
    Alumni: data.alumni.btech.find(d => d.year === year)?.students.length || 0,
  }));

  // MTech bar chart data
  const allMtechYears = [...new Set([
    ...data.mtech.map(d => d.year),
    ...data.alumni.mtech.map(d => d.year)
  ])].sort((a, b) => b - a);

  const mtechBarData = allMtechYears.map(year => ({
    year: year.toString(),
    Current: data.mtech.find(d => d.year === year)?.students.length || 0,
    Alumni: data.alumni.mtech.find(d => d.year === year)?.students.length || 0,
  }));

  // PhD bar chart data
  const allPhdYears = [...new Set([
    ...data.phd.map(d => d.year),
    ...data.alumni.phd.map(d => d.Year)
  ])].sort((a, b) => b - a);

  const phdBarData = allPhdYears.map(year => ({
    year: year.toString(),
    Current: data.phd.find(d => d.year === year)?.students.length || 0,
    Graduated: data.alumni.phd.filter(d => d.Year === year).length || 0,
  }));


  return (
    <section className="container mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-500">
        Our Students on Roll
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
          <select // A styled dropdown might be better, but for simplicity:
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
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
        <ul className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/30 columns-1 md:columns-2 lg:columns-3 gap-x-8 space-y-2">
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
              <div key={batch} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/30">
                <ul className="columns-1 md:columns-2 lg:columns-3 gap-x-8 space-y-2">
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
                <Bar dataKey="Alumni" fill="#82ca9d" />
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
                <Bar dataKey="Alumni" fill="#8884d8" />
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
                <Bar dataKey="Current" stackId="a" fill="#ffc658" />
                <Bar dataKey="Graduated" stackId="a" fill="#ff8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Charts */}
          <div className="flex justify-center">
            {/* Program Ratio Pie Chart */}
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
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
              <p className="text-center text-gray-700 font-semibold mt-4 text-lg">
                Total Students on Roll: <span className="text-indigo-700">{totalOnRoll}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}