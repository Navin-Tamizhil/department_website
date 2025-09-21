import React from "react";

const internationalCollaborators = [
  { name: "Prof. Peter Carmeliet", institute: "VIB-KU Leuven Center for Cancer Biology", country: "Leuven, Belgium" },
  { name: "Prof. Julia Gorelik", institute: "National Heart & Lung Institute, Imperial College", country: "London, UK" },
  { name: "Prof. Jann Scott", institute: "Newcastle University", country: "UK" },
  { name: "Dr Andres Maturana", institute: "Nagoya University", country: "Nagoya, Japan" },
  { name: "Dr. Salim Timo Islam", institute: "INRS-Institut Armand-Frappier Center", country: "Quebec, Canada" },
  { name: "Prof. Mitchell Singer", institute: "Dept. of Microbiology and", country: "Davis, USA" },
  { name: "Dr. Rebecca Parales", institute: "Molecular Genetics, University of California", country: "Davis, USA" },
  { name: "Prof. Emina A. Stojkovic", institute: "College of Arts and Sciences, Northeastern Illinois University", country: "Chicago, Illinois, USA" },
  { name: "Dr. Pia H. Moisander", institute: "University of Massachusetts Dartmouth", country: "Massachusetts USA" },
  { name: "Prof. Akira Shinohara", institute: "Osaka University", country: "Osaka, Japan" },
  { name: "Prof. Dr. Ulrich Schwaneberg", institute: "RWTH Aachen University", country: "Aachen, Germany" },
  { name: "Dr. Mehdi D. Davari", institute: "Leibniz Institute of Plant Biochemistry", country: "Weinburg. Germany" },
  { name: "Prof. Simon Moulton", institute: "Swinburne University of", country: "Australia" },
  { name: "Prof. Greg Murray", institute: "Technology", country: "Australia" },
  { name: "Prof. Richard Porter", institute: "University of Otago, Christchurch", country: "New Zealand" },
];

const nationalCollaborators = [
  { name: "Dr. Nagarajan Ganapathy", institute: "IIT Hyderabad" },
  { name: "Dr Shishir Kumar", institute: "IIT Hyderabad" },
  { name: "Dr. Rahul Kumar", institute: "IIT Hyderabad" },
  { name: "Prof. T Shashidar", institute: "IIT Hyderabad" },
  { name: "Dr. Suhanya Duraiswamy", institute: "IIT Hyderabad" },
  { name: "Dr. Satyavrata Samavedi", institute: "IIT Hyderabad" },
  { name: "Dr. Somnath Maji", institute: "IIT Hyderabad" },
  { name: "Dr. Rajakumara Eerappa", institute: "IIT Hyderabad" },
  { name: "Dr. Aravind Kumar Rengan", institute: "IIT Hyderabad" },
  { name: "Dr. Krishna Guvvala", institute: "IIT Hyderabad" },
  { name: "Prof. G. Satyanarayana", institute: "IIT Hyderabad" },
  { name: "Prof. Sumohana Channappayya", institute: "IIT Hyderabad" },
  { name: "Dr. Gunjan Mehta", institute: "IIT Hyderabad" },
  { name: "Dr. Jyotsnendu Giri", institute: "IIT Hyderabad" },
  { name: "Dr. Aravind Kumar Rengan,", institute: "IIT Hyderabad" },
  { name: "Prof. Anindya Roy", institute: "IIT Hyderabad" },
  { name: "Dr Swati Ghossh Acharyya", institute: "University of Hyderabad" },
  { name: "Dr. Vishal Rao", institute: "Indo-American Cancer Hospital, Hyderabad" },
  { name: "Dr. Shweta Tyagi", institute: "CDFD, Hyderabad" },
  { name: "Dr. Ram Rup Sarkar", institute: "CSIR - NCL, Pune" },
  { name: "Prof. Nishant Verma", institute: "KGMU Lucknow" },
  { name: "Dr. Srikrishna Subramanian", institute: "CSIR-IMTECH, Chandigarh" },
  { name: "Dr. Rachna Chaba", institute: "IISER Mohali, Punjab" },
  { name: "Prof. Sanjeev C. Ghadi", institute: "Goa University, Goa" },
  { name: "Dr. Sutharsan Govindarajan", institute: "SRM University, Amarawati, AP" },
  { name: "Dr. Kapudeep Karmakar", institute: "UBKV, West Bengal" },
  { name: "Dr. Qazi Parvaiz Hassan", institute: "CSIR - IIIM, J&K" },
  { name: "Dr. Gunjan Goel", institute: "Central University of Haryana" },
  { name: "Dr. Kaustuv Sanyal", institute: "JNCASR, Bengaluru, KA" },
  { name: "Dr. Guruprasad Kalthur", institute: "Kasturba Medical College, Manipal, KA" },
  { name: "Dr. Athi N. Naganathan", institute: "IIT Madras, Chennai, TN" },
  { name: "Dr. P Ekambaram", institute: "Bharathiar University, Coimbatore, TN." },
];

export default function Collaborations() {
  return (
    <div className="min-h-screen bg-blue-50 container mx-auto p-6 space-y-20 font-sans text-gray-800">

      {/* International Collaborations Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
          International Collaborators
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-[732px] flex-shrink-0 rounded-lg overflow-hidden shadow-md bg-white">
            <img
              src="/collabrations_images/international_collabrations.jpg"
              alt="International Collaborations"
              className="w-full h-auto object-cover rounded-lg"
              style={{ maxHeight: 422 }}
            />
          </div>

          <div className="flex-1 overflow-auto max-h-[480px] rounded-lg shadow-md p-4 bg-white">
            <table className="min-w-full table-auto text-sm border-collapse">
              <thead className="bg-blue-100 sticky top-0 z-30 shadow-md">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Collaborator Name</th>
                  <th className="px-4 py-2 text-left font-semibold">Institute Name</th>
                  <th className="px-4 py-2 text-left font-semibold">Institute Country</th>
                </tr>
              </thead>
              <tbody>
                {internationalCollaborators.map(({ name, institute, country }, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-blue-100 transition-colors duration-150 even:bg-white odd:bg-blue-50"
                  >
                    <td className="px-4 py-2">{name}</td>
                    <td className="px-4 py-2">{institute}</td>
                    <td className="px-4 py-2">{country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* National Collaborations Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
          National Collaborators
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-[392px] rounded-lg overflow-hidden shadow-md bg-white flex-shrink-0">
            <img
              src="/collabrations_images/national_collabration.jpg"
              alt="National Collaborations"
              className="w-full h-auto object-cover rounded-lg"
              style={{ maxHeight: 452 }}
            />
          </div>

          <div className="flex-1 overflow-auto max-h-[480px] rounded-lg shadow-md p-4 bg-white">
            <table className="min-w-full table-auto text-sm border-collapse">
              <thead className="bg-blue-100 sticky top-0 z-30 shadow-md">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Collaborator Name</th>
                  <th className="px-4 py-2 text-left font-semibold">Institute Name</th>
                </tr>
              </thead>
              <tbody>
                {nationalCollaborators.map(({ name, institute }, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-blue-100 transition-colors duration-150 even:bg-white odd:bg-blue-50"
                  >
                    <td className="px-4 py-2">{name}</td>
                    <td className="px-4 py-2">{institute || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Industry Collaborations Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900">Industry Collaborations</h2>
        <div className="flex flex-col md:flex-row gap-16 justify-center items-center">
          <div className="flex flex-col items-center space-y-4 md:w-1/3 border border-gray-300 rounded-lg p-6 shadow-md bg-white">
            <img
              src="/collabrations_images/boltzmann_logo.png"
              alt="Boltzmann company logo"
              className="w-[256px] h-auto object-contain"
            />
            <div className="text-center space-y-1">
              <p className="font-semibold text-lg">Dr. Rajakumara Eerappa</p>
              <p>
                Company Name: <span className="font-medium">Boltzmann company</span>
              </p>
              <p>
                Country: <span className="font-medium">India</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 md:w-1/3 border border-gray-300 rounded-lg p-6 shadow-md bg-white">
            <img
              src="/collabrations_images/dr_reddys_logo.png"
              alt="Dr. Reddy's Laboratories logo"
              className="w-[188px] h-auto object-contain"
            />
            <div className="text-center space-y-1">
              <p className="font-semibold text-lg">Biotechnology Department</p>
              <p>
                Company Name: <span className="font-medium">Dr. Reddy's Laboratories (Joint-students programme)</span>
              </p>
              <p>
                Country: <span className="font-medium">India</span>
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
