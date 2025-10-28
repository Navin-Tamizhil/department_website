import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function PhDStudents() {
  const { data } = useOutletContext();
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    if (data.phd.length > 0) {
      setSelectedYear(data.phd[0].year);
    }
  }, [data.phd]);

  if (!data.phd.length) return <p className="text-center py-8">No Ph.D data available.</p>;

  const selected = data.phd.filter((p) => p.year === selectedYear);

  return (
    <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-white/30 overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full opacity-50"></div>
      <div className="flex flex-wrap gap-3 mb-6">
        {[...new Set(data.phd.map(p => p.year))].map(year => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 rounded-lg border font-medium transition-all duration-200 shadow-sm ${
              selectedYear === year
                ? "bg-yellow-100 border-yellow-500 text-yellow-700 scale-105"
                : "bg-white hover:bg-gray-100 border-gray-300"
            }`}
          >
            {year}
          </button>
        ))}
      </div>
      {selected.length > 0 && (
        <ul className="relative columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-x-8 space-y-2 mt-8">
          {selected.flatMap(b => b.students).map((s, i) => <li key={i} className="flex items-center gap-3 mb-1 text-gray-700 break-inside-avoid"><span className="w-1.5 h-1.5 bg-yellow-400 rounded-full flex-shrink-0"></span><span>{s}</span></li>)}
        </ul>
      )}
    </div>
  );
}
