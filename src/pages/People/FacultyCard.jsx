import { Link } from "react-router-dom";

const FacultyCard = ({ person }) => (
  <Link
    to={`/faculty/${person.id}`}
    className="group bg-white rounded-xl shadow-md p-4 w-64 hover:shadow-xl transition transform hover:scale-105"
  >
    {/* Image */}
    {person.image && (
      <img
        src={person.image}
        alt={person.name}
        className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-indigo-200 group-hover:border-indigo-400 transition"
      />
    )}

    {/* Name + Designation */}
    <h3 className="text-lg font-semibold mt-3 text-center group-hover:text-indigo-700 transition">
      {person.name}
    </h3>
    {person.designation && (
      <p className="text-sm text-indigo-600 font-medium text-center">
        {person.designation}
      </p>
    )}
  </Link>
);

export default FacultyCard;
