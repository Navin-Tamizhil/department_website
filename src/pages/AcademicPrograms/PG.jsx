import React, { useEffect, useState } from "react";
import { pgloadSyllabus } from "./PGsyllabusData";
export default function PG() {

  export default function PG() {
  const [syllabus, setSyllabus] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  // Load syllabus data from Excel when component mounts
  useEffect(() => {
    pgloadSyllabus().then((data) => setSyllabus(data));
  }, []);

  const toggleSemester = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">M.Tech (Medical Biotechnology) (admission through GATE or self-sponsored) </h2>
      <p>  Course Objectives: Inculcate interest in the subject by nurturing a fundamental understanding of biological
           processes/phenomena and their medical applications, hands-on training with cutting-edge technologies, and
           effective science writing, presentation, and communication skills. This program makes the students ready to excel
           in academia/industry    </p>
      <p> Duration: 2 years (4 semesters)  </p>
      <p> Eligibility Criteria: (through GATE) B.Tech/B.E./M.Sc. in any area of life sciences/M.Pharm, with a valid GATE score
         (in BT or XL). IIT B.Tech graduates with a CGPA of 8 or above without a GATE score are eligible to apply. (self
          sponsored) B.B.Tech/B.E./M.Sc. in any area of life sciences/M.Pharm with a CGPA of 7 and above (GATE score not required).  </p>
      <p> Admission procedure: (through GATE) based on GATE score through COAP, (self-sponsored) Online interviews.  </p>
      <p>  Features: 26 credits of coursework (first two semesters), 24 credits of research thesis (last two semesters),
 exposure to scientific writing, presentation, and communication, a stipend of Rs. 12,500 per month for MoE students.  </p>
      <div className="flex gap-4 mb-8">
        <button onClick={() => document.getElementById("syllabus-section").scrollIntoView({ behavior: "smooth", })} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          📘 Syllabus
        </button>

        <a  href="/pdf/pg_timetable.pdf"  target="_blank"  rel="noopener noreferrer" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          📅 Time Table
        </a>

        <a   href="/pdf/pg_course_description.pdf"  target="_blank"   rel="noopener noreferrer"   className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700" >
          📄 Course Description
        </a>
      </div>


      <div id="syllabus-section" className="space-y-10">
        {syllabus.map((sem, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">  {sem.semester} </h3>
            <div className="overflow-x-auto">  <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>  {Object.keys(sem.data[0] || {}).map((key) => ( <th  key={key}  className="border border-gray-300 px-3 py-2 text-left font-medium" > {key}</th> ))}
                  </tr>
                </thead>
                <tbody>  {sem.data.map((row, rIdx) => (<tr key={rIdx} className="hover:bg-gray-50"> {Object.values(row).map((value, cIdx) => (
                        <td  key={cIdx} className="border border-gray-300 px-3 py-2">  {value}</td>))} </tr>))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    
    </div>
  );
}