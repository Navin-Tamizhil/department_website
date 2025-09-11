import React, { useState } from "react";
import { Plus, Minus } from "lucide-react"; // icons
import facilities from "./facilitiesData";

export default function Facilities() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleCard = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Research Facilities</h1>
      <div className="space-y-4">
        {facilities.map((fac, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Header with title + toggle button */}
            <button
              onClick={() => toggleCard(idx)}
              className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-semibold text-gray-800 hover:bg-gray-50"
            >
              {fac.name || "Unnamed Facility"}
              {openIndex === idx ? (
                <Minus className="w-5 h-5 text-gray-600" />
              ) : (
                <Plus className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Collapsible details */}
            {openIndex === idx && (
              <div className="p-6 border-t border-gray-200 space-y-4">
                {/* Image */}
                {fac.imageUrl ? (
                  <img
                    src={fac.imageUrl}
                    alt={fac.name}
                    className="h-40 w-full object-cover rounded"
                  />
                ) : (
                  <div className="h-40 w-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm rounded">
                    No Image Available
                  </div>
                )}

                {/* Make & Model */}
                {(fac.make || fac.model) && (
                  <p className="text-sm text-gray-600">
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
                  <p className="text-gray-700">{fac.description}</p>
                )}

                {/* Specs */}
                {fac.specs && Object.keys(fac.specs).length > 0 && (
                  <ul className="space-y-1 text-gray-700 text-sm list-disc list-inside">
                    {Object.entries(fac.specs).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key}:</strong> {value}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Contact */}
                {fac.contact && (
                  <p className="text-gray-600 text-sm">
                    <strong>Contact:</strong> {fac.contact}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
