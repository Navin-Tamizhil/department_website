import { useState } from "react";
import Awards from "./Awards";
import Publications from "./Publications";
import Patents from "./Patents";

export default function Achievements() {
  const tabs = [
    { key: "awards", label: "Awards" },
    { key: "publications", label: "Publications" },
    { key: "patents", label: "Patents" },
  ];

  const [activeTab, setActiveTab] = useState("awards");

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
      {activeTab === "awards" && <Awards />}
      {activeTab === "publications" && <Publications />}
      {activeTab === "patents" && <Patents />}
    </section>
  );
}
