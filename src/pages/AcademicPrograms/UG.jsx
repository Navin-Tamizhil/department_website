import React, { useEffect, useState } from "react";
import { ugloadSyllabus } from "./UGsyllabusData";

export default function UG() {
  const [syllabus, setSyllabus] = useState([]);

  useEffect(() => {
    ugloadSyllabus().then((data) => setSyllabus(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Undergraduate (UG) Program:s B.Tech (Bioinformatics and Biotechnology) </h2>
      <p> Course Objectives: Develop a foundation for Biotechnology and Bioinformatics in young minds and inculcate
           interest by showing real-life challenges that can be addressed by biotechnology and bioinformatics. It is the first
           course among all the IITs that places equal emphasis on both experimental and computational aspects of
           biological sciences.
      </p>
      <p> Duration: 4 years (8 semesters) | Eligibility Criteria: Based on JEE | Admission procedure: through JEE advanced
      </p>
      <p> Features: 57 credits of core courses, 36 credits of elective courses, 5 credits of soft skill courses, 20 credits of
         practical, and 6 credits of internship/departmental projects
      </p>


      <div className="flex gap-4 mb-8">
        <button onClick={() => document.getElementById("syllabus-section").scrollIntoView({ behavior: "smooth", })} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          📘 Syllabus
        </button>

        <a  href="/pdf/ug_timetable.pdf"  target="_blank"  rel="noopener noreferrer" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          📅 Time Table
        </a>

        <a   href="/pdf/ug_course_description.pdf"  target="_blank"   rel="noopener noreferrer"   className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700" >
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
