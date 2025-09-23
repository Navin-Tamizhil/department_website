import React, { useState, useEffect, useRef } from 'react';
import { CalendarDays, ExternalLink, Clock, MapPin, Users, ChevronRight, X } from 'lucide-react';



// =============== EVENTS COMPONENT ===============
export const EventsModified = ({ onItemClick }) => {
  const [expandedEvent, setExpandedEvent] = useState(null);

  const events = [
  {
    id: 1,
    title: "Biotech Industry Meet 2025",
    date: "September 1st, 2025",
    description: "We are pleased to announce a Biotech Industry Meet 2025.",
    link: "/events/BIM_2025.pdf",
  },
  {
    id: 2,
    title: "Workshop with Hands-on Activity: Pharma and Biopharma",
    date: "August 8th, 2025",
  },
  {
    id: 3,
    title: "Orientation Hour 2025",
    date: "July 30th, 2025",
    description: "Organized by the Biotech Society, Dept. of Biotechnology, IITH, extending a warm welcome to all freshers of batch 2025.",
  },
  {
    id: 4,
    title: "International Conference and Workshop on Single-Molecule Biophysics 2026",
    date: "January 19-23, 2026",
    organizer: "Dr. Gunjan Mehta, Indian Institute of Technology Hyderabad",
  
     },
  {
    id: 5,
    title: "5-day Online Workshop on Computational Methods in Advanced & Precision Oncology",
    date: "April 7-11, 2025",
    organizer: "Department of Biotechnology, IIT Hyderabad",
  
    link: "/events/pamphlet_Oncology_2025.pdf",
  },
  {
    id: 6,
    title: "Image Processing and Data Analysis using ImageJ",
    date: "February 24-28, 2025",
    link: "/events/Image_processing_2025.pdf",
  },

    {
    id: 7,
    title: "Seminar by Prof. Jeremy Simpson",
    date: "August 29th, 2025",
    affiliation: "College of Science, University College Dublin, Ireland",
  },
  {
    id: 8,
    title: "Talk by Prof. Sachin Kotak",
    date: "August 20th, 2025",
    topic: "Understanding the mechanisms of nuclear envelope disassembly and cytokinesis in animal cells.",
    affiliation: "IISc Bangalore",
  },
  {
    id: 9,
    title: "Webinar by Aganitha Cognitive Solutions",
    date: "July 29th, 2025",
    topic: "DISTILL, advanced AI-powered transcriptomics analysis platform, built for deep single-cell insights",
  },
  {
    id: 10,
    title: "Talk by Dr. Ravi K Marreddy",
    date: "July 22nd, 2025",

    topic: "Development of Novel Therapeutic Strategies against Clostridioides difficile infections",
    affiliation: "Addition Therapeutics (USA)",
  },
];


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
      {events.map((event) => (
        <div
          key={event.id}
          onClick={(e) => handleEventClick(e, event.id, event.title)}
          className={`p-4 bg-white rounded-lg border-l-4 transition-all cursor-pointer ${
            expandedEvent === event.id 
              ? 'border-l-blue-600 shadow-lg scale-105 z-10 relative' 
              : 'border-l-blue-500 hover:shadow-md'
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
          
          <h3 className="text-sm font-semibold text-blue-700 pr-6">{event.title}</h3>
          
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
            <CalendarDays className="w-3 h-3" />
            {event.date}
          </div>
          
          {expandedEvent === event.id ? (
            <div className="mt-3 space-y-1 text-xs">
              {event.venue && (
                <p className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-3 h-3" />
                  {event.venue}
                </p>
              )}
              {event.organizer && (
                <p className="flex items-center gap-1 text-gray-600">
                  <Users className="w-3 h-3" />
                  {event.organizer}
                </p>
              )}
              {event.affiliation && (
                <p className="text-gray-600">
                  <strong>Affiliation:</strong> {event.affiliation}
                </p>
              )}
              {event.topic && (
                <p className="text-gray-600">
                  <strong>Topic:</strong> {event.topic}
                </p>
              )}
              {event.description && (
                <p className="text-gray-700 mt-2">{event.description}</p>
              )}
              {event.link && (
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 mt-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  More info <ExternalLink className="w-3 h-3" />
                </a>
              )}
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

// =============== DEMO HOME PAGE WITH SCROLLING CONTROL ===============
export default function HomePageDemo() {
  const [scrollingPaused, setScrollingPaused] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (itemTitle) => {
    setScrollingPaused(true);
    setSelectedItem(itemTitle);
    
    // Auto-resume scrolling after 5 seconds (optional)
    setTimeout(() => {
      setScrollingPaused(false);
      setSelectedItem(null);
    }, 5000);
  };

  const resumeScrolling = () => {
    setScrollingPaused(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      {/* Status Bar */}
      {scrollingPaused && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-yellow-100 border border-yellow-400 rounded-lg px-4 py-2 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="text-sm text-yellow-800">
              Scrolling paused - viewing: <strong>{selectedItem}</strong>
            </span>
            <button 
              onClick={resumeScrolling}
              className="px-3 py-1 bg-yellow-500 text-white rounded text-xs font-semibold hover:bg-yellow-600"
            >
              Resume Scrolling
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Department Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Announcements Section */}
          <div>
            <h2 className="text-2xl font-extrabold text-indigo-800 mb-4 text-center">
              Announcements
            </h2>
            <div className="bg-white rounded-2xl shadow-lg p-6 max-h-[500px] overflow-hidden relative">
              <div className={scrollingPaused ? '' : 'animate-scroll-slow'}>
                <AnnouncementsModified onItemClick={handleItemClick} />
                {/* Duplicate for infinite scroll effect */}
                <div className="mt-4">
                  <AnnouncementsModified onItemClick={handleItemClick} />
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <a
                href="/announcements"
                className="inline-block bg-indigo-600 text-white font-semibold px-5 py-2 rounded-xl shadow-md hover:bg-indigo-700 transition"
              >
                View All Announcements →
              </a>
            </div>
          </div>

          {/* Events Section */}
          <div>
            <h2 className="text-2xl font-extrabold text-green-800 mb-4 text-center">
              Events
            </h2>
            <div className="bg-white rounded-2xl shadow-lg p-6 max-h-[500px] overflow-hidden relative">
              <div className={scrollingPaused ? '' : 'animate-scroll-fast'}>
                <EventsModified onItemClick={handleItemClick} />
                {/* Duplicate for infinite scroll effect */}
                <div className="mt-4">
                  <EventsModified onItemClick={handleItemClick} />
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <a
                href="/events"
                className="inline-block bg-green-600 text-white font-semibold px-5 py-2 rounded-xl shadow-md hover:bg-green-700 transition"
              >
                View All Events →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for scrolling animations */}
      <style jsx>{`
        @keyframes scroll-slow {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        
        @keyframes scroll-fast {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        
        .animate-scroll-slow {
          animation: scroll-slow 20s linear infinite;
        }
        
        .animate-scroll-fast {
          animation: scroll-fast 15s linear infinite;
        }
        
        .animate-scroll-slow:hover,
        .animate-scroll-fast:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}