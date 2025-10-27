import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { BookOpen } from "lucide-react";

export default function Publications() {
  const [publications, setPublications] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    loadPublications();
  }, []);

  const loadPublications = async () => {
    try {
      const res = await fetch(`/achivements_excel/publications_data.xlsx`);
      if (res.ok) {
        const buf = await res.arrayBuffer();
        const wb = XLSX.read(buf, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        let rows = XLSX.utils.sheet_to_json(ws, { defval: "" });

        // Sort by year (latest first)
        rows = rows.sort((a, b) => b.Year - a.Year);

        // Get unique years
        const uniqueYears = [...new Set(rows.map((r) => r.Year))].sort(
          (a, b) => b - a
        );

        setPublications(rows);
        setYears(uniqueYears);
        setSelectedYear(uniqueYears[0]); // default latest year
      }
    } catch (err) {
      console.error("Error loading publications:", err);
    }
  };

  const filteredPublications = publications.filter(
    (pub) => pub.Year === selectedYear
  );

  return (
    <div className="animate-fadeIn">
    

      {/* Year Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 rounded-lg border font-medium ${
              selectedYear === year
                ? "bg-indigo-600 border-indigo-600 text-white shadow-md"
                : "bg-white hover:bg-indigo-50 border-gray-300 text-gray-700 hover:border-indigo-300"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Publications List */}
      {filteredPublications.length > 0 ? (
        <div className="space-y-6">
          {filteredPublications.map((pub, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:border-indigo-500 transition-all border-l-4 border-indigo-200"
            >
              <p className="font-semibold text-gray-800 mb-1">{pub.Authors}</p>
              <p className="italic text-indigo-700 mb-2">“{pub.Title}”</p>
              <p className="text-gray-700 mb-1">
                {pub.Journal}
                {pub.Volume && `, Vol. ${pub.Volume}`}
                {pub.Issue && `, Issue ${pub.Issue}`}
                {pub.Pages && `, pp. ${pub.Pages}`}
              </p>
              {pub["DOI/URL"] && (
                <a
                  href={pub["DOI/URL"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  {pub["DOI/URL"]}
                </a>
              )}
              {pub.Notes && (
                <p className="text-sm text-gray-500 mt-2">{pub.Notes}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No publications for {selectedYear}.</p>
      )}
    </div>
  );
}
