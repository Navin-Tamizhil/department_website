import { useState } from 'react'
import courseData from '/ug_courses.json' // adjust path to your JSON file

function CourseDescription() {
  const [selectedCourse, setSelectedCourse] = useState(null)

  return (
    <section className="container mx-auto px-6 py-10">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">Course Catalog</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {courseData.map((course) => (
          <div
            key={course["Course Code"]}
            className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow hover:shadow-md"
            onClick={() => setSelectedCourse(course)}
          >
            <h3 className="text-lg font-semibold text-indigo-700">
              {course["Course Name"]}
            </h3>
            <p className="text-sm text-gray-500">
              Code: {course["Course Code"]}
            </p>
          </div>
        ))}
      </div>

      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="relative w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl overflow-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute right-3 top-3 rounded-full bg-gray-200 px-2 py-1 text-gray-700 hover:bg-gray-300"
            >
              ✕
            </button>

            <h3 className="mb-2 text-2xl font-bold text-gray-800">
              {selectedCourse["Course Name"]}
            </h3>

            <p className="mb-4 text-gray-600">
              <strong>Course Code:</strong> {selectedCourse["Course Code"]} <br />
              <strong>Credits:</strong> {selectedCourse["Credits"]} <br />
              <strong>Nature:</strong> {selectedCourse["Nature of Course"] || "N/A"} <br />
              <strong>Type:</strong> {selectedCourse["Type of Course"]} <br />
              <strong>Targeted Program and Year:</strong> {selectedCourse["Targeted Program and Year"]} <br />
              <strong>Pre-Requisites:</strong> {selectedCourse["Pre-Requisites (If any)"] || "None"}
            </p>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-800">Contents</h4>
              <p className="whitespace-pre-line text-gray-700">{selectedCourse["Contents"]}</p>
            </div>

            {selectedCourse["References"] && selectedCourse["References"].trim() !== "" && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800">References</h4>
                <pre className="whitespace-pre-wrap text-gray-700">{selectedCourse["References"]}</pre>
              </div>
            )}

            {selectedCourse["Course Objective"] && selectedCourse["Course Objective"].trim() !== "" && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800">Course Objective</h4>
                <p className="text-gray-700">{selectedCourse["Course Objective"]}</p>
              </div>
            )}

            {selectedCourse["Justification:"] && selectedCourse["Justification:"].trim() !== "" && (
              <div>
                <h4 className="font-semibold text-gray-800">Justification</h4>
                <p className="text-gray-700">{selectedCourse["Justification:"]}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default CourseDescription
