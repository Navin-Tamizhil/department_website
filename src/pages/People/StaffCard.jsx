const StaffCard = ({ person }) => (
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

 

  

    {/* Contact */}
    {(person.phone || person.email) && (
      <div className="mt-3 text-sm text-gray-700 text-center">
        {person.phone && <p>📞 {person.phone}</p>}
        {person.email && <p>✉️ {person.email}</p>}
      </div>
    )}

 
  </div>
);

export default StaffCard;

