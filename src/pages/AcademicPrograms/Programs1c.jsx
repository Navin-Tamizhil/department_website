// src/pages/AcademicPrograms/Programs1c.jsx
import { useState } from "react";
import UGPrograms from "./UG2c";
import PGPrograms from "./PG1c";
import PhDPrograms from "./PhD";
import { GraduationCap, BookOpen, Award } from "lucide-react";

export default function Programs() {
  const [activeTab, setActiveTab] = useState("ug");

  const tabs = [
    { 
      key: "ug", 
      label: "Undergraduate", 
      icon: BookOpen,
      subtitle: "B.Tech (Bioinformatics & Biotechnology)"
    },
    { 
      key: "pg", 
      label: "Postgraduate", 
      icon: GraduationCap,
      subtitle: "M.Tech (Biotechnology)"
    },
    { 
      key: "phd", 
      label: "Ph.D.", 
      icon: Award,
      subtitle: "Ph.D. (Biotechnology)"
    },
  ];

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm p-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex flex-col items-center p-6 rounded-lg transition-all duration-200 ${
                  activeTab === tab.key
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className={`w-8 h-8 mb-2 ${
                  activeTab === tab.key ? "text-white" : "text-indigo-600"
                }`} />
                <h3 className="font-semibold text-lg">{tab.label}</h3>
                <p className={`text-sm mt-1 ${
                  activeTab === tab.key ? "text-indigo-100" : "text-gray-500"
                }`}>
                  {tab.subtitle}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm">
        {activeTab === "ug" && <UGPrograms />}
        {activeTab === "pg" && <PGPrograms />}
        {activeTab === "phd" && <PhDPrograms />}
      </div>
    </div>
  );
}

