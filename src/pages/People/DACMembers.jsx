import dacdata from "./data/dac.json";
import DACCard from "./DACCard.jsx";

const DACMembers = () => {
  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-indigo-800 tracking-wide">
        Department Advisory Committee
      </h1>

      <div className="flex flex-wrap justify-center gap-10">
        {dacdata.map((person) => (
          <DACCard key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default DACMembers;


