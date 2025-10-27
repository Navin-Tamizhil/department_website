import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { BookOpen, Users, UserPlus } from "lucide-react";

export default function Academics() {
  const navigate = useNavigate();
  const location = useLocation();
  
const tabs = [
  { 
    key: "programs", 
    label: "Academic Programs", 
    icon: BookOpen,
    path: "/academics/programs"
  },
  { 
    key: "committee", 
    label: "Committees", 
    icon: Users,
    path: "/academics/committee"
  },
  { 
    key: "admission", 
    label: "Admission", 
    icon: UserPlus,
    path: "/academics/admissions"
  }
];

  const getActiveTab = () => {
    const currentPath = location.pathname;
    return tabs.find(tab => currentPath.includes(tab.key))?.key || "";
  };

  const handleTabClick = (tabPath) => {
    navigate(tabPath);
  };

  return (
    <section className="min-h-screen bg-gray-50">

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-2 sm:px-6">
          <nav className="flex space-x-2 sm:space-x-8 -mb-px overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = getActiveTab() === tab.key;
              
              return (
                <button
                  key={tab.key}
                  onClick={() => handleTabClick(tab.path)}
                  className={`flex-shrink-0 flex items-center space-x-2 py-4 px-3 sm:px-2 border-b-2 font-medium text-sm transition-colors ${
                    isActive
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </div>
    </section>
  );
}
