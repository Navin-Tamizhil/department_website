import { Link, Outlet, useLocation } from "react-router-dom";
import Projects from "./Projects1.jsx";
import Collaborations from "./Collaborations.jsx";
import ResearchAreas from "./ResearchAreas3.jsx";



export default function Research() {
  return (
    <div className="p-6">
      <Outlet />
    </div>
  );
}
