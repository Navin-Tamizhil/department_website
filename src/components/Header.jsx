const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null); // For mobile submenu open/close
  const location = useLocation();
  const dropdownRef = useRef(null);

  // ... your existing code ...

  // helper functions same as before

  return (
    <header className="flex flex-col w-full">
      {/* ... Top Bar and desktop nav as before ... */}

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        ☰
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-2 animate-slideDown">
          <Link
            to="/"
            className={`block px-4 py-2 ${isActive("/")}`}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>

          {/* Mobile Academics Dropdown */}
          <div>
            <button
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center ${
                isParentActive("/academics")
              }`}
              onClick={() =>
                setMobileDropdown(mobileDropdown === "academics" ? null : "academics")
              }
            >
              Academics
              <span>{mobileDropdown === "academics" ? "▲" : "▼"}</span>
            </button>
            {mobileDropdown === "academics" && (
              <div className="pl-4">
                <Link
                  to="/academics/programs"
                  className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/academics/programs")}`}
                  onClick={() => setMobileOpen(false)}
                >
                  Programs
                </Link>
                <Link
                  to="/academics/committee"
                  className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/academics/committee")}`}
                  onClick={() => setMobileOpen(false)}
                >
                  Committee
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Research Dropdown */}
          <div>
            <button
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center ${
                isParentActive("/research")
              }`}
              onClick={() =>
                setMobileDropdown(mobileDropdown === "research" ? null : "research")
              }
            >
              Research
              <span>{mobileDropdown === "research" ? "▲" : "▼"}</span>
            </button>
            {mobileDropdown === "research" && (
              <div className="pl-4">
                <Link
                  to="/research/researcharea"
                  className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/research/researcharea")}`}
                  onClick={() => setMobileOpen(false)}
                >
                  Research Areas
                </Link>
                <Link
                  to="/research/projects"
                  className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/research/projects")}`}
                  onClick={() => setMobileOpen(false)}
                >
                  Projects
                </Link>
                <Link
                  to="/research/collaborations"
                  className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/research/collaborations")}`}
                  onClick={() => setMobileOpen(false)}
                >
                  Collaborations
                </Link>
              </div>
            )}
          </div>

          {/* Mobile People Dropdown */}
          <div>
            <button
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center ${
                isParentActive("/people")
              }`}
              onClick={() =>
                setMobileDropdown(mobileDropdown === "people" ? null : "people")
              }
            >
              People
              <span>{mobileDropdown === "people" ? "▲" : "▼"}</span>
            </button>
            {mobileDropdown === "people" && (
              <div className="pl-4">
                <Link
                  to="/people/faculty"
                  className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/people/faculty")}`}
                  onClick={() => setMobileOpen(false)}
                >
                  Faculty
                </Link>
                <Link
                  to="/people/dacmembers"
                  className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/people/dacmembers")}`}
                  onClick={() => setMobileOpen(false)}
                >
                  DAC Members
                </Link>
                <Link
                  to="/people/staff"
                  className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/people/staff")}`}
                  onClick={() => setMobileOpen(false)}
                >
                  Staff
                </Link>
                <Link
                  to="/people/students"
                  className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/people/students")}`}
                  onClick={() => setMobileOpen(false)}
                >
                  Students
                </Link>
                <Link
                  to="/people/alumni"
                  className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/people/alumni")}`}
                  onClick={() => setMobileOpen(false)}
                >
                  Alumni
                </Link>
              </div>
            )}
          </div>

          {/* Other links */}
          <Link
            to="/facilities"
            className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/facilities")}`}
            onClick={() => setMobileOpen(false)}
          >
            Facilities
          </Link>
          <Link
            to="/achievements"
            className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/achievements")}`}
            onClick={() => setMobileOpen(false)}
          >
            Achievements
          </Link>
          <Link
            to="/announcements"
            className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/announcements")}`}
            onClick={() => setMobileOpen(false)}
          >
            Announcements
          </Link>
          <Link
            to="/events"
            className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/events")}`}
            onClick={() => setMobileOpen(false)}
          >
            Events
          </Link>
          <Link
            to="/contact"
            className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/contact")}`}
            onClick={() => setMobileOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
};
