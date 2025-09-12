// src/pages/Academics/PhD.jsx
export default function PhD() {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="bg-white shadow-md rounded-xl p-8 border border-gray-100">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Ph.D. (Biotechnology)
        </h2>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed mb-6">
          Our research-intensive Ph.D. program aims to develop future leaders in
          biotechnology by fostering independent and intellectual thinking,
          interdisciplinary research, scientific writing, presentation,
          communication, and research ethics. Students undertake independent
          projects in frontier areas of biotechnology and are trained with
          cutting-edge technologies to address complex biological problems.
        </p>

        {/* Key Details */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">
              Duration
            </h3>
            <p className="text-gray-700">5 years</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">
              Eligibility Criteria
            </h3>
            <p className="text-gray-700">
              B.Tech/B.E./M.Tech/M.Sc./M.E. in any area of life sciences,
              M.Pharm, MBBS, MD/MS.  
              A valid national-level qualification such as CSIR-JRF, UGC-JRF,
              DBT-JRF (Category I), DST-INSPIRE, or GATE is required for
              B.Tech/B.E./M.Sc. candidates.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">
              Admission Procedure
            </h3>
            <p className="text-gray-700">
              Candidates are shortlisted through an interview process, conducted
              twice a year (June and December).
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">
              Program Features
            </h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>12–24 credits of coursework</li>
              <li>Publications in international peer-reviewed journals</li>
              <li>Patent filing opportunities</li>
              <li>Presentations at national and international conferences</li>
              <li>Skill development workshops</li>
              <li>
                Joint Doctoral Programs (JDPs) with renowned foreign
                universities
              </li>
              <li>Interdisciplinary Ph.D. programs</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
