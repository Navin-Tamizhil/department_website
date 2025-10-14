import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { facilitiesData } from "./facilitiesData"; // import your dataset

export default function Facilities() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleCard = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="min-h-screen px-4 md:px-8 py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-500">
          Research Facilities
        </h1>

        <div className="space-y-6">
          {facilitiesData.map((fac, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`transition-all duration-300 rounded-2xl backdrop-blur-lg bg-white/70 shadow-xl border border-indigo-200 overflow-hidden ${
                  isOpen ? "ring-2 ring-indigo-400" : ""
                }`}
              >
                {/* Header */}
                <button
                  onClick={() => toggleCard(idx)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left text-xl font-semibold text-gray-800 hover:bg-indigo-100/40 transition-colors duration-200"
                >
                  <span>{fac.name || "Unnamed Facility"}</span>
                  {isOpen ? (
                    <Minus className="w-6 h-6 text-indigo-600" />
                  ) : (
                    <Plus className="w-6 h-6 text-indigo-600" />
                  )}
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div className="p-6 pt-0 space-y-5 animate-fade-in">
                    {/* Image */}
                    {fac.img ? (
                      <div className="overflow-hidden rounded-lg">
                        <img
                          src={fac.img}
                          alt={fac.name}
                          loading="lazy"
                          className="w-full h-64 object-contain rounded-lg transform hover:scale-105 transition-transform duration-300 bg-gray-100"
                        />
                      </div>
                    ) : (
                      <div className="h-56 flex items-center justify-center bg-gray-100 text-gray-500 rounded-lg text-sm">
                        No image available
                      </div>
                    )}

                    {/* Optional fields */}
                    {(fac.make || fac.model) && (
                      <p className="text-sm text-gray-700">
                        {fac.make && (
                          <>
                            <strong>Make:</strong> {fac.make}
                            <br />
                          </>
                        )}
                        {fac.model && (
                          <>
                            <strong>Model:</strong> {fac.model}
                          </>
                        )}
                      </p>
                    )}

                    {/* Description */}
                    {fac.description && (
                      <p className="text-gray-800 leading-relaxed">
                        {fac.description}
                      </p>
                    )}

                    {/* Specifications */}
                    {fac.specs && Object.keys(fac.specs).length > 0 && (
                      <div>
                        <h4 className="text-md font-semibold text-indigo-700 mb-1">
                          Specifications:
                        </h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          {Object.entries(fac.specs).map(([key, value]) => (
                            <li key={key}>
                              <strong>{key}:</strong> {value}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Contact info */}
                    {(fac.contact || fac.email) && (
                      <p className="text-sm text-gray-600">
                        {fac.contact && (
                          <>
                            <strong>Contact:</strong> {fac.contact}
                            <br />
                          </>
                        )}
                        {fac.email && (
                          <>
                            <strong>Email:</strong>{" "}
                            <a
                              href={`mailto:${fac.email}`}
                              className="text-blue-600 hover:underline"
                            >
                              {fac.email}
                            </a>
                          </>
                        )}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
