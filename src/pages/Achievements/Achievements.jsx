import { useState } from "react";
import Publications from "./Publications";
import Patents from "./Patents";
import Awards from "./Awards";
export default function Achievements() {
  const tabs = [
    
    { key: "publications", label: "Publications" },
    { key: "patents", label: "Patents" },
    { key: "awards", label: "Awards/Honors" },
  ];

  const [activeTab, setActiveTab] = useState("publications");

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
      
      {activeTab === "publications" && <Publications />}
      {activeTab === "patents" && <Patents />}
      {activeTab === "awards" && <Awards />}
    </section>
  );
}
