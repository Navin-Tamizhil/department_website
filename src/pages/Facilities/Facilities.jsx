import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import facilities from "./facilitiesData";

export default function Facilities() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleCard = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="min-h-screen px-4 md:px-8 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-12 drop-shadow-md">
          Research Facilities
        </h1>

        <div className="space-y-6">
          {facilities.map((fac, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`transition-all duration-300 rounded-xl backdrop-blur-lg bg-white/70 shadow-xl border border-indigo-200 overflow-hidden ${
                  isOpen ? "ring-2 ring-indigo-400" : ""
                }`}
              >
                {/* Header Button */}
                <button
                  onClick={() => toggleCard(idx)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left text-xl font-semibold text-gray-800 hover:bg-indigo-100/30 transition-colors duration-200"
                >
                  <span>{fac.name || "Unnamed Facility"}</span>
                  {isOpen ? (
                    <Minus className="w-6 h-6 text-indigo-600" />
                  ) : (
                    <Plus className="w-6 h-6 text-indigo-600" />
                  )}
                </button>

                {/* Collapsible Content */}
                {isOpen && (
                  <div className="p-6 pt-0 space-y-6 animate-fade-in">
                    {/* Image */}
                    {fac.imageUrl ? (
                      <div className="overflow-hidden rounded-lg">
                        <img
                          src={fac.imageUrl}
                          alt={fac.name}
                          className="w-full h-56 object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="h-56 flex items-center justify-center bg-gray-200 text-gray-500 rounded-lg text-sm">
                        Image ...
                      </div>
                    )}

                    {/* Make & Model */}
                    {(fac.make || fac.model) && (
                      <p className="text-sm text-gray-700">
                        {fac.make && (
                          <>
                            <strong>Make:</strong> {fac.make} <br />
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
                      <p className="text-base text-gray-800 leading-relaxed">
                        {fac.description}
                      </p>
                    )}

                    {/* Specs */}
                    {fac.specs && Object.keys(fac.specs).length > 0 && (
                      <div>
                        <h4 className="text-md font-semibold text-indigo-700 mb-1">Specifications:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          {Object.entries(fac.specs).map(([key, value]) => (
                            <li key={key}>
                              <strong>{key}:</strong> {value}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Contact */}
                    {fac.contact && (
                      <p className="text-sm text-gray-600">
                        <strong>Contact:</strong> {fac.contact}
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
