import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom"; 

export default function MTechStudents() {
  const { data } = useOutletContext();
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    if (data && data.mtech.length > 0) {
      setSelectedYear(data.mtech[0].year);
    }
  }, [data.mtech]);

  if (!data || !data.mtech.length) return <p className="text-center py-8">No M.Tech data available.</p>;

  const selected = data.mtech.find((m) => m.year === selectedYear);

  return (
    <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-white/30 overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-green-100 to-teal-100 rounded-full opacity-50"></div>
      <div className="flex flex-wrap gap-3 mb-6">
        {data.mtech.map(({ year }) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 rounded-lg border font-medium transition-all duration-200 shadow-sm ${
              selectedYear === year
                ? "bg-green-100 border-green-500 text-green-700 scale-105"
                : "bg-white hover:bg-gray-100 border-gray-300"
            }`}
          >
            {year}-{year + 2}
          </button>
        ))}
      </div>
      {selected && (
        <ul className="relative columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-x-8 space-y-2 mt-8">
          {selected.students.map((s, i) => <li key={i} className="flex items-center gap-3 mb-1 text-gray-700 break-inside-avoid"><span className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0"></span><span>{s}</span></li>)}
        </ul>
      )}
    </div>
  );
}
