import { useState } from "react";
import regularFaculty from "./data/regularFaculty.json";
import associateFaculty from "./data/associateFaculty.json";
import { ChevronDown, ChevronRight } from "lucide-react";

const FacultySection = ({ title, data, sort = false }) => {
  const [openIndex, setOpenIndex] = useState(null);


const designationOrder = {
  Professor: 1,
  "Associate Professor": 2,
  "Assistant Professor": 3,
};

const processedData = sort
  ? [...data].sort((a, b) => {
      // normalize designation
      const normalize = (designation) => {
        if (!designation) return "";
        const d = designation.toLowerCase();

        if (d.includes("professor") && !d.includes("associate") && !d.includes("assistant")) {
          // Covers both "Professor" and "Professor and Head of the Department"
          return "Professor";
        }
        if (d.includes("associate professor")) return "Associate Professor";
        if (d.includes("assistant professor")) return "Assistant Professor";
        return designation;
      };

      const normA = normalize(a.designation);
      const normB = normalize(b.designation);

      const rankA =
        designationOrder[normA] || Object.keys(designationOrder).length + 1;
      const rankB =
        designationOrder[normB] || Object.keys(designationOrder).length + 1;

      if (rankA !== rankB) {
        return rankA - rankB; // sort by priority
      }
      return a.name.localeCompare(b.name); // then alphabetically
    })
  : data;


  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-indigo-800 border-b-2 border-indigo-200 pb-2">
        {title}
      </h2>

      <div className="space-y-6">
        {processedData.map((person, idx) => (
          <div
            key={person.id}
            className="rounded-2xl shadow-lg bg-gradient-to-r from-indigo-50 to-white border border-indigo-100 overflow-hidden transition hover:shadow-xl"
          >
            {/* Header */}
            <button
              onClick={() => toggle(idx)}
              className="w-full flex justify-between items-center px-6 py-5 text-left group"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-700 transition">
                  {person.name}
                </h3>
                <p className="text-sm text-indigo-600 font-medium">
                  {person.designation}
                </p>
              </div>
              {openIndex === idx ? (
                <ChevronDown className="w-6 h-6 text-indigo-600" />
              ) : (
                <ChevronRight className="w-6 h-6 text-gray-500 group-hover:text-indigo-600" />
              )}
            </button>

            {/* Expanded Content */}
            {openIndex === idx && (
              <div className="px-6 pb-6 pt-3 flex flex-col md:flex-row gap-6 animate-fadeIn">
                {/* Image */}
                {person.image && (
                  <div className="flex-shrink-0">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="max-w-[220px] max-h-[250px] rounded-xl object-contain border-2 border-indigo-200 shadow-md bg-white p-1"
                    />
                  </div>
                )}

                {/* Details */}
                <div className="flex-1 space-y-3">
                  {/* Address */}
                  {person.address && (
                    <p className="text-sm text-gray-700 italic">
                      📍 {person.address}
                    </p>
                  )}

                  {/* Contact */}
                  {(person.phone || person.email) && (
                    <div className="text-sm text-gray-700 bg-indigo-50 p-3 rounded-lg shadow-inner">
                      {person.phone && <p>📞 {person.phone}</p>}
                      {person.email && (
                        <p>
                          ✉️{" "}
                          <a
                            href={`mailto:${person.email}`}
                            className="text-indigo-700 font-medium hover:underline"
                          >
                            {person.email}
                          </a>
                        </p>
                      )}
                    </div>
                  )}

                  {/* Research Areas */}
                  {person.area && person.area.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-indigo-700 mb-2">
                        Research Areas
                      </h4>
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {person.area.map((a, i) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Lab Website */}
                  {person.labWebsite && (
                    <a
                      href={person.labWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-full shadow hover:bg-indigo-700 transition"
                    >
                      🔗 Visit Lab Website
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Faculty = () => {
  return (
    <div className="p-8 bg-gradient-to-b from-white to-indigo-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-indigo-900">
        Meet Our Faculty
      </h1>

      {/* Regular Faculty - sorted */}
      <FacultySection title="Regular Faculty" data={regularFaculty} sort />

      {/* Associate Faculty */}
      <FacultySection title="Associate Faculty" data={associateFaculty} />
    </div>
  );
};

export default Faculty;
