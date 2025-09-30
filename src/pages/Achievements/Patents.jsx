import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { FileBadge } from "lucide-react";

export default function Patents() {
  const [patents, setPatents] = useState([]);

  useEffect(() => {
    loadPatents();
  }, []);

  const loadPatents = async () => {
    try {
      const res = await fetch(`/achivements_excel/patents_data.xlsx`);
      if (res.ok) {
        const buf = await res.arrayBuffer();
        const wb = XLSX.read(buf, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });
        setPatents(rows);
      }
    } catch (err) {
      console.error("Error loading patents:", err);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
   
      {patents.length > 0 ? (
        patents.map((pat, i) => (
          <div
            key={i}
            className="p-5 bg-white rounded-xl shadow-md hover:shadow-xl hover:border-green-500 transition-all border-l-4 border-green-200"
          >
            <p className="font-semibold text-gray-800">{pat.Name}</p>
            <p className="text-gray-600">
              {pat["National/International"]} — {pat.Status}
            </p>
            {pat["Patent No"] && (
              <p className="text-sm text-gray-500">
                Patent No: {pat["Patent No"]}
              </p>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No patents available.</p>
      )}
    </div>
  );
}
