import { useState, useMemo } from "react";
import regularFaculty from "./data/regularFaculty.json";
import { DistinguishedFaculty, AffiliatedFaculty } from "./data/associateFaculty";
import { ChevronDown, Phone, Mail, MapPin, ExternalLink, GraduationCap, Search, Building, Link as LinkIcon } from "lucide-react";

const FacultyCard = ({ person }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200/80 overflow-hidden transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-2 group">
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-bl-full transition-all duration-500 group-hover:w-32 group-hover:h-32"></div>
      
      <div className="p-6 text-center relative z-10">
        <div className="relative inline-block mb-4">
          {person.image ? (
            <img
              src={person.image}
              alt={person.name}
              className="w-32 h-36 rounded-xl object-cover mx-auto border-4 border-white shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
            />
          ) : (
            <div className="w-32 h-36 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl mx-auto flex items-center justify-center shadow-md transition-transform duration-500 group-hover:scale-110">
              <GraduationCap className="w-16 h-16 text-indigo-400 transition-transform duration-500 group-hover:rotate-12" />
            </div>
          )}
          {/* Floating ring decoration */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-36 h-2 bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent rounded-full blur-sm"></div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-1 transition-colors group-hover:text-indigo-700">{person.name}</h3>
        <p className="text-sm text-indigo-600 font-medium mb-4 line-clamp-2 h-10">{person.designation}</p>
        <button
          onClick={toggle}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-700 rounded-lg transition-all duration-300 font-semibold text-sm shadow-sm hover:shadow-md"
        >
          <span>{isOpen ? "Show Less" : "View Details"}</span>
          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className={`transition-all duration-500 ease-in-out grid ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="border-t border-gray-200 bg-gradient-to-br from-gray-50 to-indigo-50/30 p-6 space-y-4">
            {person.address && <InfoItem icon={MapPin} text={person.address} isLink={false} />}
            {person.phone && <InfoItem icon={Phone} text={person.phone} href={`tel:${person.phone}`} isLink={false} />}
            {person.email && <InfoItem icon={Mail} text={person.email} href={`mailto:${person.email}`} isLink={false} />}
            {person.iithPage && <InfoItem icon={Building} text="IITH Page" href={person.iithPage} isLink />}
            {person.googleScholar && <InfoItem icon={GraduationCap} text="Google Scholar" href={person.googleScholar} isLink />}
            {person.personalWebsite && <InfoItem icon={LinkIcon} text="Personal Website" href={person.personalWebsite} isLink />}
            {person.labWebsite && <InfoItem icon={ExternalLink} text="Lab Website" href={person.labWebsite} isLink />}
            
            {person.area && person.area.length > 0 && (
              <div className="pt-2">
                <h4 className="font-semibold text-indigo-800 mb-2 flex items-center gap-2 text-sm">
                  <GraduationCap className="w-4 h-4" />
                  Research Areas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {person.area.map((area, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 text-xs font-semibold rounded-full shadow-sm hover:shadow-md transition-shadow"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FacultySection = ({ title, data, sort = false }) => {
  const designationOrder = {
    Professor: 1,
    "Associate Professor": 2,
    "Assistant Professor": 3,
  };

  const processedData = useMemo(() => {
    if (!sort) return data;

    return [...data].sort((a, b) => {
      // normalize designation
      const normalize = (designation) => {
        if (!designation) return "";
        const d = designation.toLowerCase();

        if (d.includes("professor") && !d.includes("associate") && !d.includes("assistant")) {
          // Covers both "Professor" and "Professor and Head of the Department"
          return "Professor";
        }
        if (d.includes("associate professor")) return "Associate Professor";
        if (d.includes("assistant professor")) return "Assistant Professor";
        return designation;
      };

      const normA = normalize(a.designation);
      const normB = normalize(b.designation);

      const rankA =
        designationOrder[normA] || Object.keys(designationOrder).length + 1;
      const rankB =
        designationOrder[normB] || Object.keys(designationOrder).length + 1;

      if (rankA !== rankB) {
        return rankA - rankB; // sort by priority
      }
      return a.name.localeCompare(b.name); // then alphabetically
    });
  }, [data, sort]);

  return (
    <div className="mb-16">
      <h2 className="text-4xl font-bold mb-5 leading-[1.5] text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 drop-shadow-sm">
        {title}
      </h2>
      <div className="w-32 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto mb-12 rounded-full"></div>
      <div
        className={`gap-8 ${
          processedData.length < 3 ? 'flex flex-wrap justify-center' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {processedData.map((person) => (
          <FacultyCard key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

const AffiliatedFacultySection = ({ title, data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="mb-16 mt-24">
      <div className="relative text-center mb-12">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 text-2xl font-semibold text-gray-700">{title}</span>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-12">
        {data.map((person) => <FacultyCard key={person.id} person={person} />)}
      </div>
    </div>
  );
};

const InfoItem = ({ icon: Icon, text, href, isLink = false }) => (
  <div className="flex items-start gap-3 group/info">
    <Icon className="w-4 h-4 text-gray-500 group-hover/info:text-indigo-600 flex-shrink-0 mt-1 transition-colors" />
    {href ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`text-sm font-medium hover:underline break-words ${isLink ? 'text-indigo-700' : 'text-gray-700 group-hover/info:text-indigo-700'}`}>
        {text}
      </a>
    ) : (
      <p className="text-sm text-gray-600 break-words">{text}</p>
    )}
  </div>
);

const Faculty = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterFaculty = (data) => {
    if (!searchQuery) return data;

    const query = searchQuery.toLowerCase();
    return data.filter((person) => {
      const nameMatch = person.name.toLowerCase().includes(query);
      const areaMatch =
        person.area &&
        person.area.some((area) => area.toLowerCase().includes(query));
      return nameMatch || areaMatch;
    });
  };

  const filteredRegularFaculty = filterFaculty(regularFaculty);
  const filteredDistinguishedFaculty = filterFaculty(DistinguishedFaculty);
  const filteredAffiliatedFaculty = filterFaculty(AffiliatedFaculty);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="relative mb-16">
          <div className="text-center">
           <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-[1.5] text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-purple-600">
              Meet Our Faculty
          </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the brilliant minds shaping the future of biotechnology at IIT Hyderabad
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="absolute top-0 right-0 w-full md:w-auto md:max-w-sm mt-4 md:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or research area..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Regular Faculty - sorted */}
        {filteredRegularFaculty.length > 0 && <FacultySection title="Regular Faculty" data={filteredRegularFaculty} sort />}

        {/* Distinguished Faculty */}
        {filteredDistinguishedFaculty.length > 0 && <FacultySection title="Distinguished Faculty" data={filteredDistinguishedFaculty} />}

        {/* Affiliated Faculty */}
        <AffiliatedFacultySection title="Affiliated Faculty" data={filteredAffiliatedFaculty} />
      </div>
    </div>
  );
};

export default Faculty;