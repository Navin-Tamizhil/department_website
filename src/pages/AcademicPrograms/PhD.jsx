// src/pages/AcademicPrograms/PhD.jsx
export default function PhD() {
  return (
    <div className="p-8">
      <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Ph.D. (Biotechnology)</h2>
        
        <p className="text-gray-700 leading-relaxed mb-8">
          Research-intensive Ph.D. program developing future leaders in biotechnology through independent 
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
                International peer-reviewed publications
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
                Joint Doctoral Programs (JDPs)
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                Interdisciplinary research programs
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}