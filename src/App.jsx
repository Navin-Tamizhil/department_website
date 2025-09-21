import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home1";
import Academics  from "./pages/AcademicPrograms/Academics1.jsx";
import Programs from "./pages/AcademicPrograms/Programs1c.jsx";
import Committee from "./pages/AcademicPrograms/Committee.jsx";
import Research from "./pages/Research/Research";
import ResearchAreas from "./pages/Research/ResearchAreas3.jsx";
import Projects from "./pages/Research/Projects1.jsx";
import Collaborations from "./pages/Research/Collaborations.jsx";
import PeopleLayout from "./pages/People/PeopleLayout";
import Faculty from "./pages/People/Faculty1";
import DACMembers from "./pages/People/DACMembers";
import Staff from "./pages/People/Staff";
import Students from "./pages/People/Students";
import Alumni from "./pages/People/Alumni";
import Facilities from "./pages/Facilities/Facilities.jsx";
import Achievements from "./pages/Achievements/Achievements.jsx";
import Announcements from "./pages/Announcements/Announcements.jsx"
import Contact from "./pages/Contact";
import Events from "./pages/Events/Events.jsx";

function App() {
  return (
    
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
     
          <Route path="/academics" element={<Academics />}>
           <Route index element={<p className="text-gray-600">Please select a section above.</p>} />
            <Route path="programs" element={<Programs />} />  
            <Route path="committee" element={<Committee />} />
          </Route>
           <Route path="/research" element={<Research />}>
           <Route index element={<p className="text-gray-600">Please select a section above.</p>} />
            <Route path="researcharea" element={<ResearchAreas />} />  
            <Route path="projects" element={<Projects />} />
            <Route path="collaborations" element={<Collaborations />} />
          </Route>

          <Route path="/people" element={<PeopleLayout />}>
            <Route index element={<p className="text-gray-600">Select a category above.</p>} />
            <Route path="faculty" element={<Faculty />} />
            <Route path="dacmembers" element={<DACMembers />} />
            <Route path="staff" element={<Staff />} />
            <Route path="students" element={<Students />} />
            <Route path="alumni" element={<Alumni />} />
          </Route>
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
