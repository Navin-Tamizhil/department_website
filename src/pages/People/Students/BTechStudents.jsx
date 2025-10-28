import { useEffect, useState } from "react";
import { loadStudentData } from "./DataLoader";

export default function BTechStudents() {
  const [btechData, setBtechData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    loadStudentData().then((data) => {
      setBtechData(data.btech);
      setSelectedYear(data.btech[0]?.year || null);
    });
  }, []);

  if (!btechData.length) return <p className="text-center py-8">Loading B.Tech data...</p>;

  const selected = btechData.find((b) => b.year === selectedYear);

  return (
    <section className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-indigo-700 mb-4">B.Tech Students</h2>
      <div className="flex flex-wrap gap-3 mb-6">
        {btechData.map(({ year }) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 rounded-lg border transition ${
              selectedYear === year
                ? "bg-indigo-100 border-indigo-500 text-indigo-700"
                : "bg-white border-gray-300 hover:bg-gray-100"
            }`}
          >
            {year}-{year + 4}
          </button>
        ))}
      </div>

      <ul className="columns-1 sm:columns-2 lg:columns-3 space-y-2">
        {selected?.students.map((s, i) => (
          <li key={i} className="flex items-center gap-2 text-gray-700">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}
