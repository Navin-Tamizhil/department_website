import React, { useEffect, useState } from "react";
import { ugloadSyllabus } from "./UGsyllabusData";
import CourseDescription from "./UG_CourseDescription1"; // your course description component
import { ChevronDown, ChevronRight, BookOpen } from "lucide-react";

export default function UG() {
  const [syllabus, setSyllabus] = useState([]);
  const [openYear, setOpenYear] = useState(null);
  const [showCourseDescription, setShowCourseDescription] = useState(false);

  useEffect(() => {
    ugloadSyllabus().then((data) => setSyllabus(data));
  }, []);

  const toggleYear = (year) => {
    setOpenYear(openYear === year ? null : year);
  };

  // Group semesters into years (8 semesters → 4 years)
  const yearWise = {
    "First Year": syllabus.filter(
      (sem) => sem.semester === "Semester 1" || sem.semester === "Semester 2"
    ),
    "Second Year": syllabus.filter(
      (sem) => sem.semester === "Semester 3" || sem.semester === "Semester 4"
    ),
    "Third Year": syllabus.filter(
      (sem) => sem.semester === "Semester 5" || sem.semester === "Semester 6"
    ),
    "Fourth Year": syllabus.filter(
      (sem) => sem.semester === "Semester 7" || sem.semester === "Semester 8"
    ),
  };

  return (
    <section className="container mx-auto px-6 py-16">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg rounded-2xl p-8 border border-indigo-100 mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Undergraduate (UG) Program: B.Tech (Bioinformatics and Biotechnology)
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          <strong>Course Objectives:</strong> Develop a foundation for
          Biotechnology and Bioinformatics in young minds and inculcate interest
          by showing real-life challenges that can be addressed by biotechnology
          and bioinformatics. It is the first course among all the IITs that
          places equal emphasis on both experimental and computational aspects
          of biological sciences.
        </p>

        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            <strong>Duration:</strong> 4 years (8 semesters)
          </li>
          <li>
            <strong>Eligibility Criteria:</strong> Based on JEE
          </li>
          <li>
            <strong>Admission Procedure:</strong> Through JEE Advanced
          </li>
          <li>
            <strong>Features:</strong> 57 credits of core courses, 36 credits of
            electives, 5 credits of soft skills, 20 credits of practicals, and 6
            credits of internship/departmental projects
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

        <a
          href="/pdf/ug_timetable.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          📅 Time Table
        </a>

        <button
          onClick={() => setShowCourseDescription(true)}
          className="px-5 py-2.5 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
        >
          📄 Course Description
        </button>
        <a
          href="/academics/Academic_Handbook_62nd_Senate.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition"
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

      {/* Course Description Modal */}
      {showCourseDescription && (
        <CourseDescription
          close={() => setShowCourseDescription(false)}
        />
      )}
    </section>
  );
}
