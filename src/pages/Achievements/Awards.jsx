import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export default function Awards() {
  const [awards, setAwards] = useState({ faculty: [], students: [] });
  const [activeTab, setActiveTab] = useState("faculty");

  useEffect(() => {
    loadAwards();
  }, []);

  const loadAwards = async () => {
    const loadedAwards = { faculty: [], students: [] };

    for (const type of ["faculty", "students"]) {
      try {
        const res = await fetch(`/awards_excel/${type}_awards.xlsx`);
        if (res.ok) {
          const buf = await res.arrayBuffer();
          const wb = XLSX.read(buf, { type: "array" });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });
          loadedAwards[type] = rows;
        }
      } catch (err) {
        console.error(`Error loading ${type} awards:`, err);
      }
    }

    setAwards(loadedAwards);
  };

  const AwardCard = ({ award, borderColor }) => (
    <div
      className={`p-5 bg-white rounded-xl shadow hover:shadow-lg transition border-l-4 ${borderColor}`}
    >
      <p className="font-semibold text-gray-800 text-lg">{award.Name}</p>
      <p className="text-gray-600">{award["Award title"]}</p>
      <p className="text-sm text-gray-500">
        {award.Agency} — {award["Month/Year"]}
      </p>
    </div>
  );

  const renderAwardsSection = (title, awardsList, borderColor) => (
    <div className="animate-fadeIn">
      <h3 className="text-2xl font-bold mb-6">{title}</h3>
      {awardsList.length > 0 ? (
        <div className="space-y-4 mb-10">
          {awardsList.map((award, i) => (
            <AwardCard key={i} award={award} borderColor={borderColor} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-10">Avilable awards.......</p>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("faculty")}
          className={`px-6 py-3 font-medium text-lg transition-colors ${
            activeTab === "faculty"
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-500 hover:text-indigo-600"
          }`}
        >
          Faculty
        </button>
        <button
          onClick={() => setActiveTab("students")}
          className={`px-6 py-3 font-medium text-lg transition-colors ${
            activeTab === "students"
              ? "border-b-2 border-green-600 text-green-600"
              : "text-gray-500 hover:text-green-600"
          }`}
        >
          Students
        </button>
      </div>

      {activeTab === "faculty" &&
        renderAwardsSection(
          "",
          awards.faculty,
          "border-indigo-500"
        )}
      {activeTab === "students" &&
        renderAwardsSection(
          "",
          awards.students,
          "border-green-500"
        )}
    </div>
  );
}
