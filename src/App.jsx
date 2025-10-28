// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home/Home1";

// Academics
import Academics from "./pages/AcademicPrograms/Academics1.jsx";
import Programs from "./pages/AcademicPrograms/Programs1c.jsx";
import Committee from "./pages/AcademicPrograms/Committee.jsx";
import Admissions from "./pages/AcademicPrograms/Admissions.jsx";

// Research
import Research from "./pages/Research/Research";
import ResearchAreas from "./pages/Research/ResearchAreas3.jsx";
import Projects from "./pages/Research/Projects.jsx";
import Collaborations from "./pages/Research/Collaborations.jsx";

// People
import PeopleLayout from "./pages/People/PeopleLayout";
import Faculty from "./pages/People/Faculty2";
import DACMembers from "./pages/People/DACMembers";
import Staff from "./pages/People/Staff";
import Students from "./pages/People/Students/Students";
import BTechStudents from "./pages/People/Students/BTechStudents";
import MTechStudents from "./pages/People/Students/MTechStudents";
import PhDStudents from "./pages/People/Students/PhDStudents";
import Stats from "./pages/People/Students/Stats";
import Alumni from "./pages/People/Alumni";

// Other Pages
import Facilities from "./pages/Facilities/Facilities.jsx";
import Achievements from "./pages/Achievements/Achievements.jsx";
import Events from "./pages/Events/Events.jsx";
import BiotechSociety from "./pages/Biotechsociety/BiotechSociety.jsx";

import Contact from "./pages/Contact";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollToTop />
      <main className="flex-grow mt-2">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Academics */}
          <Route path="/academics" element={<Academics />}>
            <Route index element={<Programs />} />
            <Route path="programs" element={<Programs />} />
            <Route path="committee" element={<Committee />} />
            <Route path="admissions" element={<Admissions />} />
          </Route>

          {/* Research */}
          <Route path="/research" element={<Research />}>
            <Route index element={<ResearchAreas />} />
            <Route path="researcharea" element={<ResearchAreas />} />
            <Route path="projects" element={<Projects />} />
            <Route path="collaborations" element={<Collaborations />} />
          </Route>

          {/* People */}
          <Route path="/people" element={<PeopleLayout />}>
            <Route index element={<Faculty />} />
            <Route path="faculty" element={<Faculty />} />
            <Route path="dacmembers" element={<DACMembers />} />
            <Route path="staff" element={<Staff />} />
               <Route path="students" element={<Students />}>
                        <Route index element={<BTechStudents />} />
                        <Route path="btech" element={<BTechStudents />} />
                        <Route path="mtech" element={<MTechStudents />} />
                        <Route path="phd" element={<PhDStudents />} />
                        <Route path="stats" element={<Stats />} />
                      </Route>
            <Route path="alumni" element={<Alumni />} />
          </Route>

          {/* Others */}
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/events" element={<Events />} />
           <Route path="/biotechsociety" element={<BiotechSociety />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
