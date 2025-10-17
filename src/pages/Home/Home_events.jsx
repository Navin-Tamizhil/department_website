import React, { useState } from 'react';
import { CalendarDays, ExternalLink, MapPin, Users, Link as LinkIcon, X } from 'lucide-react';
import { eventsData } from '../Events/eventsData';

const EventsModified = ({ onItemClick }) => {
  const [expandedEvent, setExpandedEvent] = useState(null);

  // Filter events to only include those with islatest: true
  const latestEvents = eventsData.filter(event => event.isLatest);

  const handleEventClick = (e, eventId, eventTitle) => {
    e.stopPropagation();
    setExpandedEvent(eventId);
    if (onItemClick) {
      onItemClick(eventTitle);
    }
  };

  const closeExpanded = (e) => {
    e.stopPropagation();
    setExpandedEvent(null);
  };

  return (
    <div className="space-y-3">
      {latestEvents.map((event) => (
        <div
          key={event.id}
          onClick={(e) => handleEventClick(e, event.id, event.title)}
          className={`p-4 bg-white rounded-lg border-l-4 transition-all cursor-pointer ${
            expandedEvent === event.id 
              ? 'border-l-green-600 shadow-lg scale-105 z-10 relative' 
              : 'border-l-green-500 hover:shadow-md'
          }`}
        >
          {expandedEvent === event.id && (
            <button 
              onClick={closeExpanded}
              className="absolute top-2 right-2 p-1 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          
          <h3 className="text-sm font-semibold text-green-700 pr-6">{event.title}</h3>
          
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
            <CalendarDays className="w-3 h-3" />
            {event.date}
          </div>
          
          {expandedEvent === event.id ? (
            <div className="mt-3 space-y-1 text-xs">
              {event.venue && (
                <p className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-3 h-3" /> {event.venue}
                </p>
              )}
              {event.organizer && (
                <p className="flex items-center gap-1 text-gray-600">
                  <Users className="w-3 h-3" /> {event.organizer}
                </p>
              )}
              {event.affiliation && <p className="text-gray-600"><strong>Affiliation:</strong> {event.affiliation}</p>}
              {event.topic && <p className="text-gray-600"><strong>Topic:</strong> {event.topic}</p>}
              {event.description && <p className="text-gray-700 mt-2">{event.description}</p>}
              
              <div className="mt-4 pt-3 border-t border-gray-200 flex flex-wrap gap-x-4 gap-y-2">
                {event.link && (
                  <a href={event.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1 text-blue-600 hover:underline font-medium">
                    <ExternalLink className="w-3 h-3" /> More info
                  </a>
                )}
                {event.registrationLink && (
                  <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="text-white bg-green-600 hover:bg-green-700 font-semibold flex items-center gap-1 px-3 py-1 rounded-md shadow-sm">
                    <LinkIcon size={14} /> Register Here
                  </a>
                )}
                {event.pamphletLink && (
                  <a href={event.pamphletLink} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline font-medium">
                    Workshop pamphlet
                  </a>
                )}
                {event.flyerLink && (
                  <a href={event.flyerLink} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline font-medium">
                    Flyer
                  </a>
                )}
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-500 mt-1">
              Click to view details
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
export default EventsModified;
