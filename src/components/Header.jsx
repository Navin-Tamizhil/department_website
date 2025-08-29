import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logo from "./iithlogo.png";

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const Navbar = () => {
    const [openDropdown, setOpenDropdown] =useState(null);
    const dropdownRef = useRef(null);
  }

  return (
    <header className="flex flex-col">
      <div className="bg-[#45556C] text-white p-4 flex justify-between items-center  gap-2 z-50">
        <a href="https://iith.ac.in" target="_blank" rel="noopener noreferrer"   className="flex-shrink-0">
          <img src={logo} alt="IIT Hyderabad Logo" className="h-10" />
        </a>
        <div className="text-xl font-bold">
          Department of Biotechnology, IIT Hyderabad
        </div>
        <nav className="flex items-center space-x-6 ml-auto">
          <Link to="/" className="hover:text-red-300">Home</Link>

          <div className="relative">
            <button className="hover:text-red-300" onClick={() => toggleDropdown("programs")}>Academics ▾</button>
            {openDropdown === "programs" && (
              <ul className="absolute left-0 mt-2 bg-white text-gray-800 shadow-md rounded w-52">
                <li><Link to="/academic-programs/programs" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenDropdown(null)}>Programs</Link></li>
                <li><Link to="/academic-programs/details" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenDropdown(null)}>Committee</Link></li>
                
              </ul>
            )}
          </div>
          <Link to="/research" className="hover:text-red-300">Research</Link>
          <div className="relative">
            <button className="hover:text-red-300" onClick={() => toggleDropdown("people")}>People ▾</button>
            {openDropdown === "people" && (
              <ul className="absolute left-0 mt-2 bg-white text-gray-800 shadow-md rounded w-48">
                <li><Link to="/people/faculty" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenDropdown(null)}>Faculty</Link></li>
                <li><Link to="/people/dacmembers" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenDropdown(null)}>DAC Members</Link></li>
                <li><Link to="/people/staff" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenDropdown(null)}>Staff</Link></li>
                <li><Link to="/people/students" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenDropdown(null)}>Students</Link></li>
                <li><Link to="/people/alumni" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenDropdown(null)}>Alumni</Link></li>
              </ul>
            )}
          </div>
          <Link to="/facilities" className="hover:text-red-300">Facilities</Link>
          <Link to="/newsletter" className="hover:text-red-300">Newsletter</Link>
          <Link to="/contact" className="hover:text-red-300">Contact Us</Link>
        </nav>
        <button className="md:hidden text-indigo-800" onClick={() => setMobileOpen(!mobileOpen)}>☰</button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-2 space-y-2">
          <Link to="/" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/about" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>About Us</Link>
          <Link to="/academic-programs/ug" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>UG Programs</Link>
          <Link to="/academic-programs/pg" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>PG Programs</Link>
          <Link to="/academic-programs/phd" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>Ph.D. Programs</Link>
          <Link to="/research" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>Research</Link>
          <Link to="/people/faculty" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>Faculty</Link>
          <Link to="/people/dacmembers" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>DAC Members</Link>
          <Link to="/people/staff" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>Staff</Link>
          <Link to="/people/students" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>Students</Link>
          <Link to="/people/alumni" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>Alumni</Link>
          <Link to="/facilities" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>Facilities</Link>
          <Link to="/newsletter" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>Newsletter</Link>
          <Link to="/contact" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>Contact Us</Link>
        </div>
      )}
    </header>
  );
};

export default Header;



