import staffdata from "./data/staff.json";
import Staff from "./StaffCard.jsx";

const StaffMembers = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Staff Members</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {staffdata.map((person) => (
          <Staff key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};
export default StaffMembers;