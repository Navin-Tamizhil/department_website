import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export default function Awards() {
  const [awards, setAwards] = useState({ faculty: [], students: [] });

  useEffect(() => {
    loadAwards();
  }, []);

  const loadAwards = async () => {
    const loadedAwards = { faculty: [], students: [] };

    for (const type of ["faculty", "students"]) {
      try {
        const res = await fetch(`/awards_${type}.xlsx`);
        if (res.ok) {
          const buf = await res.arrayBuffer();
          const wb = XLSX.read(buf, { type: "array" });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });
          loadedAwards[type] = rows;
        }
      } catch (err) {
        console.error("Error loading awards:", err);
      }
    }

    setAwards(loadedAwards);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Faculty Awards 🏆</h3>
      {awards.faculty.length > 0 ? (
        <ul className="space-y-3 mb-10">
          {awards.faculty.map((award, i) => (
            <li
              key={i}
              className="p-4 bg-indigo-50 rounded-lg shadow hover:shadow-md transition"
            >
              <span className="font-semibold">{award.Name}</span> — {award.Award}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mb-10">Faculty awards.....</p>
      )}

      <h3 className="text-2xl font-bold mb-6">Student Awards 🎓</h3>
      {awards.students.length > 0 ? (
        <ul className="space-y-3">
          {awards.students.map((award, i) => (
            <li
              key={i}
              className="p-4 bg-green-50 rounded-lg shadow hover:shadow-md transition"
            >
              <span className="font-semibold">{award.Name}</span> — {award.Award}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Student awards....</p>
      )}
    </div>
  );
}
