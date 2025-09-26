import { useState } from "react";
import regularFaculty from "./data/regularFaculty.json";
import { DistinguishedFaculty, AffiliatedFaculty } from "./data/associateFaculty";
import { ChevronDown, ChevronRight, Phone, Mail, MapPin, ExternalLink, GraduationCap } from "lucide-react";

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
    <div className="mb-16">
      <h2 className="text-4xl font-bold mb-8 text-indigo-800 border-b-3 border-indigo-200 pb-3 text-center">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {processedData.map((person, idx) => (
          <div
            key={person.id}
            className="bg-white rounded-2xl shadow-lg border border-indigo-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            {/* Always Visible Content */}
            <div className="p-6">
              {/* Image */}
              <div className="flex justify-center mb-4">
                {person.image ? (
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-32 h-36 rounded-xl object-cover border-2 border-indigo-200 shadow-md"
                  />
                ) : (
                  <div className="w-32 h-36 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl border-2 border-indigo-200 flex items-center justify-center shadow-md">
                    <GraduationCap className="w-16 h-16 text-indigo-400" />
                  </div>
                )}
              </div>

              {/* Name */}
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2 leading-tight">
                {person.name}
              </h3>

              {/* Designation */}
              <p className="text-sm text-indigo-600 font-medium text-center mb-4 leading-tight">
                {person.designation}
              </p>

              {/* Expand Button */}
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors duration-200 font-medium text-sm"
              >
                {openIndex === idx ? (
                  <>
                    <span>Show Less</span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>View Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Expandable Details */}
            {openIndex === idx && (
              <div className="border-t border-indigo-100 bg-gradient-to-b from-indigo-50 to-white">
                <div className="p-6 space-y-4 animate-fadeIn">
                  {/* Address */}
                  {person.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700">{person.address}</p>
                    </div>
                  )}

                  {/* Phone */}
                  {person.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                      <a 
                        href={`tel:${person.phone}`}
                        className="text-sm text-gray-700 hover:text-indigo-700 transition-colors"
                      >
                        {person.phone}
                      </a>
                    </div>
                  )}

                  {/* Email */}
                  {person.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                      <a
                        href={`mailto:${person.email}`}
                        className="text-sm text-indigo-700 font-medium hover:underline break-all"
                      >
                        {person.email}
                      </a>
                    </div>
                  )}

                  {/* Research Areas */}
                  {person.area && person.area.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-indigo-700 mb-3 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5" />
                        Research Areas
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {person.area.map((area, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Lab Website */}
                  {person.labWebsite && (
                    <div className="pt-2">
                      <a
                        href={person.labWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-indigo-700 transition-colors duration-200"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Visit Lab Website
                      </a>
                    </div>
                  )}

                  {/* Additional Fields - Dynamic rendering */}
                  {Object.entries(person).map(([key, value]) => {
                    // Skip already displayed fields
                    const skipFields = ['id', 'name', 'designation', 'image', 'address', 'phone', 'email', 'area', 'labWebsite'];
                    if (skipFields.includes(key) || !value) return null;

                    // Handle arrays
                    if (Array.isArray(value)) {
                      return (
                        <div key={key}>
                          <h4 className="font-semibold text-indigo-700 mb-2 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-2">
                            {value.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      );
                    }

                    // Handle URLs
                    if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('www'))) {
                      return (
                        <div key={key}>
                          <h4 className="font-semibold text-indigo-700 mb-2 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                          <a
                            href={value.startsWith('http') ? value : `https://${value}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-indigo-700 hover:underline break-all flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {value}
                          </a>
                        </div>
                      );
                    }

                    // Handle regular strings
                    return (
                      <div key={key}>
                        <h4 className="font-semibold text-indigo-700 mb-2 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <p className="text-sm text-gray-700">{value}</p>
                      </div>
                    );
                  })}
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4 text-indigo-900">
            Meet Our Faculty
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the brilliant minds shaping the future of biotechnology at IIT Hyderabad
          </p>
        </div>

        {/* Regular Faculty - sorted */}
        <FacultySection title="Regular Faculty" data={regularFaculty} sort />

      {/* Distinguished Faculty */}
<FacultySection title="Distinguished Faculty" data={DistinguishedFaculty} />

{/* Affiliated Faculty */}
<FacultySection title="Affiliated Faculty" data={AffiliatedFaculty} />
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Faculty;