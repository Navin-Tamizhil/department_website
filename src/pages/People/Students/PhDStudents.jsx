import { useEffect, useState } from "react";
import { loadStudentData } from "./DataLoader";

export default function PhDStudents() {
  const [phdData, setPhdData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    loadStudentData().then((data) => {
      setPhdData(data.phd);
      setSelectedYear(data.phd[0]?.year || null);
    });
  }, []);

  if (!phdData.length) return <p className="text-center py-8">Loading Ph.D data...</p>;

  const selected = phdData.find((p) => p.year === selectedYear);

  return (
    <section className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-yellow-700 mb-4">Ph.D. Scholars</h2>
      <div className="flex flex-wrap gap-3 mb-6">
        {phdData.map(({ year }) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 rounded-lg border transition ${
              selectedYear === year
                ? "bg-yellow-100 border-yellow-500 text-yellow-700"
                : "bg-white border-gray-300 hover:bg-gray-100"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      <ul className="columns-1 sm:columns-2 lg:columns-3 space-y-2">
        {selected?.students.map((s, i) => (
          <li key={i} className="flex items-center gap-2 text-gray-700">
            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}
