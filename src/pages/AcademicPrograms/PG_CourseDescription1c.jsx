// src/pages/AcademicPrograms/PG_CourseDescription.jsx
import { useState } from "react";
import { X, Search, Book, Clock, User } from "lucide-react";
import courseData from "./pg_courses.json";

export default function PGCourseDescription({ close }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { key: "core_courses", label: "Core Courses", color: "emerald" },
    { key: "departmental_electives_sem1", label: "Semester 1 Electives", color: "blue" },
    { key: "departmental_electives_sem2", label: "Semester 2 Electives", color: "purple" }
  ];

  // Filter courses based on search term
  const getFilteredCourses = (categoryKey) => {
    const courses = courseData[categoryKey] || [];
    return courses.filter(course =>
      course.course_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getColorClasses = (color) => {
    const colorMap = {
      emerald: "bg-emerald-100 text-emerald-800",
      blue: "bg-blue-100 text-blue-800",
      purple: "bg-purple-100 text-purple-800"
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-7xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-emerald-600 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Course Catalog</h2>
            <p className="text-emerald-100 mt-1">M.Tech Medical Biotechnology</p>
          </div>
          <button
            onClick={close}
            className="p-2 hover:bg-emerald-700 rounded-full transition-colors"
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Course List by Category */}
            <div className="p-4">
              {categories.map((category) => {
                const filteredCourses = getFilteredCourses(category.key);
                
                return (
                  <div key={category.key} className="mb-6">
                    <h3 className={`text-lg font-semibold mb-3 sticky top-0 bg-gray-50 py-2 ${
                      category.color === 'emerald' ? 'text-emerald-700' : 
                      category.color === 'blue' ? 'text-blue-700' : 'text-purple-700'
                    }`}>
                      {category.label}
                    </h3>
                    <div className="space-y-2">
                      {filteredCourses.map((course) => (
                        <button
                          key={course.course_code}
                          onClick={() => setSelectedCourse(course)}
                          className={`w-full text-left p-3 rounded-lg border transition-colors ${
                            selectedCourse?.course_code === course.course_code
                              ? `${getColorClasses(category.color)} border-${category.color}-300`
                              : "bg-white border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <h4 className="font-medium text-gray-800 text-sm">
                            {course.course_name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {course.course_code} • {course.credit} Credits
                            {course.instructor && ` • ${course.instructor}`}
                          </p>
                        </button>
                      ))}
                      {filteredCourses.length === 0 && (
                        <p className="text-gray-500 italic text-sm">No courses found</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Content - Course Details */}
          <div className="flex-1 overflow-y-auto">
            {selectedCourse ? (
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedCourse.course_name}
                  </h3>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded flex items-center gap-1">
                      <Book className="w-3 h-3" />
                      {selectedCourse.course_code}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {selectedCourse.credit} Credits
                    </span>
                    {selectedCourse.semester && (
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                        Semester {selectedCourse.semester}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
                    {selectedCourse.instructor && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold text-gray-700">Instructor:</span>
                        <span>{selectedCourse.instructor}</span>
                      </div>
                    )}
                    {selectedCourse.pre_requisite && (
                      <div>
                        <span className="font-semibold text-gray-700">Prerequisites:</span>
                        <span className="ml-2">{selectedCourse.pre_requisite}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {selectedCourse.objective && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        Course Objective
                      </h4>
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                        <p className="text-gray-700 leading-relaxed">
                          {selectedCourse.objective}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedCourse.contents && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Course Contents
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <pre className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed font-sans">
                          {selectedCourse.contents}
                        </pre>
                      </div>
                    </div>
                  )}

                  {selectedCourse.textbooks && selectedCourse.textbooks.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        Textbooks
                      </h4>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <ul className="space-y-2">
                          {selectedCourse.textbooks.map((book, index) => (
                            <li key={index} className="text-gray-700 text-sm leading-relaxed">
                              {book}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {selectedCourse.references && selectedCourse.references.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        References
                      </h4>
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <ul className="space-y-2">
                          {selectedCourse.references.map((ref, index) => (
                            <li key={index} className="text-gray-700 text-sm leading-relaxed">
                              {ref}
                            </li>
                          ))}
                        </ul>
                      </div>
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
                  <p className="text-lg font-medium">Select a course to view details</p>
                  <p className="text-sm mt-1">Browse courses by category or use the search function</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}