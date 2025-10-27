import { useState } from 'react'
const courseData = {
    1: [
        {
            code: 'BT10010',
            name: 'INTRODUCTION TO LIFE SCIENCES',
            preRequisites: 'None',
            nature: 'Theory',
            type: 'ID',
            credits: 1,
            year: '1st Year',
            contents: `Relevance of Biological Principles to Engineering undergraduates. 
      Water and its special properties. Bio-molecules and their structure-function. 
      Cell structure and organelles, signaling, metabolism, energy harvesting, 
      DNA replication, repair, and the central dogma of molecular biology.`,
            references: [
                'Molecular Biology of the Cell – Alberts et al.',
                'Biochemistry – Berg, Tymoczko & Gatto',
            ],
            objective:
                'Provide an introduction to biological principles relevant for engineers.',
            justification:
                'First-year foundation course giving students an exposure to life sciences.',
        },
        {
            code: 'BT10110',
            name: 'INTRODUCTION TO BIO-NANOTECHNOLOGY',
            preRequisites: 'None',
            nature: 'Theory',
            type: 'Department Core',
            credits: 1,
            year: '1st Year',
            contents: `Introduction to nanotechnology and bio-nanotechnology, 
      biological self-assembly, biomimetics, nucleic acid nanotechnology, 
      DNA origami, protein engineering, lipid nanotechnology, chirality in 
      biological systems, nanomaterials interactions, viruses and vaccines.`,
            references: [
                'Young-Chul Lee and Ju-Young Moon, Introduction to Bionanotechnology (Springer, 2020)',
                'Phillips, Kondev & Theriot, Physical Biology of the Cell (Garland Science, 2012)',
            ],
            objective:
                'Introduce students to designing nanodevices using biological matter (‘living software revolution’).',
            justification:
                'Programming biomolecules for therapeutics, sequencing, and drug delivery is an emerging research frontier.',
        },
    ],
    2: [
        {
            code: 'BT20010',
            name: 'MOLECULAR BIOLOGY',
            preRequisites: 'Basic Biology',
            nature: 'Theory',
            type: 'Core',
            credits: 3,
            year: '2nd Year',
            contents:
                'DNA replication, transcription, translation. Gene expression and regulation in prokaryotes and eukaryotes. Recombinant DNA methods.',
            references: ['Watson et al., Molecular Biology of the Gene'],
            objective:
                'Teach principles of molecular genetics and gene regulation.',
            justification:
                'Essential background for biotechnology and bioinformatics students.',
        },
    ],
    3: [
        {
            code: 'BT30010',
            name: 'GENOMICS AND PROTEOMICS',
            preRequisites: 'Molecular Biology',
            nature: 'Theory',
            type: 'Elective',
            credits: 3,
            year: '3rd Year',
            contents:
                'NGS technologies, transcriptomics, proteomics, and computational tools for data analysis.',
            references: [
                'Principles of Genome Analysis and Genomics – Primrose & Twyman',
            ],
            objective:
                'Train students in omics technologies and their applications.',
            justification:
                'Prepares students for advanced bioinformatics and systems biology.',
        },
    ],
    4: [
        {
            code: 'BT40020',
            name: 'BIOTECHNOLOGY PROJECT',
            preRequisites: 'Completion of core courses',
            nature: 'Practical',
            type: 'Project',
            credits: 6,
            year: '4th Year',
            contents:
                'Independent research project in biotechnology or bioinformatics under faculty supervision.',
            references: [],
            objective: 'Give students hands-on research experience.',
            justification:
                'Capstone project consolidating learning and research exposure.',
        },
    ],
}

function CourseDescription() {
    const [selectedYear, setSelectedYear] = useState(1)
    const [selectedCourse, setSelectedCourse] = useState(null)
    return (
        <section className="container mx-auto px-6 py-10">
            <h2 className="mb-6 text-3xl font-bold text-gray-800">
                Course Catalog
            </h2>

            <div className="mb-6 flex space-x-4">
                {[1, 2, 3, 4].map((year) => (
                    <button
                        key={year}
                        onClick={() => {
                            setSelectedYear(year)
                            setSelectedCourse(null)
                        }}
                        className={`rounded-lg px-4 py-2 font-medium ${
                            selectedYear === year
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                    >
                        Year {year}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {courseData[selectedYear].map((course) => (
                    <div
                        key={course.code}
                        className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow hover:shadow-md"
                        onClick={() => setSelectedCourse(course)}
                    >
                        <h3 className="text-lg font-semibold text-indigo-700">
                            {course.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                            Code: {course.code}
                        </p>
                    </div>
                ))}
            </div>

            {selectedCourse && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="relative w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
                        <button
                            onClick={() => setSelectedCourse(null)}
                            className="absolute right-3 top-3 rounded-full bg-gray-200 px-2 py-1 text-gray-700 hover:bg-gray-300"
                        >
                            ✕
                        </button>

                        <h3 className="mb-2 text-2xl font-bold text-gray-800">
                            {selectedCourse.name}
                        </h3>
                        <p className="mb-4 text-gray-600">
                            <strong>Course Code:</strong> {selectedCourse.code}{' '}
                            <br />
                            <strong>Credits:</strong> {selectedCourse.credits}{' '}
                            <br />
                            <strong>Nature:</strong> {selectedCourse.nature}{' '}
                            <br />
                            <strong>Type:</strong> {selectedCourse.type} <br />
                            <strong>Year:</strong> {selectedCourse.year} <br />
                            <strong>Pre-Requisites:</strong>{' '}
                            {selectedCourse.preRequisites}
                        </p>

                        <div className="mb-4">
                            <h4 className="font-semibold text-gray-800">
                                Contents
                            </h4>
                            <p className="whitespace-pre-line text-gray-700">
                                {selectedCourse.contents}
                            </p>
                        </div>

                        {selectedCourse.references?.length > 0 && (
                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-800">
                                    References
                                </h4>
                                <ul className="list-disc pl-6 text-gray-700">
                                    {selectedCourse.references.map(
                                        (ref, idx) => (
                                            <li key={idx}>{ref}</li>
                                        )
                                    )}
                                </ul>
                            </div>
                        )}

                        <div className="mb-4">
                            <h4 className="font-semibold text-gray-800">
                                Course Objective
                            </h4>
                            <p className="text-gray-700">
                                {selectedCourse.objective}
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-800">
                                Justification
                            </h4>
                            <p className="text-gray-700">
                                {selectedCourse.justification}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default CourseDescription
