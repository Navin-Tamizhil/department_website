import React, { useEffect, useState } from "react";
import { ugloadSyllabus } from "./UGsyllabusData1c";
import CourseDescription from "./UG_CourseDescription1c";
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  Calendar,
  FileText,
  Clock,
  Users,
} from "lucide-react";

export default function UG() {
  const [syllabus, setSyllabus] = useState([]);
  const [openYear, setOpenYear] = useState(null);
  const [activeView, setActiveView] = useState(null); // null or 'syllabus' | 'timetable' | 'courses'

  useEffect(() => {
    ugloadSyllabus().then((data) => setSyllabus(data));
  }, []);

  const toggleYear = (year) => {
    setOpenYear(openYear === year ? null : year);
  };

  const yearWise = {
    "First Year": syllabus.filter(
      (sem) => sem && (sem.semester === "Semester 1" || sem.semester === "Semester 2")
    ),
    "Second Year": syllabus.filter(
      (sem) => sem && (sem.semester === "Semester 3" || sem.semester === "Semester 4")
    ),
    "Third Year": syllabus.filter(
      (sem) => sem && (sem.semester === "Semester 5" || sem.semester === "Semester 6")
    ),
    "Fourth Year": syllabus.filter(
      (sem) => sem && (sem.semester === "Semester 7" || sem.semester === "Semester 8")
    ),
    "Department Elective": syllabus.filter(
      (sem) => sem && sem.semester?.toLowerCase().includes("department elective")
    ),
  };

  const buttons = [
    { key: "syllabus", label: "Syllabus", icon: BookOpen },
    { key: "timetable", label: "Time Table", icon: Calendar },
    { key: "courses", label: "Course Descriptions", icon: FileText },
  ];

  const handleButtonClick = (key) => {
    if (key === "timetable") {
      window.open("/academics/TT_UG_July.pdf", "_blank");
      setActiveView(null);
    } else if (key === activeView) {
      setActiveView(null);
    } else {
      setActiveView(key);
    }
  };

  return (
    <div className="p-8">
      {/* Overview Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-indigo-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            B.Tech (Bioinformatics and Biotechnology)
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Develop a foundation for Biotechnology and Bioinformatics in young
            minds and inculcate interest by showing real-life challenges that
            can be addressed by biotechnology and bioinformatics. First course
            among all IITs with equal emphasis on experimental and computational
            aspects.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                <span className="font-semibold">Duration:</span> 4 years (8 semesters)
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <span className="font-semibold">Eligibility:</span> JEE Advanced
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600 mt-0.5" />
                <div>
                  <span className="font-semibold">Credits:</span>
                  <span className="text-sm text-gray-600 ml-2">
                    57 core + 36 electives + 5 soft skills + 20 practicals + 6 projects
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        {buttons.map((btn) => {
          const Icon = btn.icon;
          const isActive = activeView === btn.key;
          return (
            <button
              key={btn.key}
              onClick={() => handleButtonClick(btn.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg shadow-md transition-colors
                ${
                  isActive
                    ? "bg-indigo-700 text-white"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
            >
              <Icon className="w-5 h-5" />
              {btn.label}
            </button>
          );
        })}
      </div>

      {/* Syllabus Section */}
      {activeView === "syllabus" && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Curriculum Structure
          </h3>

          {Object.entries(yearWise).map(([year, semesters], yIdx) => {
            if (!semesters || semesters.length === 0) return null;

            return (
              <div
                key={yIdx}
                className="bg-white rounded-xl shadow-lg border border-gray-200 mb-6"
              >
                <button
                  onClick={() => toggleYear(year)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-indigo-600" />
                    <span className="text-xl font-semibold text-gray-800">{year}</span>
                  </div>
                  {openYear === year ? (
                    <ChevronDown className="w-6 h-6 text-gray-600" />
                  ) : (
                    <ChevronRight className="w-6 h-6 text-gray-600" />
                  )}
                </button>

                {openYear === year && (
                  <div className="px-6 pb-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {semesters.map((sem, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div className="bg-indigo-50 px-4 py-3 rounded-t-lg border-b border-gray-200">
                            <h4 className="font-semibold text-gray-800">
                              {sem.semester}
                            </h4>
                          </div>
                          <div className="p-4">
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="bg-gray-100">
                                    {Object.keys(sem.data?.[0] || {}).map((key) => (
                                      <th
                                        key={key}
                                        className="px-3 py-2 text-left font-medium text-gray-700 border border-gray-200"
                                      >
                                        {key}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {sem.data?.map((row, rIdx) => (
                                    <tr key={rIdx} className="hover:bg-gray-50">
                                      {Object.values(row).map((value, cIdx) => (
                                        <td
                                          key={cIdx}
                                          className="px-3 py-2 border border-gray-200"
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
                  </div>
                )}
              </div>
            );
          })}

          {/* Separate Credit Summary, outside the years map */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              Total Number of Credits: 127
            </h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                <strong>Core/Elective:</strong> 76 (59%)
              </li>
              <li>
                <strong>Basic science:</strong> 13 (10%)
              </li>
              <li>
                <strong>Basic engineering:</strong> 14 (11%)
              </li>
              <li>
                <strong>LA/Creative arts:</strong> 11 (8%)
              </li>
              <li>
                <strong>Free electives:</strong> 13 (10%)
              </li>
            </ul>
            <p className="text-sm text-gray-500 mt-2 italic">
              * 1-credit mandatory course
            </p>
          </div>
        </div>
      )}

      {/* Course Description Modal */}
      {activeView === "courses" && (
        <CourseDescription close={() => setActiveView(null)} />
      )}
    </div>
  );
}
