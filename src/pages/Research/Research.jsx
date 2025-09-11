import { Link, Outlet, useLocation } from "react-router-dom";
import Projects from "./Projects.jsx";
import Collaborations from "./Collaborations.jsx";
import ResearchAreas from "./ResearchAreas.jsx";



export default function Research() {
  return (
    <div className="p-6">
      <Outlet />
    </div>
  );
}
