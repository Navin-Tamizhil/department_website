// src/pages/AcademicPrograms/UG_CourseDescription.jsx
import { useState } from "react";
import { X, Search } from "lucide-react";
import courseData from "./ug_courses.json";

export default function CourseDescription({ close }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const yearOrder = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  
  const groupedCourses = yearOrder.reduce((acc, year) => {
    acc[year] = [];
    return acc;
  }, {});

  // Filter courses based on search term and group by year
  const filteredCourses = courseData.filter(course =>
    course["Course Name"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course["Course Code"]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  filteredCourses.forEach((course) => {
    const targetYear = course["Targeted Program and Year"]?.toLowerCase() || "";
    const matchedYear = yearOrder.find(yr => targetYear.includes(yr.toLowerCase()));
    
    if (matchedYear) {
      groupedCourses[matchedYear].push(course);
    }
  });

  // Support both "Course Objective" and "Course Objectives"
  const courseObjective =
    selectedCourse?.["Course Objective"] || selectedCourse?.["Course Objectives"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-7xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-indigo-600 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Course Catalog</h2>
            <p className="text-indigo-100 mt-1">B.Tech Bioinformatics & Biotechnology</p>
          </div>
          <button
            onClick={close}
            className="p-2 hover:bg-indigo-700 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar - Course List */}
          <div className="w-1/3 border-r border-gray-200 bg-gray-50 overflow-y-auto">
            
            {/* Search */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Course List */}
            <div className="p-4">
              {yearOrder.map((year) => (
                <div key={year} className="mb-6">
                  <h3 className="text-lg font-semibold text-indigo-700 mb-3 sticky top-0 bg-gray-50 py-2">
                    {year}
                  </h3>
                  <div className="space-y-2">
                    {groupedCourses[year].map((course) => (
                      <button
                        key={course["Course Code"]}
                        onClick={() => setSelectedCourse(course)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          selectedCourse?.["Course Code"] === course["Course Code"]
                            ? "bg-indigo-100 border-indigo-300"
                            : "bg-white border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <h4 className="font-medium text-gray-800 text-sm">
                          {course["Course Name"]}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {course["Course Code"]} • {course["Credits"]} Credits
                        </p>
                      </button>
                    ))}
                    {groupedCourses[year].length === 0 && (
                      <p className="text-gray-500 italic text-sm">No courses available</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content - Course Details */}
          <div className="flex-1 overflow-y-auto">
            {selectedCourse ? (
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedCourse["Course Name"]}
                  </h3>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {selectedCourse["Course Code"]}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                      {selectedCourse["Credits"]} Credits
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      {selectedCourse["Type of Course"]}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">Nature:</span>
                      <span className="ml-2">{selectedCourse["Nature of Course"] || "N/A"}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Target:</span>
                      <span className="ml-2">{selectedCourse["Targeted Program and Year"]}</span>
                    </div>
                  </div>

                  {selectedCourse["Pre-Requisites (If any)"] && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-2">Pre-Requisites</h4>
                      <p className="text-gray-700 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        {selectedCourse["Pre-Requisites (If any)"]}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {courseObjective && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Course Objective</h4>
                      <p className="text-gray-700 leading-relaxed">
                        {courseObjective}
                      </p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Course Contents</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <pre className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">
                        {selectedCourse["Contents"]}
                      </pre>
                    </div>
                  </div>

                  {selectedCourse["References"] && selectedCourse["References"].trim() !== "" && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">References</h4>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <pre className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">
                          {selectedCourse["References"]}
                        </pre>
                      </div>
                    </div>
                  )}

                  {selectedCourse["Justification:"] && selectedCourse["Justification:"].trim() !== "" && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Justification</h4>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedCourse["Justification:"]}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <p>Select a course to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
