// ==== DATA ====

// Separate event objects
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





import React from "react";

// ==== DATA ====


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


// Main Component
const Events = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 font-sans bg-gray-50 rounded-lg">
      {/* Events Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-blue-700 border-b-4 border-blue-600 pb-2 mb-6">
          Events
        </h2>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </section>

      
    </div>
  );
};

export default Events;