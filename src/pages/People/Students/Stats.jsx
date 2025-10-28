// src/pages/People/Stats.jsx
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

export default function Stats({ data }) {
  const totalBtech = data.btech.reduce((a, b) => a + b.students.length, 0);
  const totalMtech = data.mtech.reduce((a, b) => a + b.students.length, 0);
  const totalPhd = data.phd.reduce((a, b) => a + b.students.length, 0);
  const totalOnRoll = totalBtech + totalMtech + totalPhd;

  const programRatioPieData = [
    { name: "B.Tech", value: totalBtech, color: "#0f78be" },
    { name: "M.Tech", value: totalMtech, color: "#10B981" },
    { name: "Ph.D", value: totalPhd, color: "#e99a11" },
  ];

  const makeBarData = (current, alumni) =>
    [...new Set([...current.map(d => d.year), ...alumni.map(d => d.year)])]
      .sort((a, b) => a - b)
      .map(year => ({
        year,
        Current: current.find(d => d.year === year)?.students.length || 0,
        Alumni: alumni.find(d => d.year === year)?.students.length || 0,
      }));

  const btechBar = makeBarData(data.btech, data.alumni.btech);
  const mtechBar = makeBarData(data.mtech, data.alumni.mtech);

  return (
    <div className="space-y-12 mt-10">
      {/* Pie Chart */}
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full border border-gray-200/80">
        <h3 className="text-2xl font-bold mb-4 text-indigo-700 text-center">Program Ratio</h3>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={programRatioPieData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label={({ name, value }) =>
                `${name}: ${value} (${((value / totalOnRoll) * 100).toFixed(0)}%)`
              }
            >
              {programRatioPieData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
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

      {/* B.Tech Bar */}
      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200/80">
        <h3 className="text-2xl font-bold mb-4 text-indigo-700 text-center">B.Tech Statistics</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={btechBar}>
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

      {/* M.Tech Bar */}
      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200/80">
        <h3 className="text-2xl font-bold mb-4 text-green-700 text-center">M.Tech Statistics</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={mtechBar}>
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
    </div>
  );
}
