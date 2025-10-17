import { useState } from "react";
import UGPrograms from "./UG2";   
import PGPrograms from "./PG1";
import PhDPrograms from "./PhD";

export default function Programs() {
  const tabs = [
    { key: "ug", label: "Undergraduate" },
    { key: "pg", label: "Postgraduate" },
    { key: "phd", label: "Ph.D." },
  ];

  const [activeTab, setActiveTab] = useState("ug");

  return (
    <section className="container mx-auto px-6 py-16">
      {/* Tabs Navigation */}
      <div className="flex gap-6 mb-10 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
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

      {/* Render Selected Tab */}
      {activeTab === "ug" && <UGPrograms />}
      {activeTab === "pg" && <PGPrograms />}
      {activeTab === "phd" && <PhDPrograms />}
    </section>
  );
}

