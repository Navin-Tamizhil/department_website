import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./iithlogo.png";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const headerRef = useRef(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/"
        ? "text-yellow-300 border-b-2 border-yellow-300 font-semibold"
        : "hover:text-yellow-200 transition-colors duration-200 font-normal";
    }
    // Only highlight main page, not subpages
    return location.pathname === path
      ? "text-yellow-300 border-b-2 border-yellow-300 font-semibold"
      : "hover:text-yellow-200 transition-colors duration-200 font-normal";
  };

  const navItems = [
    { name: "Home", path: "/" },
    {
      name: "Academics",
      path: "/academics",
      sub: [
        { name: "Programs", path: "/academics/programs" },
        { name: "Committee", path: "/academics/committee" },
      ],
    },
    {
      name: "Research",
      path: "/research",
      sub: [
        { name: "Research Areas", path: "/research/researcharea" },
        { name: "Projects", path: "/research/projects" },
        { name: "Collaborations", path: "/research/collaborations" },
      ],
    },
    {
      name: "People",
      path: "/people",
      sub: [
        { name: "Faculty", path: "/people/faculty" },
        { name: "DAC Members", path: "/people/dacmembers" },
        { name: "Staff", path: "/people/staff" },
        { name: "Students", path: "/people/students" },
        { name: "Alumni", path: "/people/alumni" },
      ],
    },
    { name: "Facilities", path: "/facilities" },
    { name: "Achievements", path: "/achievements" },
    { name: "Announcements", path: "/announcements" },
    { name: "Events", path: "/events" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleDropdown = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const handleMainLinkClick = (item, e) => {
    if (item.sub) {
      e.preventDefault(); // Prevent navigation for items with submenus
      toggleDropdown(item.name);
    }
  };

  return (
    <header 
      ref={headerRef}
      className="bg-indigo-900 text-white shadow-lg w-full top-0 z-50 relative"
    >
      <div className="w-full flex items-center justify-between pl-0 pr-0 py-3 sm:py-4">
        {/* Left: Logo + Department Name */}
        <a 
          href="https://www.iith.ac.in" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 xl:space-x-3 hover:opacity-90 transition-opacity duration-200 pl-3 sm:pl-4 lg:pl-6"
        >
          <img
            src={Logo}
            alt="IIT Hyderabad Logo"
            className="h-12 w-12 sm:h-14 sm:w-14 object-contain flex-shrink-0"
          />
          <div className="leading-tight">
            <div className="font-semibold text-sm sm:text-base xl:text-lg 2xl:text-xl">
              Department of Biotechnology
            </div>
            <div className="font-normal text-xs sm:text-sm xl:text-base 2xl:text-lg text-gray-200">
              IIT Hyderabad
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 2xl:space-x-8 pr-4 sm:pr-6">
          {navItems.map((item) => (
            <div key={item.path} className="relative group">
              <Link 
                to={item.path} 
                className={`${isActive(item.path)} text-sm xl:text-base 2xl:text-lg py-2 px-2 flex items-center cursor-pointer whitespace-nowrap`}
                onClick={(e) => handleMainLinkClick(item, e)}
              >
                {item.name}
                {item.sub && (
                  <svg 
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      activeDropdown === item.name ? "rotate-180" : ""
                    }`}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                )}
              </Link>

              {/* Desktop Dropdown */}
              {item.sub && (
                <div 
                  className={`absolute left-0 top-full mt-1 w-56 xl:w-64 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-200 transition-all duration-200 ${
                    activeDropdown === item.name
                      ? "opacity-100 visible translate-y-0" 
                      : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  <div className="py-2">
                    {item.sub.map((subItem, index) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`block px-4 py-3 text-sm xl:text-base hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150 ${
                          location.pathname === subItem.path ? "bg-indigo-100 text-indigo-700 font-medium" : ""
                        } ${index !== item.sub.length - 1 ? "border-b border-gray-100" : ""}`}
                        onClick={() => setActiveDropdown(null)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2 hover:bg-indigo-800 rounded-md transition-colors duration-200"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileOpen}
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-0.5" : ""
            }`} />
            <span className={`block w-6 h-0.5 bg-white mt-1 transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`} />
            <span className={`block w-6 h-0.5 bg-white mt-1 transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-0.5" : ""
            }`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden bg-indigo-800 shadow-xl transition-all duration-300 overflow-hidden ${
        mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="px-4 sm:px-6 py-4 space-y-1">
          {navItems.map((item) => (
            <div key={item.path}>
              <div className="flex items-center justify-between">
                <Link
                  to={item.path}
                  className={`block text-base sm:text-lg py-3 flex-1 ${isActive(item.path)}`}
                  onClick={() => !item.sub && setMobileOpen(false)}
                >
                  {item.name}
                </Link>
                {item.sub && (
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="p-2 hover:bg-indigo-700 rounded-md transition-colors duration-200"
                    aria-label={`Toggle ${item.name} submenu`}
                  >
                    <svg 
                      className={`h-5 w-5 transition-transform duration-200 ${
                        activeDropdown === item.name ? "rotate-180" : ""
                      }`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </button>
                )}
              </div>
              
              {/* Mobile Submenu */}
              {item.sub && (
                <div className={`ml-4 border-l-2 border-indigo-600 pl-4 space-y-1 transition-all duration-300 overflow-hidden ${
                  activeDropdown === item.name ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}>
                  {item.sub.map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className={`block text-sm sm:text-base py-2 ${isActive(subItem.path)} text-gray-200`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;