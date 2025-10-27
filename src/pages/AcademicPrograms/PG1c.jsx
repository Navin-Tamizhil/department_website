// src/pages/AcademicPrograms/PG.jsx
import React, { useState, useEffect } from "react";
import PGCourseDescription from "./PG_CourseDescription1c";
import { pgloadSyllabus } from "./PGsyllabusData";
import { BookOpen, Calendar, FileText, Clock, Users, Award, ChevronDown, ChevronRight, UserPlus } from "lucide-react";

export default function PG() {
  const [syllabus, setSyllabus] = useState([]);
  const [openYear, setOpenYear] = useState(null);
  const [activeView, setActiveView] = useState("overview"); // 'overview' | 'syllabus' | 'courses' | 'timetable'

  useEffect(() => {
    pgloadSyllabus().then((data) => setSyllabus(data));
  }, []);

  const toggleYear = (year) => {
    setOpenYear(openYear === year ? null : year);
  };

  const buttons = [
    { key: "syllabus", label: "Syllabus", icon: BookOpen },
    { key: "courses", label: "Course Descriptions", icon: FileText },
    { key: "timetable", label: "Time Table", icon: Calendar }
    ];

  const handleButtonClick = (key) => {
    if (key === "timetable") {
      window.open("https://www.iith.ac.in/academics/assets/files/timetables/jul-nov-25/BT-PG-Time-Table-July-Nov%202025.xlsx", "_blank");
      setActiveView(null);
    } else if (key === activeView) {
      setActiveView("overview");
    } else {
      setActiveView(key);
    }
  };

  const yearWise = {
    "First Year": syllabus.filter(
      (sem) =>
        sem.semester === "Semester 1" ||
        sem.semester === "Semester 2" ||
        (sem.semester.includes("Semester 1") && sem.semester.includes("Elective")) ||
        (sem.semester.includes("Semester 2") && sem.semester.includes("Elective"))
    ),
    "Second Year": syllabus.filter((sem) => sem.semester === "Semester 3" || sem.semester === "Semester 4"),
  };

  // Credit Note to display once after entire syllabus section
  const creditNote = (
    <p className="mt-6 text-sm text-gray-600 italic">
      <strong>Total Number of Credits:</strong> 50* + 1 (+1 is CI101 (Clean India) course of 1 credit which is mandatory)
      <br />
      SS: soft skill &nbsp;&nbsp; LA: Liberal arts
      <br />
      DC: Departmental core &nbsp;&nbsp; DE: Departmental elective
      <br />
      * Total credits should not exceed 55
    </p>
  );

  return (
    <div className="p-8">
      {/* Overview Section */}
      {activeView === "overview" && (
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-emerald-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">M.Tech (Medical Biotechnology)</h2>
            <p className="text-gray-700 text-justify leading-relaxed mb-6">
              Advanced degree program cultivating a profound understanding of biological processes and their medical applications,
              fostering genuine interest in medical biotechnology. Students receive hands-on training with state-of-the-art technologies,
              engage in innovative research, and develop strong scientific communication skills. The program prepares graduates to  excel in 
              both academia and industry by equipping them with the knowledge, practical expertise, and professional abilities essential for success. 
              
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold">Duration:</span> 2 years (4 semesters)
                </div>
                <div className="flex items-start gap-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <div>
                    <span className="font-semibold">Eligibility:</span>
                    <ul className="list-disc pl-5 mt-1 text-sm text-gray-600 space-y-1">
                      <li><b>Through GATE:</b> B.Tech/B.E./M.Sc. in any area of life sciences/M.Pharm, with a valid GATE score (in BT or XL). IIT B.Tech graduates with a CGPA of 8 or above are also eligible without a GATE score.</li>
                      <li><b>Self-sponsored:</b> B.Tech/B.E./M.Sc. in any area of life sciences/M.Pharm with a CGPA of 7 and above (GATE score not required).</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <UserPlus className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <span className="font-semibold">Admission procedure:</span>
                    <span className="text-sm text-gray-600 ml-2">
                    (through GATE) based on GATE score through COAP, (self-sponsored) Online interviews
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <span className="font-semibold">Features:</span>
                    <span className="text-sm text-gray-600 ml-2">
                      Research-oriented curriculum, Industry exposure, Thesis work, Core + Electives
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        {buttons.map((btn) => {
          const Icon = btn.icon;
          const isActive = activeView === btn.key;
          return (
            <button
              key={btn.key}
              onClick={() => handleButtonClick(btn.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg shadow-md transition-colors ${
                isActive ? "bg-emerald-700 text-white" : "bg-emerald-600 text-white hover:bg-emerald-700"
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
        <>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">M.Tech Curriculum Structure</h3>
            {Object.entries(yearWise).map(([year, semesters], yIdx) => (
              <div key={yIdx} className="bg-white rounded-xl shadow-lg border border-gray-200">
                <button
                  onClick={() => toggleYear(year)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-xl font-semibold text-gray-800">{year}</span>
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
                        <div key={idx} className="bg-gray-50 rounded-lg border border-gray-200">
                          <div className="bg-emerald-50 px-4 py-3 rounded-t-lg border-b border-gray-200">
                            <h4 className="font-semibold text-gray-800">{sem.semester}</h4>
                          </div>
                          <div className="p-4 overflow-x-auto">
                            <table className="w-full text-sm border-collapse">
                              <thead>
                                <tr className="bg-gray-100">
                                  {Object.keys(sem.data[0] || {}).map((key) => (
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
                                {sem.data.map((row, rIdx) => (
                                  <tr key={rIdx} className="hover:bg-gray-50">
                                    {Object.values(row).map((value, cIdx) => (
                                      <td key={cIdx} className="px-3 py-2 border border-gray-200">
                                        {value}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Credit Note outside and after the entire syllabus section */}
          {creditNote}
        </>
      )}

      {/* Course Description Modal */}
      {activeView === "courses" && <PGCourseDescription close={() => setActiveView("overview")} />}
    </div>
  );
}
