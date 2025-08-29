import { Outlet } from "react-router-dom";

export default function PeopleLayout() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Our People</h1>

      <Outlet />
    </div>
  );
}
