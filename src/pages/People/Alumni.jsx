import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
export default function Alumni() {
  const tabs = [
    { key: "phd", label: "Ph.D" },
    { key: "mtech", label: "M.Tech.", duration: 2 },
    { key: "btech", label: "B.Tech.", duration: 4 },
    { key: "placement", label: "Placement" }
  ];

  const [activeTab, setActiveTab] = useState("phd");
  const [selectedYear, setSelectedYear] = useState(null);
  const [data, setData] = useState({ btech: [], mtech: [], phd: [], placement: { btech: [], mtech: [], phd: [] }});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const files = [
      "BTech_Alumni.json",
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
    ];

    const newData = { btech: [], mtech: [], phd: [], placement: { btech: [], mtech: [], phd: [] } };

    // Helper to clean data, replacing NaN with empty strings
    const cleanRow = (row) => {
      const newRow = {};
      for (const key in row) {
        newRow[key] = Number.isNaN(row[key]) ? "" : row[key];
      }
      return newRow;
    };

    for (const file of files) {
      try {
        const res = await fetch(`/department_website/alumini_excel/${file}`);
        if (!res.ok) continue;
        
        const text = await res.text();
        const sanitizedText = text.replace(/:\s*NaN/g, ":null");
        const rawRows = JSON.parse(sanitizedText);
        const rows = Array.isArray(rawRows) ? rawRows.map(cleanRow) : [];

      if (file.startsWith("BTech")) {
        // Group B.Tech alumni by graduation year
        const btechByYear = rows.reduce((acc, row) => {
          const year = row["Year Of Graduation"];
          if (!acc[year]) acc[year] = [];
          acc[year].push(row);
          return acc;
        }, {});
        newData.btech = Object.entries(btechByYear).map(([year, yearRows]) => ({ year: parseInt(year), rows: yearRows }));
      } else if (file.startsWith("MTech")) {
        const yearMatch = file.match(/(\d{4})/);
        const year = yearMatch ? parseInt(yearMatch[1], 10) : null;
        newData.mtech.push({ year, rows: rows });
      }
      } catch (error) {
        console.error(`Failed to load or parse ${file}:`, error);
      }
    }

    // Load and process the single PhD data file
    try {
      const res = await fetch(`/department_website/alumini_excel/PhD_Alumini.json`);
      if (res.ok) {
        const text = await res.text();
        const sanitizedText = text.replace(/:\s*NaN/g, ":null");
        const rawRows = JSON.parse(sanitizedText);
        const rows = Array.isArray(rawRows) ? rawRows.map(cleanRow) : [];
        newData.phd.push({ rows: rows });
      }
    } catch (error) {
      console.error("Error loading PhD_Alumini.json", error);
    }

    // Aggregate placement data
    const btechPlacementCounts = newData.btech.flatMap(batch => batch.rows)
      .reduce((acc, row) => {
        const type = row.Type;
        if (type) {
          acc[type] = (acc[type] || 0) + 1;
        }
        return acc;
      }, {});

    const mtechPlacementCounts = newData.mtech.flatMap(batch => batch.rows)
      .reduce((acc, row) => {
        const type = row.Type;
        if (type) {
          acc[type] = (acc[type] || 0) + 1;
        }
        return acc;
      }, {});

    const phdPlacementCounts = newData.phd.flatMap(batch => batch.rows)
      .reduce((acc, row) => {
        // Assuming PhD alumni might have a 'Type' column in the future
        const type = row.Type;
        if (type) {
          acc[type] = (acc[type] || 0) + 1;
        }
        return acc;
      }, {});
    
    newData.placement.btech = Object.entries(btechPlacementCounts).map(([name, count]) => ({ name, count }));
    newData.placement.mtech = Object.entries(mtechPlacementCounts).map(([name, count]) => ({ name, count }));
    newData.placement.phd = Object.entries(phdPlacementCounts).map(([name, count]) => ({ name, count }));

    // Sort descending by start year
    newData.btech.sort((a, b) => b.year - a.year);
    newData.mtech.sort((a, b) => b.year - a.year);

    if (newData.phd.length > 0) {
      setActiveTab("phd");
    }

    setData(newData);
  };

  const getYears = (tab) => {
    if (tab === "btech" || tab === "mtech") {
      return data[tab].map((batch) => batch.year);
    }
    return [];
  };

  const getYearRange = (tabKey, startYear) => {
    const tab = tabs.find((t) => t.key === tabKey);
    if (!tab || !tab.duration) return startYear;
    if (tabKey === 'btech') {
      const endYear = startYear;
      return `${endYear - tab.duration} - ${endYear}`;
    }
    const endYear = startYear + tab.duration;
    return `${startYear} - ${endYear}`;
  };

  const getRows = (tab, year) => {
    if (tab === "btech" || tab === "mtech") {
      const batch = data[tab].find((b) => b.year === year);
      // Remove 'Type' before rendering the table
      return batch ? batch.rows.map(row => { const { Type, ...rest } = row; return rest; }) : [];
    }
    if (tab === "phd") {
      // Remove 'Type' before rendering the table
      return data.phd.length > 0 ? data.phd[0].rows.map(row => { const { Type, ...rest } = row; return rest; }) : [];
    }
    return [];
  };

  const renderTabs = () => (
    <div className="flex gap-6 mb-10 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setSelectedYear(null);
              if (tab.key === "phd" && data.phd.length > 0) {
                // No year selection for PhD
              } else if (tab.key === "btech" && data.btech.length > 0) {
                setSelectedYear(data.btech[0].year);
              } else if (tab.key === "mtech" && data.mtech.length > 0) {
                setSelectedYear(data.mtech[0].year);
              }
            }}
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
  );

  const renderYearSelector = () => (
    (activeTab === "btech" || activeTab === "mtech") && (
      <div className="flex flex-wrap gap-3 mb-8">
          {getYears(activeTab).map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 rounded-lg border font-medium ${
                selectedYear === year
                  ? "bg-indigo-100 border-indigo-500 text-indigo-700"
                  : "bg-gray-50 hover:bg-gray-100 border-gray-300"
              }`}
            >
              {getYearRange(activeTab, year)}
            </button>
          ))}
      </div>
    )
  );

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderPlacementCharts = () => (
    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-center text-indigo-700 mb-4">B.Tech. Placement Types</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.placement.btech}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="count"
            >
              {data.placement.btech.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-center text-indigo-700 mb-4">M.Tech. Placement Types</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.placement.mtech}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="count"
            >
              {data.placement.mtech.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
        <h3 className="text-xl font-bold text-center text-indigo-700 mb-4">Ph.D. Placement Types</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie 
              data={data.placement.phd} 
              dataKey="count" 
              nameKey="name" 
              cx="50%" 
              cy="50%" 
              outerRadius={100} 
              fill="#82ca9d" 
              labelLine={false}
              label={renderCustomizedLabel}>
              {data.placement.phd.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderAlumniTable = () => {
    const rows = getRows(activeTab, selectedYear);
    if (rows.length === 0) {
      return <p className="text-gray-500">No alumni data available for this selection.</p>;
    }
    const headers = Object.keys(rows[0] || {});

    return (
      <div>
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            {tabs.find((t) => t.key === activeTab)?.label}{" "}
            {activeTab !== "phd" ? `– ${getYearRange(activeTab, selectedYear)}` : ""}
          </h3>
          <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-indigo-100">
                  <tr>
                    {headers.map(
                      (key) => (
                        <th
                          key={key}
                          className="px-6 py-3 text-left text-sm font-semibold text-indigo-800 uppercase tracking-wider whitespace-nowrap"
                        >
                          {key}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-indigo-50 transition">
                      {Object.entries(row).map(([key, val], i) => (
                        <td
                          key={i}
                          className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700 ${
                            key.toLowerCase().includes("position")
                              ? "text-green-700 font-medium"
                              : ""
                          }`}
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
      </div>
    );
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-500">Our Alumni</h1>
        
        {renderTabs()}
        
        {activeTab === "placement" ? (
          renderPlacementCharts()
        ) : (
          <>
            {renderYearSelector()}
            {renderAlumniTable()}
          </>
        )}
      </div>
    </section>
  );
}
