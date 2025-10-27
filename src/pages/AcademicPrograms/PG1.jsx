import React, { useEffect, useState } from "react";
import { pgloadSyllabus } from "./PGsyllabusData";
import { ChevronDown, ChevronRight, BookOpen } from "lucide-react";

export default function PG() {
  const [syllabus, setSyllabus] = useState([]);
  const [openYear, setOpenYear] = useState(null);

  useEffect(() => {
    pgloadSyllabus().then((data) => setSyllabus(data));
  }, []);

  const toggleYear = (year) => {
    setOpenYear(openYear === year ? null : year);
  };

  // Group semesters into years (4 semesters → 2 years)
  const yearWise = {
    "First Year": syllabus.filter(
      (sem) => sem.semester === "Semester 1" || sem.semester === "Semester 2"
    ),
    "Second Year": syllabus.filter(
      (sem) => sem.semester === "Semester 3" || sem.semester === "Semester 4"
    ),
  };

  return (
    <section className="container mx-auto px-6 py-16">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg rounded-2xl p-8 border border-indigo-100 mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          M.Tech (Medical Biotechnology)
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          <strong>Course Objectives:</strong> This program nurtures a fundamental
          understanding of biological processes and their medical applications,
          provides hands-on training with cutting-edge technologies, and develops
          strong skills in scientific writing, presentation, and communication.
          Graduates will be prepared to excel in academia and industry.
        </p>

        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            <strong>Duration:</strong> 2 years (4 semesters)
          </li>
          <li>
            <strong>Eligibility (GATE route):</strong> B.Tech/B.E./M.Sc. in life
            sciences/M.Pharm with valid GATE score (BT/XL). IIT B.Tech with CGPA ≥ 8
            may apply without GATE.
          </li>
          <li>
            <strong>Eligibility (Self-sponsored):</strong> B.Tech/B.E./M.Sc. in life
            sciences/M.Pharm with CGPA ≥ 7 (GATE not required).
          </li>
          <li>
            <strong>Admission Procedure:</strong> GATE through COAP, or online
            interviews for self-sponsored candidates.
          </li>
          <li>
            <strong>Features:</strong> 26 credits coursework (first year), 24
            credits thesis (second year), stipend for MoE students, exposure to
            research communication and presentations.
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-10">
        <button
          onClick={() =>
            document.getElementById("syllabus-section").scrollIntoView({
              behavior: "smooth",
            })
          }
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          📘 View Syllabus
        </button>

        {/* Replace below links if applicable or remove */}
        <a
          href="/pdf/pg_timetable.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          📅 Time Table
        </a>
        <a
          href="/pdf/pg_course_description.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
        >
          📄 Course Description
        </a>
        <a
          href="/academics/Academic_Handbook_62nd_Senate.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
        >
          📘 Academic Handbook
        </a>
        
      </div>

      {/* Year-wise syllabus */}
      <div id="syllabus-section" className="space-y-8">
        {Object.entries(yearWise).map(([year, semesters], yIdx) => (
          <div
            key={yIdx}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
          >
            {/* Year Header */}
            <button
              onClick={() => toggleYear(year)}
              className="w-full flex justify-between items-center text-left text-2xl font-semibold text-indigo-700 hover:text-indigo-900"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                {year}
              </span>
              {openYear === year ? (
                <ChevronDown className="w-6 h-6 text-gray-600" />
              ) : (
                <ChevronRight className="w-6 h-6 text-gray-600" />
              )}
            </button>

            {/* Year Content */}
            {openYear === year && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {semesters.map((sem, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 shadow rounded-lg border border-gray-200"
                  >
                    <h4 className="px-6 py-3 text-lg font-medium text-gray-800 border-b border-gray-200 bg-indigo-50">
                      {sem.semester}
                    </h4>
                    <div className="px-6 pb-6">
                      <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 text-sm">
                          <thead className="bg-indigo-100">
                            <tr>
                              {Object.keys(sem.data[0] || {}).map((key) => (
                                <th
                                  key={key}
                                  className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-700"
                                >
                                  {key}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {sem.data.map((row, rIdx) => (
                              <tr
                                key={rIdx}
                                className="hover:bg-indigo-50 transition"
                              >
                                {Object.values(row).map((value, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className="border border-gray-300 px-3 py-2"
                                  >
                                    {value}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
