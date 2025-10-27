// src/components/HomeWidgets.jsx
import React, { useEffect, useState } from "react";
import { events } from "../Announcements/eventsData";
import { publications } from "../Achievements/publicationsData";
import { CalendarDays, ExternalLink } from "lucide-react";

export default function HomeWidgets() {
  const [eventIndex, setEventIndex] = useState(0);
  const [pubIndex, setPubIndex] = useState(0);
  const [animateEvent, setAnimateEvent] = useState(false);
  const [animatePub, setAnimatePub] = useState(false);

  // Rolling for Events
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateEvent(true);
      setTimeout(() => {
        setEventIndex((prev) => (prev + 1) % events.length);
        setAnimateEvent(false);
      }, 600); // match transition duration
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Rolling for Publications
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatePub(true);
      setTimeout(() => {
        setPubIndex((prev) => (prev + 1) % publications.length);
        setAnimatePub(false);
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Events Column */}
        <div className="bg-white rounded-xl shadow-md p-6 relative overflow-hidden">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Events & Seminars</h3>
          {events.length > 0 && (
            <div
              key={events[eventIndex].id}
              className={`transform transition-all duration-600 ease-in-out ${
                animateEvent ? "-translate-y-6 opacity-0" : "translate-y-0 opacity-100"
              }`}
            >
              <h4 className="font-semibold text-gray-800">{events[eventIndex].title}</h4>
              <p className="text-sm text-gray-600 mt-1">{events[eventIndex].speaker}</p>
              <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                <CalendarDays className="w-4 h-4 text-gray-400" /> {events[eventIndex].date}
              </p>
              {events[eventIndex].link && (
                <a
                  href={events[eventIndex].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  More Info <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Publications Column */}
        <div className="bg-white rounded-xl shadow-md p-6 relative overflow-hidden">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Publications</h3>
          {publications.length > 0 && (
            <div
              key={publications[pubIndex].id}
              className={`transform transition-all duration-600 ease-in-out ${
                animatePub ? "-translate-y-6 opacity-0" : "translate-y-0 opacity-100"
              }`}
            >
              <p className="text-sm text-gray-600">{publications[pubIndex].authors}</p>
              <h4 className="font-semibold text-gray-800 mt-1">{publications[pubIndex].title}</h4>
              <p className="text-sm text-gray-500 italic mt-1">
                {publications[pubIndex].journal}, {publications[pubIndex].year}
              </p>
              {publications[pubIndex].doi && (
                <a
                  href={`https://doi.org/${publications[pubIndex].doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  DOI <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
