import { useState } from "react";
import Publications from "./Publications";
import Patents from "./Patents";
import Awards from "./Awards";
import { BookOpen, FileBadge, Award as AwardIcon } from "lucide-react";

export default function Achievements() {
  const tabs = [
    { key: "publications", label: "Publications", icon: BookOpen },
    { key: "patents", label: "Patents", icon: FileBadge },
    { key: "awards", label: "Awards/Honors", icon: AwardIcon },
  ];

  const [activeTab, setActiveTab] = useState("publications");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700">
            Milestones & Accolades
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Celebrating the remarkable achievements of our faculty and students.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-sm p-2 rounded-2xl sm:rounded-full shadow-inner border border-gray-200/80 flex flex-col sm:flex-row gap-2 w-full max-w-xs sm:w-auto sm:max-w-none">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center justify-center gap-2 px-4 py-3 sm:px-6 font-semibold rounded-xl sm:rounded-full transition-all duration-300 ${
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Render Selected Tab */}
        <div className="bg-white/50 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-xl border border-white/60">
          {activeTab === "publications" && <Publications />}
          {activeTab === "patents" && <Patents />}
          {activeTab === "awards" && <Awards />}
        </div>
      </section>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
