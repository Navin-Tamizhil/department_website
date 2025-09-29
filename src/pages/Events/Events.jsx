import React from "react";
import { eventsData } from "./eventsData";

// Event Card Component
const EventCard = ({ event }) => (
  <div className="event-card shadow-md rounded-lg p-6 mb-6 border-l-8 border-blue-600 bg-white hover:shadow-lg transition">
    <h3 className="text-xl font-semibold mb-2 text-blue-700">{event.title}</h3>
    <p className="text-sm text-gray-600 mb-1">
      <strong>Date:</strong> {event.date}
    </p>
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
    {event.registrationDeadline && (
      <p className="text-sm text-gray-600 mb-1">
        <strong>Last date for registration:</strong> {event.registrationDeadline}
      </p>
    )}
    {event.registrationOpen && (
      <p className="text-sm text-gray-600 mb-1">
        <strong>Registration opens:</strong> {event.registrationOpen}
      </p>
    )}
    {event.description && (
      <p className="text-gray-700 mb-2">{event.description}</p>
    )}

    {/* Links */}
    <div className="space-x-4">
      {event.link && (
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          More info
        </a>
      )}
      {event.registrationLink && (
        <a
          href={event.registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:underline text-sm font-medium"
        >
          Register here
        </a>
      )}
      {event.pamphletLink && (
        <a
          href={event.pamphletLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 hover:underline text-sm font-medium"
        >
          Workshop pamphlet
        </a>
      )}
      {event.flyerLink && (
        <a
          href={event.flyerLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 hover:underline text-sm font-medium"
        >
          Flyer
        </a>
      )}
    </div>
  </div>
);

// Main Events Component
const Events = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 font-sans bg-gray-50 rounded-lg">
      {/* Events Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-blue-700 border-b-4 border-blue-600 pb-2 mb-6">
          Events
        </h2>
        {eventsData.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </section>
    </div>
  );
};

export default Events;
