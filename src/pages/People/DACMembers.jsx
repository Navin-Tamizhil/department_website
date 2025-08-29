import dacdata from "./data/dac.json";
import DACCard from "./DACCard.jsx";

const DACMembers = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">DAC Members</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dacdata.map((person) => (
          <DACCard key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default DACMembers;
