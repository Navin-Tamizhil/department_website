// src/components/Header.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./iithlogo.png";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/" ? "text-yellow-300 border-b-2 border-yellow-300 font-semibold" : "hover:text-yellow-200 font-normal";
    }
    return location.pathname.startsWith(path) ? "text-yellow-300 border-b-2 border-yellow-300 font-semibold" : "hover:text-yellow-200 font-normal";
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

  return (
    <header className="bg-indigo-900 text-white shadow-md w-full fixed top-0 z-50">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-6 py-4">

        {/* Left: Logo + Dept Name */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <img src={Logo} alt="IIT Hyderabad Logo" className="h-14 w-14 object-contain" />
          <div className="leading-tight text-lg">
            <span className="font-semibold text-xl block">Deptartment of Biotechnology</span>
            <span className="text-base font-normal block">IIT Hyderabad</span>
          </div>
        </div>

        {/* Desktop Nav (align right) */}
        <nav className="hidden md:flex flex-1 justify-end space-x-10 text-lg font-normal">
          {navItems.map((item) => (
            <div key={item.path} className="relative group">
              <Link to={item.path} className={isActive(item.path)}>
                {item.name}
              </Link>

              {item.sub && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white text-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-50">
                  {item.sub.map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className={`block px-4 py-2 hover:bg-indigo-100 ${isActive(subItem.path)}`}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-3xl ml-auto"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-indigo-800 shadow-md px-6 py-4 space-y-3 animate-slideDown">
          {navItems.map((item) => (
            <div key={item.path}>
              <Link
                to={item.path}
                className={`block text-lg ${isActive(item.path)}`}
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>

              {item.sub &&
                item.sub.map((subItem) => (
                  <Link
                    key={subItem.path}
                    to={subItem.path}
                    className={`block ml-5 text-base ${isActive(subItem.path)}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {subItem.name}
                  </Link>
                ))}
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
