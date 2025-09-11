import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import Academics  from "./pages/AcademicPrograms/Academics.jsx";
import Programs from "./pages/AcademicPrograms/Programs.jsx";
import Committee from "./pages/AcademicPrograms/Committee.jsx";
import Research from "./pages/Research/Research";
import ResearchAreas from "./pages/Research/ResearchAreas1.jsx";
import Projects from "./pages/Research/Projects.jsx";
import Collabration from "./pages/Research/Collaborations.jsx";
import PeopleLayout from "./pages/People/PeopleLayout";
import Faculty from "./pages/People/Faculty";
import DACMembers from "./pages/People/DACMembers";
import Staff from "./pages/People/Staff";
import Students from "./pages/People/Students";
import Alumni from "./pages/People/Alumni";
import Facilities from "./pages/Facilities/Facilities.jsx";
import Achievements from "./pages/Achievements/Achievements.jsx";
import Announcements from "./pages/Announcements/Announcements.jsx"
import Contact from "./pages/Contact";

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
            <Route path="collabration" element={<Collabration />} />
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
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
