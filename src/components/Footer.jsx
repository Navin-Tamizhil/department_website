import { useLocation, useNavigate } from "react-router-dom";
import { BookOpen, Users, FileText } from "lucide-react";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  // highlight active internal links
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        
        {/* Row 1 - Gallery, Facebook, Brochure */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center md:text-left">
          <button
            onClick={() => navigate("/gallery")}
            className={`flex items-center justify-center md:justify-start gap-2 hover:text-indigo-400 transition ${
              isActive("/gallery") ? "text-indigo-400 font-semibold" : ""
            }`}
          >
            <BookOpen className="w-5 h-5" /> <span>Gallery</span>
          </button>

          <a
            href="https://www.facebook.com/biotechiith/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center md:justify-start gap-2 hover:text-indigo-400 transition"
          >
            <Users className="w-5 h-5" /> <span>Facebook</span>
          </a>

          <a
            href="/footer/Dept_brouchere.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center md:justify-start gap-2 hover:text-indigo-400 transition"
          >
            <FileText className="w-5 h-5" /> <span>Department Brochure</span>
          </a>
        </div>

        {/* Row 2 - Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 text-center md:text-left">
          <div>
            <h5 className="text-lg font-semibold text-white">Resources</h5>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="https://iith.ac.in/gian/" target="_blank" className="hover:text-indigo-400 transition">GIAN</a>
              </li>
               <li>
                <a href="https://aims.iith.ac.in/aims/" target="_blank" className="hover:text-indigo-400 transition">AIMS</a>
              </li>
              <li>
                <a href="https://library.iith.ac.in/" target="_blank" className="hover:text-indigo-400 transition">Library</a>
              </li>
              <li>
                <a href="https://iith.ac.in/computer-centre/" className="hover:text-indigo-400 transition">Computer Centre</a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-semibold text-white">Campus</h5>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="https://www.iith.ac.in/bus_schedule/" className="hover:text-indigo-400 transition">Bus Schedule</a>
              </li>
              <li>
                <a href="https://sunshine.iith.ac.in/" className="hover:text-indigo-400 transition">Sunshine</a>
              </li>
              <li>
                <a href="https://hospital.iith.ac.in/" target="_blank" className="hover:text-indigo-400 transition">Medical Facilities</a>
              </li>
              <li>
                <a href="https://iith.ac.in/about/aboutiith/#reach" className="hover:text-indigo-400 transition">Getting Here</a>
              </li>
              
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-semibold text-white">Internal</h5>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="https://intranet.iith.ac.in" target="_blank" className="hover:text-indigo-400 transition">Intranet</a>
              </li>
              <li>
                <button
                  onClick={() => navigate("/emergency_contacts")}
                  className={`hover:text-indigo-400 transition ${
                    isActive("/emergency_contacts") ? "text-indigo-400 font-semibold" : ""
                  }`}
                >
                  Emergency Contacts
                </button>
              </li>
              <li>
                <a href="https://iith.ac.in/statutory-bodies/" target="_blank" className="hover:text-indigo-400 transition">
                  Statutory Bodies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Row 3 - Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Department of Biotechnology, IIT Hyderabad. All Rights Reserved.</p>
          <p className="mt-1">Last Updated: {new Date().toLocaleDateString("en-IN")}</p>
        </div>
      </div>
    </footer>
  );
}
