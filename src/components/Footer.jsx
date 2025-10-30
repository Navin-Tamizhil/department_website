import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  const allLinks = [
    { href: "https://www.iith.ac.in/academics/assets/files/calendars/ITH-Acdemic-Calendar-Jul-Nov-2025.pdf", text: "Academic Calendar" },
    { href: "https://www.iith.ac.in/academics/index.html", text: "Academic Office" },
    { href: "https://aims.iith.ac.in/aims/", text: "AIMS" },
    { href: "/web-team", text: "BT Web Team", isInternal: true },
    { href: "https://dost.iith.ac.in/", text: "Dean (Student) Office" },
    { href: "https://ebsb.iith.ac.in/", text: "EBSB" },
    { href: "https://www.iith.ac.in/emergency_contacts/", text: "Emergency Contacts" },
    { href: "https://iith.ac.in/gian/", text: "GIAN" },
    { href: "https://hostel.iith.ac.in/", text: "Hostel Coordinating Unit" },
    { href: "https://intranet.iith.ac.in", text: "Intranet" },
    { href: "https://sites.google.com/iith.ac.in/safety", text: "Laboratory Safety" },
    { href: "https://library.iith.ac.in/", text: "Library" },
    { href: "https://hospital.iith.ac.in/", text: "Medical Facilities" },
    { href: "https://ocs.iith.ac.in/", text: "Office of Carrier Services [Placement/ Internship]" },
    { href: "https://www.iith.ac.in/careers/", text: "Recruitment" },
    { href: "https://sunshine.iith.ac.in/", text: "Sunshine" },
  ].sort((a, b) => a.text.localeCompare(b.text));

  const numColumns = 3;
  const itemsPerColumn = Math.ceil(allLinks.length / numColumns);
  const columns = Array.from({ length: numColumns }, (_, i) =>
    allLinks.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn)
  );

  const renderLink = (link) => {
    if (link.isInternal) {
      return <Link to={link.href} className="hover:text-indigo-400 transition">{link.text}</Link>;
    }
    return <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">{link.text}</a>;
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
        <div>
          <h5 className="text-lg font-semibold text-white text-center">Quick Links</h5>
          <div className="mt-2 mb-6 h-px w-20 bg-indigo-400 mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 text-center md:text-left">
            {columns.map((column, colIndex) => (
              <ul key={colIndex} className="space-y-2 text-sm">
                {column.map((link, linkIndex) => (
                  <li key={linkIndex}>{renderLink(link)}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>

  



        {/* Row 3 - Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Department of Biotechnology, IIT Hyderabad. All Rights Reserved.</p>
          <p className="mt-1">Last Updated: {new Date().toLocaleDateString("en-IN")}</p>
        
        
     
      </div>
    </footer>
  );
}
