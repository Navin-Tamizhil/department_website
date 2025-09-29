import React, { useState } from 'react';
import { CalendarDays, ExternalLink, X } from 'lucide-react';
import { admissions } from '../AcademicPrograms/admissionData';

export const AnnouncementsModified = ({ onItemClick }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  // Filter admissions for only latest
  const latestAdmissions = admissions.filter(item => item.islatest === true);

  const handleItemClick = (e, itemId, itemTitle) => {
    e.stopPropagation();
    setExpandedItem(itemId);
    if (onItemClick) {
      onItemClick(itemTitle);
    }
  };

  const closeExpanded = (e) => {
    e.stopPropagation();
    setExpandedItem(null);
  };

  return (
    <div className="space-y-4">
      {/* Admissions Section */}
      <div>
        <h3 className="text-lg font-bold text-indigo-700 mb-3">Admissions</h3>
        <div className="space-y-3">
          {latestAdmissions.map((item) => (
            <div
              key={item.id}
              onClick={(e) => handleItemClick(e, `admission-${item.id}`, item.title)}
              className={`p-4 bg-white rounded-lg border transition-all cursor-pointer ${
                expandedItem === `admission-${item.id}` 
                  ? 'border-indigo-500 shadow-lg scale-105 z-10 relative' 
                  : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'
              }`}
            >
              {expandedItem === `admission-${item.id}` && (
                <button 
                  onClick={closeExpanded}
                  className="absolute top-2 right-2 p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              
              <div className="flex items-start gap-2">
                <h4 className="text-sm font-semibold text-gray-800 flex-1">
                  {item.title}
                  {item.isNew && (
                    <span
                      className="
                        ml-2 px-3 py-0.5 rounded-full font-semibold text-white text-xs
                        bg-gradient-to-r from-pink-500 via-yellow-400 to-red-600
                        inline-flex items-center gap-1 select-none
                      "
                      style={{ animation: "glowPulse 2.5s ease-in-out infinite" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 animate-bounce"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      OPEN
                    </span>
                  )}
                </h4>
              </div>
              
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <CalendarDays className="w-3 h-3" />
                {item.date}
              </p>
              
              {expandedItem === `admission-${item.id}` && item.links && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {item.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.brochure}  // fixed typo
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium hover:bg-indigo-100"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
