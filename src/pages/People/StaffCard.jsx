const StaffCard = ({ person }) => (
  <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-sm mx-auto hover:shadow-lg transition flex flex-col items-center">
    {/* Image */}
       {person.image && (
      <img
        src={person.image}
        alt={person.name}
        className="w-40 h-40 mx-auto rounded-lg object-cover"
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

