import { useEffect, useState } from "react";
import { loadStudentData } from "./DataLoader";

export default function MTechStudents() {
  const [mtechData, setMtechData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    loadStudentData().then((data) => {
      setMtechData(data.mtech);
      setSelectedYear(data.mtech[0]?.year || null);
    });
  }, []);

  if (!mtechData.length) return <p className="text-center py-8">Loading M.Tech data...</p>;

  const selected = mtechData.find((m) => m.year === selectedYear);

  return (
    <section className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-4">M.Tech Students</h2>
      <div className="flex flex-wrap gap-3 mb-6">
        {mtechData.map(({ year }) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 rounded-lg border transition ${
              selectedYear === year
                ? "bg-green-100 border-green-500 text-green-700"
                : "bg-white border-gray-300 hover:bg-gray-100"
            }`}
          >
            {year}-{year + 2}
          </button>
        ))}
      </div>

      <ul className="columns-1 sm:columns-2 lg:columns-3 space-y-2">
        {selected?.students.map((s, i) => (
          <li key={i} className="flex items-center gap-2 text-gray-700">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}
