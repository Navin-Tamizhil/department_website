import { useState } from "react";

export default function Patents() {
  const patents = {
    2025: [],
    2024: [],
    2023: [],
    2022: [],
    2021: [],
  };

  const years = Object.keys(patents).sort((a, b) => b - a);
  const [activeYear, setActiveYear] = useState(years[0]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Patents</h1>

      {/* Year tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setActiveYear(year)}
            className={`px-3 py-1 rounded ${
              activeYear === year
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Patents list */}
      <ul className="list-disc ml-6">
        {patents[activeYear].map((patent, i) => (
          <li key={i}>{patent}</li>
        ))}
      </ul>
    </div>
  );
}

