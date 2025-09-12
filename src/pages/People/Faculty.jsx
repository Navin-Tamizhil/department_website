import { useParams } from "react-router-dom";
import regularFaculty from "./data/regularFaculty.json";
import associateFaculty from "./data/associateFaculty.json";

export default function FacultyProfile() {
  const { id } = useParams();

  // Find faculty by ID in both lists
  const allFaculty = [...regularFaculty, ...associateFaculty];
  const person = allFaculty.find((f) => String(f.id) === id);

  if (!person) return <h2 className="p-6 text-xl text-red-600">Faculty not found</h2>;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
        
        {/* Image */}
        {person.image && (
          <img
            src={person.image}
            alt={person.name}
            className="w-60 h-60 rounded-2xl object-cover shadow-lg border-4 border-indigo-200"
          />
        )}

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800">{person.name}</h1>
          {person.designation && (
            <p className="text-lg text-indigo-600 font-medium mt-1">{person.designation}</p>
          )}

          {/* Address */}
          {person.address && (
            <p className="mt-3 text-gray-700">📍 {person.address}</p>
          )}

          {/* Contact */}
          {(person.phone || person.email) && (
            <div className="mt-4 space-y-1 text-gray-700">
              {person.phone && <p>📞 {person.phone}</p>}
              {person.email && (
                <p>
                  ✉️{" "}
                  <a
                    href={`mailto:${person.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {person.email}
                  </a>
                </p>
              )}
            </div>
          )}

          {/* Research Areas */}
          {person.area && person.area.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Research Areas</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {person.area.map((a, idx) => (
                  <li key={idx}>{a}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Lab Website */}
          {person.labWebsite && (
            <div className="mt-6">
              <a
                href={person.labWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
              >
                🔗 Visit Lab Website
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
