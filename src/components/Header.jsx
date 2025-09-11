import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "./iithlogo.png";

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <header className="flex flex-col">
       <div className="bg-[#45556C] text-white p-4 flex justify-between items-center gap-2 z-50">
     
        <a href="https://iith.ac.in" target="_blank" rel="noopener noreferrer"  className="flex-shrink-0">
          <img src={logo} alt="IIT Hyderabad Logo" className="h-10" />
        </a>

        <div className="text-xl font-bold"> Department of Biotechnology, IIT Hyderabad </div>

       <nav className="hidden md:flex items-center space-x-6 ml-auto"> 
        <Link to="/" className="hover:text-red-300"> Home</Link>

        <div className="relative">
            <button   className="hover:text-red-300"  onClick={() => toggleDropdown("academics")} > Academics ▾ </button>
            {openDropdown === "academics" &&
             (<ul className="absolute left-0 mt-2 bg-white text-gray-800 shadow-md rounded w-52">
                <li>  <Link to="/academics/programs" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenDropdown(null)} > Programs </Link> </li>
                <li> <Link to="/academics/committee" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenDropdown(null)} > Committee</Link>  </li> 
               </ul>)}
          </div>

          <div className="relative">
            <button className="hover:text-red-300"  onClick={() => toggleDropdown("research")} > Research ▾   </button>{openDropdown === "research" && (
              <ul className="absolute left-0 mt-2 bg-white text-gray-800 shadow-md rounded w-52">
                <li> <Link  to="/research/researcharea" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenDropdown(null)}>  Research Areas </Link>  </li>
                <li> <Link  to="/research/projects"  className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenDropdown(null)}>  Projects </Link> </li>
                <li> <Link  to="/research/collaborations"  className="block px-4 py-2 hover:bg-gray-100"  onClick={() => setOpenDropdown(null)} >  Collaborations</Link></li>
              </ul>
            )}
          </div>

          <div className="relative">
            <button  className="hover:text-red-300"  onClick={() => toggleDropdown("people")}>  People ▾ </button>
            {openDropdown === "people" && ( <ul className="absolute left-0 mt-2 bg-white text-gray-800 shadow-md rounded w-48">
                <li>  <Link  to="/people/faculty" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenDropdown(null)}>  Faculty</Link>  </li>
                <li>  <Link  to="/people/dacmembers" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenDropdown(null)} > DAC Members </Link> </li>
                <li>  <Link  to="/people/staff"  className="block px-4 py-2 hover:bg-gray-100"  onClick={() => setOpenDropdown(null)} >Staff</Link> </li>
                <li>  <Link to="/people/students"className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenDropdown(null)}>Students</Link></li>
                <li>  <Link to="/people/alumni"  className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenDropdown(null)}>Alumni</Link> </li> 
               </ul>
            )}
          </div>

          <Link to="/facilities" className="hover:text-red-300"> Facilities </Link>
          <Link to="/achievements" className="hover:text-red-300">Achievements</Link>
          <Link to="/announcements" className="hover:text-red-300"> Announcements</Link>
          <Link to="/contact" className="hover:text-red-300"> Contact Us</Link>
        </nav>

       <button className="md:hidden text-white text-2xl" onClick={() => setMobileOpen(!mobileOpen)}>
          ☰
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-2 space-y-2">
          <Link to="/" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/academics/programs" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>Programs</Link>
          <Link to="/academics/committee" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>Committee</Link>
          <Link to="/research/researcharea" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>Research Areas</Link>
          <Link to="/research/projects" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>Projects</Link>
          <Link to="/research/collaborations" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>Collaborations</Link>
          <Link to="/people/faculty" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>Faculty</Link>
          <Link to="/people/dacmembers" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>DAC Members</Link>
          <Link to="/people/staff" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>Staff</Link>
          <Link to="/people/students" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>Students</Link>
          <Link to="/people/alumni" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>Alumni</Link>
          <Link to="/facilities" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>Facilities</Link>
          <Link to="/achievements" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>Achievements</Link>
          <Link to="/announcements" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>Announcements</Link>
          <Link to="/contact" className="block hover:text-red-300" onClick={() => setMobileOpen(false)}>Contact Us</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
