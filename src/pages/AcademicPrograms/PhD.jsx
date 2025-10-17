// src/pages/AcademicPrograms/PhD.jsx
import { useState, useEffect } from "react";
import { pgloadSyllabus } from "./PGsyllabusData";
import PGCourseDescription from "./PG_CourseDescription1c";
import { BookOpen, FileText, ChevronDown, ChevronRight } from "lucide-react";

export default function PhD() {
  const [syllabus, setSyllabus] = useState([]);
  const [openYear, setOpenYear] = useState(null);
  const [activeView, setActiveView] = useState("overview"); // 'overview' | 'syllabus' | 'courses'

  useEffect(() => {
    // Using PG syllabus data as a placeholder as requested
    pgloadSyllabus().then((data) => setSyllabus(data));
  }, []);

  const toggleYear = (year) => {
    setOpenYear(openYear === year ? null : year);
  };

  const handleButtonClick = (key) => {
    setActiveView(activeView === key ? "overview" : key);
  };

  // PhD coursework is typically in the first year. We'll use the first year of PG data.
  const yearWise = {
    "Coursework": syllabus.filter(
      (sem) => sem.semester === "Semester 1" || sem.semester === "Semester 2"
    ),
  };

  return (
    <div className="p-8">
      <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-100 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Ph.D (Biotechnology)</h2>
        
        <p className="text-gray-700 leading-relaxed mb-8">
          Research-intensive Ph.D program developing future leaders in biotechnology through independent 
          thinking, interdisciplinary research, and cutting-edge technologies to address complex biological problems.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-700 mb-2">Duration</h3>
              <p className="text-gray-700">5 years</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-purple-700 mb-2">Eligibility</h3>
              <p className="text-gray-700">
                B.Tech/B.E./M.Tech/M.Sc./M.E. in life sciences, M.Pharm, MBBS, MD/MS with 
                valid national qualification (CSIR-JRF, UGC-JRF, DBT-JRF, DST-INSPIRE, GATE)
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-purple-700 mb-2">Admission</h3>
              <p className="text-gray-700">
                Interview-based selection, conducted twice yearly (June and December)
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-purple-700 mb-3">Program Features</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                12–24 credits of coursework
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                Patent filing opportunities
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                Conference presentations
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                Joint Doctoral Programs (JDPs) with renowned foregin universities
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                Interdisciplinary research programs
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => handleButtonClick("syllabus")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg shadow-md transition-colors ${
            activeView === "syllabus" ? "bg-purple-700 text-white" : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
        >
          <BookOpen className="w-5 h-5" />
          Coursework Syllabus
        </button>
        <button
          onClick={() => handleButtonClick("courses")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg shadow-md transition-colors ${
            activeView === "courses" ? "bg-violet-700 text-white" : "bg-violet-600 text-white hover:bg-violet-700"
          }`}
        >
          <FileText className="w-5 h-5" />
          Course Description
        </button>
        <a
          href="/academics/BT_PG_TT.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-lg shadow-md transition-colors bg-purple-600 text-white hover:bg-purple-700"
        >
          <FileText className="w-5 h-5" />
          Time Table
        </a>
        <a
          href="/academics/Academic_Handbook_62nd_Senate.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-lg shadow-md transition-colors bg-gray-600 text-white hover:bg-gray-700"
        >
          <BookOpen className="w-5 h-5" />
          Academic Handbook
        </a>
     
        
      </div>

      {/* Syllabus Section */}
      {activeView === "syllabus" && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Ph.D. Coursework Structure</h3>
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
                        <div className="bg-purple-50 px-4 py-3 rounded-t-lg border-b border-gray-200">
                          <h4 className="font-semibold text-gray-800">{sem.semester}</h4>
                        </div>
                        <div className="p-4 overflow-x-auto">
                          <table className="w-full text-sm border-collapse">
                            <thead>
                              <tr className="bg-gray-100">
                                {Object.keys(sem.data[0] || {}).map((key) => (
                                  <th key={key} className="px-3 py-2 text-left font-medium text-gray-700 border border-gray-200">{key}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {sem.data.map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-gray-50">
                                  {Object.values(row).map((value, cIdx) => (
                                    <td key={cIdx} className="px-3 py-2 border border-gray-200">{value}</td>
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
      )}

      {/* Course Description Section */}
      {activeView === "courses" && <PGCourseDescription close={() => setActiveView("overview")} />}
    </div>
  );
}