import { Link, Outlet, useLocation } from "react-router-dom";
import Projects from "./Projects.jsx";
import Collaborations from "./Collaborations.jsx";
import Patents from "./Patents.jsx";
import Publications from "./Publications.jsx";

const researchGroups = [
  { id: "group1", name: "Structural Biology" },
  { id: "group2", name: "Disease Biology" },
  { id: "group3", name: "Cancer Biology" },
  { id: "group4", name: "Big Data Biology" },
  { id: "group5", name: "Bioprocess and Microbiology" },
];

export default function Research() {
  const location = useLocation();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Research at IIT Hyderabad</h1>

      {/* Tabs for Groups */}
      <div className="flex space-x-4 border-b pb-2 mb-6">
        {researchGroups.map((group) => (
          <Link
            key={group.id}
            to={`/research/${group.id}`}
            className={`px-4 py-2 rounded-t-lg ${
              location.pathname.includes(group.id)
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {group.name}
          </Link>
        ))}
      </div>
        <Projects />
        <Publications/>
        <Patents/>
        <Collaborations/>
        
      {/* Load group-specific content */}
      <Outlet />
    </div>
  );
}
