import staffdata from "./data/staff.json";
import Staff from "./StaffCard.jsx";

const StaffMembers = () => {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-indigo-800 tracking-wide">
        Staff Members
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {staffdata.map((person) => (
          <div key={person.id} className="flex"><Staff person={person} /></div>
        ))}
      </div>
    </div>
  );
};
export default StaffMembers;