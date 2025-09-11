// src/pages/Announcements/Events.jsx
import React from "react";
/*import { events } from "./eventsData";*/
import { CalendarDays, MapPin, ExternalLink } from "lucide-react";

export default function Events() {
  return (
    <div className="space-y-6">
      <p> List of events and seminars by Department</p>
      {events.map((event) => (
        <div
          key={event.id}
          className="p-6 bg-white rounded-xl shadow-md border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-800">
            {event.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Speaker: <span className="font-medium">{event.speaker}</span>
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            <CalendarDays className="w-4 h-4 text-gray-400" /> {event.date}
            <MapPin className="w-4 h-4 text-gray-400 ml-3" /> {event.venue}
          </p>
          {event.link && (
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium text-sm"
            >
              More Info <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
