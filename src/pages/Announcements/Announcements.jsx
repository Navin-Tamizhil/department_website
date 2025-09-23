// src/pages/Announcements/Adnnouncements.jsx
import React from "react";
import { admissions } from "./admissionData";
import { announcements } from "./announcementData"; // import announcements dataset
import { CalendarDays, ExternalLink } from "lucide-react";

export default function Admissions() {
  return (
    <div className="space-y-16 px-6 md:px-12 py-8">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-indigo-900">
        Latest Announcements
      </h1>

      {/* Admissions Section */}
      <section>
        <h2 className="text-3xl font-bold text-indigo-700 border-b-4 border-indigo-600 pb-3 mb-8">
          Admissions
        </h2>
        <div className="space-y-6">
          {admissions.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition"
            >
              <div className="flex flex-col gap-3">
                {/* Title + Date */}
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

                {/* Links (Brochure, Results, etc.) */}
                {item.links && item.links.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-2">
                    {item.links.map((lnk, idx) => (
                      <a
                        key={idx}
                        href={lnk.brouchere}  // changed from lnk.url to lnk.brouchere
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg hover:bg-indigo-100 hover:text-indigo-900 text-sm font-medium transition"
                      >
                        {lnk.label}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Announcements Section */}
      <section>
        <h2 className="text-3xl font-bold text-green-700 border-b-4 border-green-600 pb-3 mb-8">
          Announcements
        </h2>
        <div className="space-y-6">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

// Reusable Announcement Card
const AnnouncementCard = ({ announcement }) => (
  <div className="shadow-md rounded-lg p-6 border-l-8 border-green-600 bg-white hover:shadow-lg transition">
    <h4 className="text-lg font-semibold mb-3 text-green-700">
      {announcement.title}
    </h4>

    {announcement.date && (
      <p className="text-sm text-gray-600 mb-1">
        <strong>Date:</strong> {announcement.date}
      </p>
    )}
    {announcement.time && (
      <p className="text-sm text-gray-600 mb-1">
        <strong>Time:</strong> {announcement.time}
      </p>
    )}
    {announcement.affiliation && (
      <p className="text-sm text-gray-600 mb-1">
        <strong>Affiliation:</strong> {announcement.affiliation}
      </p>
    )}
    {announcement.topic && (
      <p className="text-sm text-gray-600 mb-1">
        <strong>Topic:</strong> {announcement.topic}
      </p>
    )}
    {announcement.description && (
      <p className="text-gray-700 mb-2">{announcement.description}</p>
    )}
    {announcement.link && (
      <a
        href={announcement.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-600 hover:underline text-sm font-medium"
      >
        Read more
      </a>
    )}
  </div>
);
