import React, { useState } from "react";
import { Plus, Minus, Settings, Info, Mail, Phone, MapPin } from "lucide-react";
import { facilitiesData } from "./facilitiesData"; // import your dataset

export default function Facilities() {
  const [openIndex, setOpenIndex] = useState(null);

  // Sort data alphabetically by name
  const sortedFacilities = [...facilitiesData].sort((a, b) => a.name.localeCompare(b.name));

  const toggleCard = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="min-h-screen px-4 md:px-8 py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-500">
          Research Facilities
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sortedFacilities.map((fac, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`transition-all duration-500 rounded-2xl backdrop-blur-lg bg-white/70 shadow-lg hover:shadow-2xl border border-indigo-200 overflow-hidden ${
                  isOpen ? "ring-2 ring-indigo-400 scale-[1.02]" : "hover:-translate-y-1"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Image Section */}
                  <div className="relative p-4">
                    <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                      {fac.img ? (
                        <img
                          src={fac.img}
                          alt={fac.name}
                          loading="lazy"
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="text-gray-400 text-sm">No image</div>
                      )}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{fac.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">{fac.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {fac.make && <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">{fac.make}</span>}
                      {fac.model && <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">{fac.model}</span>}
                    </div>

                    <button
                      onClick={() => toggleCard(idx)}
                      className="w-full mt-auto flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-700 rounded-lg transition-all duration-300 font-semibold text-sm shadow-sm hover:shadow-md"
                    >
                      <span>{isOpen ? "Hide Details" : "Show Details"}</span>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Collapsible Details */}
                <div className={`transition-all duration-500 ease-in-out grid ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <div className="border-t border-gray-200 bg-gradient-to-br from-gray-50 to-indigo-50/30 p-6 space-y-4">
                      
                      {fac.specs && Object.keys(fac.specs).length > 0 && (
                        <div>
                          <h4 className="font-semibold text-indigo-800 mb-2 flex items-center gap-2 text-sm">
                            <Settings className="w-4 h-4" />
                            Specifications
                          </h4>
                          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 pl-2">
                            {Object.entries(fac.specs).map(([key, value]) => (
                              <li key={key}>
                                <strong className="font-medium">{key}:</strong> {value}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {(fac.contact || fac.email) && (
                        <div>
                          <h4 className="font-semibold text-indigo-800 mb-2 flex items-center gap-2 text-sm">
                            <Info className="w-4 h-4" />
                            Contact Information
                          </h4>
                          <div className="space-y-2 pl-2">
                            {fac.contact && (
                              <div className="flex items-start gap-3 text-sm text-gray-700">
                                <Phone className="w-4 h-4 text-gray-500 flex-shrink-0 mt-1" />
                                <span>{fac.contact}</span>
                              </div>
                            )}
                            {fac.email && (
                              <div className="flex items-start gap-3 text-sm text-gray-700">
                                <Mail className="w-4 h-4 text-gray-500 flex-shrink-0 mt-1" />
                                <a href={`mailto:${fac.email}`} className="text-blue-600 hover:underline break-all">
                                  {fac.email}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const ChevronDown = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
