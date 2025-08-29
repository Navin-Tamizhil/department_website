import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Programs from "./pages/AcademicPrograms/AcademicPrograms";
import  Details from "./pages/AcademicPrograms/Details.jsx";
import Research from "./pages/Research/Research";
import PeopleLayout from "./pages/People/PeopleLayout";
import Faculty from "./pages/People/Faculty";
import DACMembers from "./pages/People/DACMembers";
import Staff from "./pages/People/Staff";
import Students from "./pages/People/Students";
import Alumni from "./pages/People/Alumni";
import Facilities from "./pages/Facilities";
import Newsletter from "./pages/Newsletter";
import Contact from "./pages/Contact";

function App() {
  return (
    
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academic-programs" element={<Programs />}>
           <Route index element={<p className="text-gray-600">Please select a section above.</p>} />
            <Route path="programs" element={<Programs />} />  
            <Route path="details" element={<Details />} />
          </Route>
          <Route path="/research" element={<Research />} />
          <Route path="/people" element={<PeopleLayout />}>
            <Route index element={<p className="text-gray-600">Select a category above.</p>} />
            <Route path="faculty" element={<Faculty />} />
            <Route path="dacmembers" element={<DACMembers />} />
            <Route path="staff" element={<Staff />} />
            <Route path="students" element={<Students />} />
            <Route path="alumni" element={<Alumni />} />
          </Route>
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
