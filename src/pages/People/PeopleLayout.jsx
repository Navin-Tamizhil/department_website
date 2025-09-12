import { Outlet } from "react-router-dom";

export default function PeopleLayout() {
  return (
    <div className="p-6">
      

      <Outlet />
    </div>
  );
}
