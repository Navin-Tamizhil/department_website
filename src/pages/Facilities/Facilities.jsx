import React, { useState } from "react";
import { Plus, Minus, Settings, Info, Mail, Phone } from "lucide-react";
import { facilitiesData } from "./facilitiesData"; // import your dataset

export default function Facilities() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleCard = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Sort data alphabetically by name for consistent ordering
  const sortedFacilities = [...facilitiesData].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className="min-h-screen px-4 md:px-8 py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-500">
          Research Facilities
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedFacilities.map((fac, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`transition-all duration-500 rounded-2xl backdrop-blur-lg bg-white/70 shadow-lg hover:shadow-xl border border-indigo-200 overflow-hidden ${
                  isOpen ? "ring-2 ring-indigo-400 md:col-span-2" : "hover:-translate-y-1"
                }`}
              >
                {/* Header */}
                <button
                  onClick={() => toggleCard(idx)}
                  className="w-full flex justify-between items-center p-6 text-left text-lg font-semibold text-gray-800 hover:bg-indigo-100/40 transition-colors duration-200"
                >
                  <span>{fac.name || "Unnamed Facility"}</span>
                  {isOpen ? (
                    <Minus className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  )}
                </button>

                {/* Expanded content */}
                <div className={`transition-all duration-500 ease-in-out grid ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <div className="border-t border-gray-200 p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Image Side */}
                      <div className="flex items-center justify-center">
                        {fac.img ? (
                          <div className="w-full aspect-square bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                            <img
                              src={fac.img}
                              alt={fac.name}
                              loading="lazy"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-full aspect-square bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center text-sm">
                            No image available
                          </div>
                        )}
                      </div>

                      {/* Content Side */}
                      <div className="space-y-4">
                        {(fac.make || fac.model) && (
                          <div className="flex flex-wrap gap-2">
                            {fac.make && <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">{fac.make}</span>}
                            {fac.model && <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">{fac.model}</span>}
                          </div>
                        )}

                        {fac.description && <p className="text-gray-700 leading-relaxed">{fac.description}</p>}

                        {fac.specs && Object.keys(fac.specs).length > 0 && (
                          <div>
                            <h4 className="font-semibold text-indigo-800 mb-2 flex items-center gap-2 text-sm"><Settings className="w-4 h-4" />Specifications</h4>
                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 pl-2">
                              {Object.entries(fac.specs).map(([key, value]) => (
                                <li key={key}><strong className="font-medium">{key}:</strong> {value}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {(fac.contact || fac.email) && (
                          <div>
                            <h4 className="font-semibold text-indigo-800 mb-2 flex items-center gap-2 text-sm"><Info className="w-4 h-4" />Contact Information</h4>
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
                                  <a href={`mailto:${fac.email}`} className="text-blue-600 hover:underline break-all">{fac.email}</a>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
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
