import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home/Home1";

// Academics
import Academics from "./pages/AcademicPrograms/Academics1.jsx";
import Programs from "./pages/AcademicPrograms/Programs1c.jsx";
import Committee from "./pages/AcademicPrograms/Committee.jsx";

// Research
import Research from "./pages/Research/Research";
import ResearchAreas from "./pages/Research/ResearchAreas3.jsx";
import Projects from "./pages/Research/Projects1.jsx";
import Collaborations from "./pages/Research/Collaborations.jsx";

// People
import PeopleLayout from "./pages/People/PeopleLayout";
import Faculty from "./pages/People/Faculty1";
import DACMembers from "./pages/People/DACMembers";
import Staff from "./pages/People/Staff";
import Students from "./pages/People/Students";
import Alumni from "./pages/People/Alumni";

// Facilities
import Facilities from "./pages/Facilities/Facilities.jsx";

// Achievements
import Achievements from "./pages/Achievements/Achievements.jsx";

// Announcements & Events
import Announcements from "./pages/Announcements/Announcements.jsx";
import Events from "./pages/Events/Events.jsx";

// Contact
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Academics with subpages */}
          <Route path="/academics" element={<Academics />}>
            <Route index element={<Programs />} />
            <Route path="programs" element={<Programs />} />
            <Route path="committee" element={<Committee />} />
          </Route>

          {/* Research with subpages */}
          <Route path="/research" element={<Research />}>
            <Route index element={<ResearchAreas />} />
            <Route path="researcharea" element={<ResearchAreas />} />
            <Route path="projects" element={<Projects />} />
            <Route path="collaborations" element={<Collaborations />} />
          </Route>

          {/* People with subpages */}
          <Route path="/people" element={<PeopleLayout />}>
            <Route index element={<Faculty />} />
            <Route path="faculty" element={<Faculty />} />
            <Route path="dacmembers" element={<DACMembers />} />
            <Route path="staff" element={<Staff />} />
            <Route path="students" element={<Students />} />
            <Route path="alumni" element={<Alumni />} />
          </Route>

          {/* Single pages */}
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
