// src/pages/People/Stats.jsx
import {
  useOutletContext,
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
  const context = useOutletContext();
  data = data || context.data; // Use prop or context
  const totalBtech = data.btech.reduce((a, b) => a + b.students.length, 0);
  const totalMtech = data.mtech.reduce((a, b) => a + b.students.length, 0);
  const totalPhd = data.phd.reduce((a, b) => a + b.students.length, 0);
  const totalOnRoll = totalBtech + totalMtech + totalPhd;

  const programRatioPieData = [
    { name: "B.Tech", value: totalBtech, color: "#0f78be" },
    { name: "M.Tech", value: totalMtech, color: "#10B981" },
    { name: "Ph.D", value: totalPhd, color: "#e99a11" },
  ];

  const makeBarData = (current, alumni, program) => {
    const allYears = [...new Set([...current.map(d => d.year), ...alumni.map(d => d.year)])]
      .sort((a, b) => a - b)
      .map(year => {
        const currentData = current.find(d => d.year === year);
        const alumniData = alumni.find(d => d.year === year);
        return {
          year: program === 'phd' ? year : `${year}-${year + (program === 'btech' ? 4 : 2)}`,
          Current: currentData?.students.length || 0,
          Alumni: alumniData?.students.length || 0,
        };
      });
    return allYears;
  }

  const btechBarData = makeBarData(data.btech, data.alumni.btech, 'btech');
  const mtechBarData = makeBarData(data.mtech, data.alumni.mtech, 'mtech');
  const phdBarData = makeBarData(data.phd, [], 'phd').map(d => ({
    ...d,
    Graduated: data.alumni.phd.filter(p => p.Year === d.year).length
  }));

  return (
    <div className="space-y-12 mt-10">
      {/* Pie Chart */}
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full border border-gray-200/80">
        <h3 className="text-2xl font-bold mb-4 text-indigo-700 text-center">Current Student Ratio</h3>
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

      {/* B.Tech Bar Chart */}
      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200/80">
        <h3 className="text-2xl font-bold mb-4 text-indigo-700 text-center">B.Tech Statistics</h3>
        <h4 className="text-xl font-semibold mb-4 text-gray-700 text-center">Current Students vs Alumni by Batch</h4>
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

      {/* M.Tech Bar Chart */}
      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200/80">
        <h3 className="text-2xl font-bold mb-4 text-green-700 text-center">M.Tech Statistics</h3>
        <h4 className="text-xl font-semibold mb-4 text-gray-700 text-center">Current Students vs Alumni by Batch</h4>
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

      {/* PhD Bar Chart */}
      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200/80">
        <h3 className="text-2xl font-bold mb-4 text-yellow-700 text-center">Ph.D Statistics</h3>
        <h4 className="text-xl font-semibold mb-4 text-gray-700 text-center">Current vs Graduated Scholars by Year (Stacked)</h4>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={phdBarData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Current" stackId="a" fill="#ffc658" name="Current Scholars" />
            <Bar dataKey="Graduated" stackId="a" fill="#ff8042" name="Graduated" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
