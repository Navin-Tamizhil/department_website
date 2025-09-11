import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export default function Students() {
  const tabs = [
    { key: "btech", label: "B.Tech." },
    { key: "mtech", label: "M.Tech." },
    { key: "phd", label: "Ph.D." },
  ];

  const [activeTab, setActiveTab] = useState("btech");
  const [selectedYear, setSelectedYear] = useState(null);
  const [data, setData] = useState({ btech: [], mtech: [], phd: [] });

  useEffect(() => {
    loadData();
  }, []);

  const capitalizeName = (name) => {
    if (!name) return "";
    return name
      .toString()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  };

  const loadData = async () => {
    const files = [
      "btech_2022.xlsx", "btech_2023.xlsx", "btech_2024.xlsx",
      "mtech_2021.xlsx", "mtech_2022.xlsx", "mtech_2023.xlsx", "mtech_2024.xlsx",
      "phd_2015_january.xlsx", "phd_2017_january.xlsx", "phd_2017_july.xlsx",
      "phd_2018_july.xlsx", "phd_2019_january.xlsx", "phd_2020_january.xlsx",
      "phd_2020_july.xlsx", "phd_2021_january.xlsx", "phd_2021_july.xlsx",
      "phd_2022_january.xlsx", "phd_2022_july.xlsx",
      "phd_2023_january.xlsx", "phd_2023_july.xlsx",
      "phd_2024_january.xlsx", "phd_2024_july.xlsx",
      "phd_2025_january.xlsx"
    ];

    const newData = { btech: [], mtech: [], phd: [] };

    for (const file of files) {
      const res = await fetch(`/students_excel/${file}`);
      if (!res.ok) continue;

      const buf = await res.arrayBuffer();
      const wb = XLSX.read(buf, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, { header: 1 }).flat();

      const students = rows.filter((r) => r).map((r) => capitalizeName(r));

      if (file.startsWith("btech")) {
        const year = parseInt(file.match(/btech_(\d+)/)[1], 10);
        newData.btech.push({ year, students });
      } else if (file.startsWith("mtech")) {
        const year = parseInt(file.match(/mtech_(\d+)/)[1], 10);
        newData.mtech.push({ year, students });
      } else if (file.startsWith("phd")) {
        const [, year, batch] = file.match(/phd_(\d+)_(january|july)/);
        const batchName = batch.charAt(0).toUpperCase() + batch.slice(1);
        newData.phd.push({ year: parseInt(year, 10), batch: batchName, students });
      }
    }

    newData.btech.sort((a, b) => a.year - b.year);
    newData.mtech.sort((a, b) => a.year - b.year);
    newData.phd.sort((a, b) =>
      a.year === b.year ? (a.batch === "January" ? -1 : 1) : a.year - b.year
    );

    setData(newData);
  };

  const getYears = (tab) => {
    if (tab === "btech" || tab === "mtech") {
      return data[tab].map((batch) => batch.year);
    }
    if (tab === "phd") {
      return data.phd.map((batch) => `${batch.year}-${batch.batch}`);
    }
    return [];
  };

  const getStudents = (tab, year) => {
    if (tab === "btech" || tab === "mtech") {
      const batch = data[tab].find((b) => b.year === year);
      return batch ? batch.students : [];
    }
    if (tab === "phd") {
      const [y, batch] = year.split("-");
      const batchData = data.phd.find(
        (b) => b.year.toString() === y && b.batch === batch
      );
      return batchData ? batchData.students : [];
    }
    return [];
  };

  return (
    <section className="container mx-auto px-6 py-16">
      {/* Tabs */}
      <div className="flex gap-6 mb-10 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setSelectedYear(null);
            }}
            className={`px-4 py-2 font-medium border-b-2 transition ${
              activeTab === tab.key
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-600 hover:text-indigo-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Years Row */}
      <div className="flex flex-wrap gap-3 mb-8">
        {getYears(activeTab).map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 rounded-lg border font-medium ${
              selectedYear === year
                ? "bg-indigo-100 border-indigo-500 text-indigo-700"
                : "bg-gray-50 hover:bg-gray-100 border-gray-300"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Students List */}
      {selectedYear && (
        <div>
          <h3 className="text-xl font-bold mb-4">
            {tabs.find((t) => t.key === activeTab)?.label} – {selectedYear}
          </h3>
          <ul className="list-disc ml-6 space-y-1">
            {getStudents(activeTab, selectedYear).map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
