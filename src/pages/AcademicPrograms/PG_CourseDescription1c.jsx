// src/pages/AcademicPrograms/PG_CourseDescription.jsx
import { useState, useEffect } from "react";
import { X, Search, Clock, User, FileText, Star } from "lucide-react";

export default function PGCourseDescription({ close }) {
  const [courseData, setCourseData] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { key: "core_courses", label: "Core Courses", color: "emerald" },
    { key: "departmental_electives_sem1", label: "Departmental Electives (Sem 1)", color: "blue" },
    { key: "departmental_electives_sem2", label: "Departmental Electives (Sem 2)", color: "purple" },
  ];

  useEffect(() => {
    import("./pg_courses.json")
      .then((data) => setCourseData(data.default))
      .catch((error) => console.error("Failed to load pg_courses.json:", error));
  }, []);

  const getFilteredCourses = (categoryKey) => {
    const courses = courseData[categoryKey] || [];
    return courses.filter((course) =>
      course.course_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const courseObjective = selectedCourse?.objective;
  const allReferences = [
    ...(selectedCourse?.references || []),
    ...(selectedCourse?.review_articles || []),
    ...(selectedCourse?.research_articles || []),
    ...(selectedCourse?.suggested_reading || []),
    ...(selectedCourse?.additional_info || []),
    ...(selectedCourse?.Online_resources || []),
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-7xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-600 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">PG Course Catalog</h2>
            <p className="text-emerald-100 mt-1">M.Tech Program & Ph.D. Course Work </p>
          </div>
          <button
            onClick={close}
            className="p-2 hover:bg-emerald-700 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar */}
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

            {/* Course List */}
            <div className="p-4">
              {categories.map((category) => {
                const filteredCourses = getFilteredCourses(category.key);
                const colorClass =
                  category.color === "emerald"
                    ? "text-emerald-700"
                    : category.color === "blue"
                    ? "text-blue-700"
                    : "text-purple-700";

                return (
                  <div key={category.key} className="mb-6">
                    <h3 className={`text-lg font-semibold mb-3 sticky top-0 bg-gray-50 py-2 ${colorClass}`}>
                      {category.label}
                    </h3>
                    <div className="space-y-2">
                      {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                          <button
                            key={course.course_code}
                            onClick={() => setSelectedCourse(course)}
                            className={`w-full text-left p-3 rounded-lg border transition-colors ${
                              selectedCourse?.course_code === course.course_code
                                ? category.color === "emerald"
                                  ? "bg-emerald-100 border-emerald-300"
                                  : category.color === "blue"
                                  ? "bg-blue-100 border-blue-300"
                                  : "bg-purple-100 border-purple-300"
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
                        ))
                      ) : (
                        <p className="text-gray-500 italic text-sm">No courses found</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Course Details */}
          <div className="flex-1 overflow-y-auto">
            {selectedCourse ? (
              <div className="p-6 space-y-8">
                {/* Header */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedCourse.course_name}
                  </h3>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {selectedCourse.course_code}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded flex items-center gap-1">
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
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold text-gray-700">Prerequisites:</span>
                        <span className="ml-2">{selectedCourse.pre_requisite}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Objective */}
                {courseObjective && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 text-lg">Course Objective</h4>
                    <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border">
                      {courseObjective}
                    </p>
                  </div>
                )}

                {/* Contents */}
                {(selectedCourse.contents || selectedCourse.course_contents) && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 text-lg">Course Contents</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <pre className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed font-sans">
                        {selectedCourse.contents || selectedCourse.course_contents}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Textbooks */}
                {Array.isArray(selectedCourse.textbooks) && selectedCourse.textbooks.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 text-lg">Textbooks</h4>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <ul className="space-y-2 list-disc pl-5 text-sm">
                        {selectedCourse.textbooks.map((book, index) => (
                          <li key={index} className="text-gray-700 leading-relaxed">{book}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Alternative textbook field */}
                {Array.isArray(selectedCourse.text_books) && selectedCourse.text_books.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 text-lg">Textbooks</h4>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <ul className="space-y-2 list-disc pl-5 text-sm">
                        {selectedCourse.text_books.map((book, index) => (
                          <li key={index} className="text-gray-700 leading-relaxed">{book}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* References */}
                {allReferences.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 text-lg">References</h4>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <ul className="space-y-2 list-disc pl-5 text-sm">
                        {allReferences.map((ref, index) => (
                          <li key={index} className="text-gray-700 leading-relaxed">{ref}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-lg">Select a course to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
