import React, { useState } from "react";
import Upcoming from "./Admissions";
import Admissions from "./Admissions";
import Events from "./Admissions";

export default function AnnouncementsLayout() {
  const tabs = [
    { key: "upcoming", label: "Upcoming" },
    { key: "admissions", label: "Admissions" },
    { key: "events", label: "Events & Seminars" },
  ];

  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <section className="container mx-auto px-6 py-16">
      {/* Tabs Navigation */}
      <div className="flex gap-4 mb-10 border-b border-gray-200">
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

      {/* Render content directly */}
      {activeTab === "upcoming" && <Upcoming />}
      {activeTab === "admissions" && <Admissions />}
      {activeTab === "events" && <Events />}
    </section>
  );
}
