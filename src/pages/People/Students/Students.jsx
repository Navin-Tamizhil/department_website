import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { loadStudentData } from "./DataLoader";

export default function Students() {
  const sections = [
    { name: "B.Tech", path: "btech" },
    { name: "M.Tech", path: "mtech" },
    { name: "Ph.D", path: "phd" },
    { name: "Statistics", path: "stats" }
  ];
  
  const location = useLocation();
  const [data, setData] = useState({ btech: [], mtech: [], phd: [], alumni: { btech: [], mtech: [], phd: [] } });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudentData().then(loadedData => {
      setData(loadedData);
      setLoading(false);
    });
  }, []);

  const activeTab = location.pathname.split("/").pop() || "btech";

  return (
    <section className="container mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-500">
        {activeTab === 'stats' ? 'Our Students' : 'Students on Roll'}
      </h1>

      <div className="flex justify-center mb-10">
        <div className="bg-white p-1.5 rounded-full shadow-md border flex flex-wrap justify-center gap-2">
          {sections.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-colors duration-300 text-sm sm:text-base ${
                activeTab === s.path
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {s.name}
            </Link>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-center py-10">Loading student data...</p>
      ) : (
        <Outlet context={{ data }} />
      )}
    </section>
  );
}
