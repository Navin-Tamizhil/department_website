import { Link } from "react-router-dom";

export default function Students() {
  const sections = [
    { name: "B.Tech", path: "btech" },
    { name: "M.Tech", path: "mtech" },
    { name: "Ph.D", path: "phd" },
    { name: "Statistics", path: "stats" },
  ];

  return (
    <section className="min-h-screen px-6 py-16 text-center">
      <h1 className="text-5xl font-extrabold mb-10 text-indigo-700">Our Students</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {sections.map((s) => (
          <Link
            key={s.path}
            to={s.path}
            className="p-8 rounded-2xl shadow-xl bg-gradient-to-br from-indigo-50 to-white hover:from-indigo-100 hover:shadow-2xl transition"
          >
            <h2 className="text-2xl font-bold text-indigo-600">{s.name}</h2>
          </Link>
        ))}
      </div>
    </section>
  );
}
