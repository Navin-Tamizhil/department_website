import regularFaculty from "./data/regularFaculty.json";
import associateFaculty from "./data/associateFaculty.json";
import FacultyCard from "./FacultyCard";

const FacultySection = ({ title, data, sort = false }) => {
  const processedData = sort
    ? [...data].sort((a, b) => a.name.localeCompare(b.name))
    : data;

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {processedData.map((person) => (
          <FacultyCard key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

const Faculty = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Faculty</h1>

      {/* Regular Faculty - sorted */}
      <FacultySection title="Regular Faculty" data={regularFaculty} sort />

      {/* Associate Faculty - original order */}
      <FacultySection title="Associate Faculty" data={associateFaculty} />
    </div>
  );
};

export default Faculty;
