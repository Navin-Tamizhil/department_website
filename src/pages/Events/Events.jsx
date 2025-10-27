import React, { useState, useMemo } from "react";
import { eventsData } from "./eventsData";
import { Calendar, Mic, Award, BookOpen, Link as LinkIcon } from "lucide-react";

// Event Card Component
const EventCard = ({ event, isUpcoming }) => {
  const color = isUpcoming ? "border-indigo-500 text-indigo-600" : "border-gray-400 text-gray-500";
  const iconColor = isUpcoming ? "text-indigo-600" : "text-gray-500";
  const Icon = event.type === 'workshop' ? BookOpen : event.type === 'seminar' ? Mic : Award;

  return (
    <div className={`p-4 bg-white rounded-lg shadow-md border-t-4 ${color}`}>
      <div className="flex items-center mb-2">
        <Icon className={`w-5 h-5 mr-2 ${iconColor}`} />
        <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
      </div>
      <p className={`text-sm font-semibold mb-2 ${color}`}>{event.displayDate || event.date}</p>
      {event.venue && (
        <p className="text-sm text-gray-600 mb-1">
          <strong>Venue:</strong> {event.venue}
        </p>
      )}
      {event.organizer && (
        <p className="text-sm text-gray-600 mb-1">
          <strong>Organizer:</strong> {event.organizer}
        </p>
      )}
      {event.description && (
        <p className="text-sm text-gray-700 mt-2">{event.description}</p>
      )}
      <div className="mt-4 pt-3 border-t border-gray-200 flex flex-wrap gap-x-4 gap-y-2">
        {event.link && (
          <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium flex items-center gap-1">
            <LinkIcon size={14} /> More info
          </a>
        )}
        {event.registrationLink && (
          <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="text-white bg-green-600 hover:bg-green-700 text-sm font-semibold flex items-center gap-1 px-3 py-1 rounded-md shadow-sm">
            <LinkIcon size={14} /> Register Here
          </a>
        )}
        {event.pamphletLink && (
          <a href={event.pamphletLink} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline text-sm font-medium">
            Workshop pamphlet
          </a>
        )}
        {event.flyerLink && (
          <a href={event.flyerLink} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline text-sm font-medium">
            Flyer
          </a>
        )}
      </div>
    </div>
  );
};

const TimelineSection = ({ title, events, isUpcoming }) => (
  <section>
    <h2 className="text-3xl font-bold mb-5 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700">{title}</h2>
    <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto mb-12 rounded-full"></div>
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute left-1/2 w-1 bg-gray-200 h-full -translate-x-1/2"></div>
      {events.map((event, index) => (
        <div key={event.id} className="relative mb-8 flex items-center justify-between w-full">
          <div className={`w-5/12 ${index % 2 === 0 ? 'order-1' : 'order-3'}`}></div>
          <div className={`z-10 w-12 h-12 bg-white border-4 ${isUpcoming ? 'border-indigo-500' : 'border-gray-400'} rounded-full flex items-center justify-center order-2`}>
            <Calendar className={isUpcoming ? 'text-indigo-600' : 'text-gray-500'} />
          </div>
          <div className={`w-5/12 ${index % 2 === 0 ? 'order-3' : 'order-1'}`}>
            <EventCard event={event} isUpcoming={isUpcoming} />
          </div>
        </div>
      ))}
      {events.length === 0 && (
        <p className="text-center text-gray-500">
          {isUpcoming ? 'No upcoming events at the moment. Please check back later!' : 'No past events found.'}
        </p>
      )}
    </div>
  </section>
);

// Main Events Component
const Events = () => {
  const { upcomingEvents, pastEvents } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day for comparison

    const upcoming = [];
    const past = [];

    eventsData.forEach((event) => {
      try {
        // Prioritize the start date from a range, or use the single date.
        // Handles "YYYY-MM-DD" and "Month Day, YYYY" formats.
        const dateString = event.date.split(' - ')[0].split(' to ')[0];
        const eventDate = new Date(dateString);
        if (isNaN(eventDate.getTime())) {
          // Handle invalid date strings if necessary
          past.push(event);
          return;
        }
        if (eventDate >= today) {
          upcoming.push(event);
        } else {
          past.push(event);
        }
      } catch (e) {
        // In case of parsing error, treat as a past event
        past.push(event);
      }
    });

    // Sort upcoming events chronologically (soonest first)
    upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
    // Sort past events reverse-chronologically (most recent first)
    past.sort((a, b) => new Date(b.date) - new Date(a.date));

    return { upcomingEvents: upcoming, pastEvents: past };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-500">
          Department Events
        </h1>

        <TimelineSection title="Upcoming Events" events={upcomingEvents} isUpcoming={true} />
        <TimelineSection title="Past Events" events={pastEvents} isUpcoming={false} />
      </div>
    </div>
  );
};

export default Events;
