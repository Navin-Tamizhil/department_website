// src/pages/Biotechsociety.jsx
import { useState, useEffect } from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Biotechsociety = () => {
  // --- Hero Carousel Images ---
  const heroImages = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % heroImages.length),
      3000 // slide every 3 sec
    );
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // --- Society Members Data ---
  const members = [
    {
      name: "",
      post: "President",
      year: "",
      course: " Biotechnology",
      dept: "Biotech Dept",
      img: "/images/members/abc.jpg",
    },
    {
      name: "aaa",
      post: "Secretary",
      year: "0000000000",
      course: " Biotechnology",
      dept: "Biotech Dept",
      img: "/images/members/qwetry.jpg",
    },
     {
      name: "aaa",
      post: "Secretary",
      year: "0000000000",
      course: " Biotechnology",
      dept: "Biotech Dept",
      img: "/images/members/qwetry.jpg",
    },
     {
      name: "aaa",
      post: "Secretary",
      year: "0000000000",
      course: " Biotechnology",
      dept: "Biotech Dept",
      img: "/images/members/qwetry.jpg",
    },
     {
      name: "aaa",
      post: "Secretary",
      year: "0000000000",
      course: " Biotechnology",
      dept: "Biotech Dept",
      img: "/images/members/qwetry.jpg",
    }
   
  ];

  // --- Activities ---
  const activities = {
    "Workshops": "6 months worksop.",
    "Seminars": "Invited talks by Dr. XYZ.",
    "Events": "QUiz, Memes competeton.",
  };
  const [activeTab, setActiveTab] = useState("Workshops");

  // --- News ---
  const news = [
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!",
    "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
    "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] overflow-hidden rounded-2xl shadow-lg">
        <img
          src={heroImages[currentIndex]}
          alt="Hero Slide"
          className="w-full h-full object-cover transition-all duration-700"
        />
      </div>

      {/* Members Section */}
      <section className="px-6">
        <h2 className="text-3xl font-bold mb-6">Society Members</h2>
        <div className="grid md:grid-cols-5 gap-3">
          {members.map((m, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-4 text-center"
            >
              <img
                src={m.img}
                alt={m.name}
                className="w-32 h-32 mx-auto rounded-full object-cover"
              />
              <h3 className="mt-4 text-xl font-semibold">{m.name}</h3>
              <p className="text-gray-600">{m.post}</p>
              <p className="text-sm text-gray-500">
                {m.year} • {m.course}
              </p>
              <p className="text-sm text-gray-400">{m.dept}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Activities Tabs */}
      <section className="px-6">
        <h2 className="text-3xl font-bold mb-6">Activities</h2>
        <div className="flex gap-4 mb-4">
          {Object.keys(activities).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <p className="bg-gray-100 p-6 rounded-xl shadow">
          {activities[activeTab]}
        </p>
      </section>

      {/* News Scroller */}
      <section className="bg-yellow-100 py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          {news.map((n, i) => (
            <span key={i} className="mx-8 text-lg font-medium">
              {n}
            </span>
          ))}
        </div>
      </section>

      {/* Social Media */}
      <footer className="flex justify-center gap-6 py-6 bg-gray-900 text-white">
        
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <Twitter className="w-6 h-6" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <Instagram className="w-6 h-6" />
        </a>

      </footer>
    </div>
  );
};


