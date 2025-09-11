const FacultyCard = ({ person }) => (
  <div className="bg-white rounded-xl shadow-md p-4 w-64 hover:shadow-lg transition">
    {/* Image */}
    {person.image && (
      <img
        src={person.image}
        alt={person.name}
        className="w-32 h-32 mx-auto rounded-lg object-cover"
      />
    )}

    {/* Name + Designation */}
    <h3 className="text-lg font-semibold mt-3 text-center">
      {person.name}
    </h3>
    {person.designation && (
      <p className="text-sm text-indigo-700 font-medium text-center">
        {person.designation}
      </p>
    )}

    {/* Area of Research */}
    {person.area && person.area.length > 0 && (
      <div className="mt-2">
        <p className="text-sm font-medium text-gray-700 text-center">
          Research Areas:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {person.area.map((a, idx) => (
            <li key={idx}>{a}</li>
          ))}
        </ul>
      </div>
    )}

    {/* Address */}
    {person.address && (
      <p className="mt-2 text-sm text-gray-700 text-center">
        📍 {person.address}
      </p>
    )}

    {/* Contact */}
    {(person.phone || person.email) && (
      <div className="mt-3 text-sm text-gray-700 text-center">
        {person.phone && <p>📞 {person.phone}</p>}
        {person.email && <p>✉️ {person.email}</p>}
      </div>
    )}

    {/* Lab Website */}
    {person.labWebsite && (
      <div className="mt-3 text-center">
        <a
          href={person.labWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          Click here for Lab Website
        </a>
      </div>
    )}
  </div>
);

export default FacultyCard;

