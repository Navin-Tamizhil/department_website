// src/pages/Announcements/Admissions.jsx
import React from "react";
import { admissions } from "./admissionData"; // import your data
import { CalendarDays, ExternalLink } from "lucide-react";

export default function Admissions() {
  return (
    <div className="space-y-6">
      {admissions.map((item) => (
        <div
          key={item.id}
          className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Left side: Title + Date */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                {item.title}
                {item.isNew && (
                  <span className="px-2 py-0.5 bg-green-600 text-white text-xs rounded-full animate-pulse">
                    OPEN
                  </span>
                )}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <CalendarDays className="w-4 h-4 text-gray-400" />
                {item.date}
              </p>
            </div>

            {/* Right side: Link */}
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium text-sm"
              >
                View Details
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
