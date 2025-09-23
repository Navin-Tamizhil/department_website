import React, { useState, useEffect, useRef } from 'react';
import { CalendarDays, ExternalLink, Clock, MapPin, Users, ChevronRight, X } from 'lucide-react';

// =============== ANNOUNCEMENTS COMPONENT ===============
export const AnnouncementsModified = ({ onItemClick }) => {
  const [expandedItem, setExpandedItem] = useState(null);
  
 const admissions = [
  {
    id: 1,
    title: "Ph.D. Admissions July 2025",
    date: "Applications closed – Selected candidates have been informed",
    links: [{label: "Notification",
      brouchere: "/announcements/PhD_Admissions_July_2025_Brochure_BT_final_150325.pdf"}],
    isNew: false,
  },
  {
    id: 2,
    title: "M.Tech. Admissions July 2025",
    date: "Results for M.Tech. Medical Biotechnology (Self-Sponsored) Interviews",
    links: [{label: "Notification",
      brouchere:"/announcements/Brochure_MTech_Medical_Biotech_2025.pdf"},
    {label: "Results",
      brouchere:"/announcements/MTech_MedicalBiotechnology_SelfSponsored_InterviewResults.pdf"}],
    isNew: false,
  },
  {
    id: 3,
    title: "Hands-on Lab Training in Biotechnology / Bioinformatics",
    date: "Brochure available",
    links: [{label: "Notification",
      brouchere: "/announcements/HLT_Brochure_Latest_120625.pdf"}]
  },
];

  const announcements = [
  {
    id: 1,
    title: "Featured Research Article on ACS Chemical Biology Cover Page",
    description:
      "Prof. Rajakumara Eerappa's group research article titled 'Regulatory and Catalytic Domains of Poly(ADP-ribose) Polymerases Cross-Complement for DNA-Break-Dependent Allosteric Stimulation of Catalytic Activity' is featured.",
  
  },]


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
          {admissions.map((item) => (
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
                    <span className="ml-2 px-2 py-0.5 bg-green-600 text-white text-xs rounded-full animate-pulse">
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
                      href={link.url}
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

      {/* General Announcements */}
      <div>
        <h3 className="text-lg font-bold text-green-700 mb-3">Announcements</h3>
        <div className="space-y-3">
          {announcements.map((item) => (
            <div
              key={item.id}
              onClick={(e) => handleItemClick(e, `announce-${item.id}`, item.title)}
              className={`p-4 bg-white rounded-lg border-l-4 transition-all cursor-pointer ${
                expandedItem === `announce-${item.id}` 
                  ? 'border-l-green-600 shadow-lg scale-105 z-10 relative' 
                  : 'border-l-green-500 hover:shadow-md'
              }`}
            >
              {expandedItem === `announce-${item.id}` && (
                <button 
                  onClick={closeExpanded}
                  className="absolute top-2 right-2 p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              
              <h4 className="text-sm font-semibold text-green-700 pr-6">
                {item.title}
              </h4>
              
              {expandedItem === `announce-${item.id}` ? (
                <>
                  {item.date && (
                    <p className="text-xs text-gray-600 mt-2">
                      <strong>Date:</strong> {item.date}
                    </p>
                  )}
                  {item.time && (
                    <p className="text-xs text-gray-600">
                      <strong>Time:</strong> {item.time}
                    </p>
                  )}
                  {item.description && (
                    <p className="text-xs text-gray-700 mt-2">{item.description}</p>
                  )}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 mt-2 text-green-600 hover:text-green-700 text-xs font-medium"
                    >
                      Read more <ChevronRight className="w-3 h-3" />
                    </a>
                  )}
                </>
              ) : (
                <p className="text-xs text-gray-500 mt-1">
                  Click to expand details
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};