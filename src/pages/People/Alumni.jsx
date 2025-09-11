import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export default function Alumni() {
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

  const loadData = async () => {
    const files = [
      "btech_2021.xlsx",
      "mtech_2012.xlsx", "mtech_2013.xlsx", "mtech_2014.xlsx",
      "mtech_2015.xlsx", "mtech_2016.xlsx", "mtech_2017.xlsx",
      "mtech_2018.xlsx", "mtech_2019.xlsx", "mtech_2020.xlsx",
      "mtech_2021.xlsx", "mtech_2022.xlsx", "mtech_2023.xlsx",
      "phd_alumini.xlsx",
    ];

    const newData = { btech: [], mtech: [], phd: [] };

    for (const file of files) {
      const res = await fetch(`/alumini_excel/${file}`);
      if (!res.ok) continue;

      const buf = await res.arrayBuffer();
      const wb = XLSX.read(buf, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });

      if (file.startsWith("btech")) {
        const year = parseInt(file.match(/btech_(\d+)/)[1], 10);
        newData.btech.push({ year, rows });
      } else if (file.startsWith("mtech")) {
        const year = parseInt(file.match(/mtech_(\d+)/)[1], 10);
        newData.mtech.push({ year, rows });
      } else if (file.startsWith("phd")) {
        newData.phd.push({ rows });
      }
    }

    // Sort years ascending
    newData.btech.sort((a, b) => a.year - b.year);
    newData.mtech.sort((a, b) => a.year - b.year);

    setData(newData);
  };

  const getYears = (tab) => {
    if (tab === "btech" || tab === "mtech") {
      return data[tab].map((batch) => batch.year);
    }
    return []; // No year buttons for Ph.D.
  };

  const getRows = (tab, year) => {
    if (tab === "btech" || tab === "mtech") {
      const batch = data[tab].find((b) => b.year === year);
      return batch ? batch.rows : [];
    }
    if (tab === "phd") {
      return data.phd.length > 0 ? data.phd[0].rows : [];
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

      {/* Years Row (only for B.Tech. & M.Tech.) */}
      {activeTab !== "phd" && (
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
      )}

      {/* Alumni Table */}
      {(selectedYear || activeTab === "phd") && (
        <div>
          <h3 className="text-xl font-bold mb-6">
            {tabs.find((t) => t.key === activeTab)?.label}{" "}
            {activeTab !== "phd" ? `– ${selectedYear}` : ""}
          </h3>
          {getRows(activeTab, selectedYear).length > 0 ? (
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-indigo-100">
                  <tr>
                    {Object.keys(getRows(activeTab, selectedYear)[0] || {}).map(
                      (key) => (
                        <th
                          key={key}
                          className="px-4 py-3 text-left text-indigo-700 font-semibold"
                        >
                          {key}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {getRows(activeTab, selectedYear).map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-indigo-50 transition"
                    >
                      {Object.entries(row).map(([key, val], i) => (
                        <td
                          key={i}
                          className={`px-4 py-2 ${
                            key.toLowerCase().includes("current")
                              ? "text-green-700 font-medium"
                              : ""
                          }`}
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No alumni data available.</p>
          )}
        </div>
      )}
    </section>
  );
}
