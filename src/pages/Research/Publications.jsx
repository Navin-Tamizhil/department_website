import { useState } from "react";

export default function Publications() {
  const publications = {
    2025: ["Gene Editing in Stem Cells", "Next Gen Biofuel Research"],
    2024: ["DNA Repair Mechanisms", "Fermentation Techniques"],
    2023: ["Epigenetics in Cancer"],
  };

  const years = Object.keys(publications).sort((a, b) => b - a);
  const [activeYear, setActiveYear] = useState(years[0]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Publications</h1>

      {/* Year tabs */}
      <div className="flex gap-2 mb-4">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setActiveYear(year)}
            className={`px-3 py-1 rounded ${
              activeYear === year ? "bg-indigo-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Publications list */}
      <ul className="list-disc ml-6">
        {publications[activeYear].map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
}
