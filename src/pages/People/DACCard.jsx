const DACCard = ({ person }) => {
  return (
    <div className="relative group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 w-80 overflow-hidden">
      {/* Image */}
      <div className="flex justify-center mt-6">
        <img
          src={person.image}
          alt={person.name}
          className="rounded-xl border-4 border-indigo-200 shadow-md max-h-64 w-auto group-hover:shadow-xl transition duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5 text-center">
        <h3 className="text-xl font-bold text-gray-800">{person.name}</h3>
        <p className="text-sm text-indigo-600 font-medium mt-1">
          {person.designation}
        </p>

        {/* Divider */}
        <div className="mt-3 border-t border-gray-200"></div>

        {/* Contact Info */}
        <div className="mt-4 space-y-2 text-sm text-gray-600">
          {person.email && (
            <p className="flex items-center justify-center gap-2">
              ✉️{" "}
              <a
                href={`mailto:${person.email}`}
                className="hover:underline text-indigo-700"
              >
                {person.email}
              </a>
            </p>
          )}
          {person.phone && <p>📞 {person.phone}</p>}
          {person.link && (
            <p className="flex items-center justify-center gap-2">
              🔗{" "}
              <a
                href={person.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-indigo-700"
              >
                Website
              </a>
            </p>
          )} 
        </div>
      </div>

  
    </div>
  );
};

export default DACCard;
