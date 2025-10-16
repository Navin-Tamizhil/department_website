import React, { useState, useEffect, useRef } from "react";
import { Lightbulb, Rocket, Gem, Sparkles, Star, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AnnouncementsModified } from "./Home_announcements.jsx";
import EventsModified from "./Home_events";
import { admissions } from "../AcademicPrograms/admissionData";
import { eventsData } from "../Events/eventsData";
import { lifeAtDeptImages } from "./lifeAtDeptImages";

export default function Home() {
  const images = [
    "/images/home_background.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
    "/images/image5.jpg",
    
  ];
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

// ====== AUTO SLIDER ======
  const startSlider = () => {
    stopSlider();
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 2000);
  };
  const stopSlider = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  useEffect(() => {
    startSlider();
    return stopSlider;
  }, []);

  // ====== SCROLL CONTROL ======
  const [scrollingPaused, setScrollingPaused] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (title, event) => {
    // Don't pause if a link was clicked
    if (event.target.tagName === "A") return;

    setScrollingPaused(true);
    setSelectedItem(title);

    // auto-resume after 5s
    setTimeout(() => {
      setScrollingPaused(false);
      setSelectedItem(null);
    }, 5000);
  };

  const resumeScrolling = () => {
    setScrollingPaused(false);
    setSelectedItem(null);
  };


  return (
    <div>
      {/* ---------------- Hero Section ---------------- */}
      <section className="relative h-[60vh] md:h-[75vh] overflow-hidden rounded-3xl shadow-lg bg-gray-100 mx-4 md:mx-14 my-10 px-4 md:px-10 py-6">
        <img
          src={images[current]}
          alt="Welcome"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 rounded-3xl"
        />

        {current === 0 && (
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white p-4 sm:p-6 animate-fadeIn rounded-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
              Welcome to the Department of Biotechnology
            </h1>
            <p className="max-w-3xl text-lg md:text-xl leading-relaxed drop-shadow-lg">
              Striving for excellence in teaching, research, and innovation since
              2010.
            </p>
          </div>
        )}

        {/* Navigation */}
        <button
          onClick={() =>
            setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
          }
          className="absolute left-2 md:left-6 bottom-4 md:bottom-6 bg-white/80 hover:bg-white rounded-full p-2 md:p-3 shadow-md"
        >
          ◀
        </button>
        <button
          onClick={() =>
            setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
          }
          className="absolute right-2 md:right-6 bottom-4 md:bottom-6 bg-white/80 hover:bg-white rounded-full p-2 md:p-3 shadow-md"
        >
          ▶
        </button>
      </section>

      {/* ---------------- Message from HOD ---------------- */}
      <section className="w-full bg-gradient-to-r from-indigo-50 via-white to-purple-50 rounded-3xl p-4 md:p-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-10 text-center text-gray-800">
          Message from HOD
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left - Image */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-3 bg-gradient-to-tr from-pink-400 via-indigo-400 to-purple-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition"></div>
              <img
                src="/images/AB1_medium.jpg"
                alt="Head of Department"
                 width="4359"
                 height="3400"
               className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover rounded-3xl border-4 border-white shadow-2xl transform group-hover:scale-105 group-hover:rotate-1 transition duration-500"
                  />
            </div>
          </div>

          {/* Right - Message */}
          <div className="lg:col-span-2 text-gray-700 leading-relaxed text-justify space-y-6 px-4 sm:px-2">
            <p>
              Since the biotechnology department started its journey in 2010, the
              department has been striving for excellence in teaching and research.
              We have been continuously acquiring new capabilities and producing
              brilliant future scientists. We recently moved to our newly
              constructed state-of-the-art building in 2022, which is in the shape
              of a chromosome, further asserting our commitment to excellence.
            </p>
            <p>
              We have 17 world-class research laboratories and a dedicated teaching
              laboratory for students. The department offers B.Tech. in
              Biotechnology and Bioinformatics, M.Tech. in Medical Biotechnology,
              and Ph.D. in various Biotechnology and allied multidisciplinary areas
              at the forefront.
            </p>
            <p>
              Our curriculum provides multifaceted opportunities to the students,
              including exposure to industrial problems so that we can address
              critical challenges not only faced by society but also industries,
              which is the first and foremost requirement for "AatmaNirbhar Bharat".
              We also have a unique biannual hands-on lab training, an outreach
              programme, for researchers or students from Indian universities and
              institutes, and industrial professionals who want to enhance their
              wet-lab or computational biology research skills.
            </p>
            <p className="text-gray-900 text-right p-4">
                <b>Dr. Anamika Bhargava,</b><br />
                Professor and Head of the Department.
              </p>
          </div>
        </div>
      </section>

      {/* ---------------- Vision, Mission, Values ---------------- */}
      <section
        
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-4 md:mx-14 my-10 px-4 md:px-10 py-6"
      >
        <div className="flex flex-col h-full p-6 rounded-2xl shadow-md bg-white hover:bg-gradient-to-br hover:from-yellow-50 hover:to-white hover:shadow-xl hover:scale-105 transition-all duration-300">
          <Lightbulb className="mx-auto w-12 h-12 text-yellow-500" />
          <h2 className="text-xl text-center font-semibold mt-4">Vision</h2>
          <p className="text-gray-600 text-justify mt-2 flex-grow">
            Our vision is to foster a world-class teaching environment and
            state-of-the-art facilities for cutting-edge biotechnology research to
            drive an academic space that is dedicated to cultivating innovative
            opportunities and systemwide collaboration for discovery beyond
            boundaries.
          </p>
        </div>

        <div className="flex flex-col h-full p-6 rounded-2xl shadow-md bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-white hover:shadow-xl hover:scale-105 transition-all duration-300">
          <Rocket className="mx-auto w-12 h-12 text-blue-600" />
          <h2 className="text-xl text-center font-semibold mt-4">Mission</h2>
          <p className="text-gray-600 text-justify mt-2 flex-grow">
            Our mission is to accelerate as an outstanding educational hub with an
            equal emphasis on excellence in teaching, research, and community
            engagement.
          </p>
        </div>

        <div className="flex flex-col h-full p-6 rounded-2xl shadow-md bg-white hover:bg-gradient-to-br hover:from-purple-50 hover:to-white hover:shadow-xl hover:scale-105 transition-all duration-300">
          <Gem className="mx-auto w-12 h-12 text-purple-600" />
          <h2 className="text-xl font-semibold mt-4 text-center">Values</h2>
          <p className="text-gray-600 text-justify mt-2 flex-grow">
            We aspire to value the highest academic and professional integrity,
            scientific ethics, and excellence in teaching and research to realize
            the full potential of biotechnology.
          </p>
        </div>
      </section>


      {/* ---------------- Artistic Announcements & Events Tabs ---------------- */}
      <div className="relative">
        {/* Floating decorative elements */}
        <div className="absolute -top-10 -left-10 opacity-20">
          <Sparkles className="w-20 h-20 text-purple-400" />
        </div>
        <div className="absolute -bottom-10 -right-10 opacity-20">
          <Star className="w-16 h-16 text-blue-400" />
        </div>
        <AnnouncementsEventsTabs
          scrollingPaused={scrollingPaused}
          handleItemClick={handleItemClick}
          announcements={admissions} // Pass admissions data
          events={eventsData}
        />
      </div>

      {/* ---------------- Scroll CSS ---------------- */}
      <style>{`
        @keyframes scroll-slow {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        @keyframes scroll-fast {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .animate-scroll-slow {
          animation: scroll-slow 20s linear infinite;
        }
        .animate-scroll-fast {
          animation: scroll-fast 15s linear infinite;
        }
        .animate-scroll-faster {
          animation: scroll-fast 10s linear infinite; /* Using same keyframe, just faster */
        }
        /* Pause on hover */
        .animate-scroll-slow:hover,
        .animate-scroll-fast:hover,
        .animate-scroll-faster:hover {
          animation-play-state: paused;
        }
        
        /* Fade-in animation for tabs */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

function AnnouncementsEventsTabs({ scrollingPaused, handleItemClick, announcements, events }) {
  const hasLatestAnnouncements = announcements.some((a) => a.isLatest);
  const hasLatestEvents = events.some((e) => e.isLatest);
  const hasLatest = hasLatestAnnouncements || hasLatestEvents;

  // Auto-switch to Life at Department if no latest content
  const [activeTab, setActiveTab] = useState(hasLatest ? "announceEvents" : "lifeDept");

  // State for image modal
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);


  return (
    <div className="mx-4 md:mx-10 my-10 px-4 md:px-10 py-8 bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-3xl shadow-2xl border border-white/50 relative overflow-hidden">
      {/* Artistic background elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full -translate-x-16 -translate-y-16 opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full translate-x-20 translate-y-20 opacity-40"></div>
      
      {/* Tabs Header */}
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-10 relative z-10">
        {/* Announcements & Events tab - only show if there are latest items */}
        {hasLatest && (
          <button
            onClick={() => setActiveTab("announceEvents")}
            className={`px-6 py-3 sm:px-8 font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg ${
              activeTab === "announceEvents"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-200"
                : "bg-white text-gray-700 hover:bg-indigo-50 border-2 border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Latest
            </div>
          </button>
        )}

        {/* Life at Department tab - always show */}
        <button
          onClick={() => setActiveTab("lifeDept")}
          className={`px-6 py-3 sm:px-8 font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg ${
            activeTab === "lifeDept"
              ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-green-200"
              : "bg-white text-gray-700 hover:bg-green-50 border-2 border-gray-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Life @ BT IITH
          </div>
        </button>
      </div>

      {/* Tabs Content */}
      <div className="relative z-10">
        {activeTab === "announceEvents" && hasLatest && (
          <section className="space-y-8 animate-fadeIn">
            {/* Combined Announcements and Events Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 max-h-[400px] overflow-auto border border-white/30">
              <div className={scrollingPaused ? "" : "animate-scroll-faster"}>
                {hasLatestAnnouncements && (
                  <div className="mb-8">
                    <AnnouncementsModified onItemClick={handleItemClick} />
                  </div>
                )}
                {hasLatestEvents && (
                  <EventsModified onItemClick={handleItemClick} />
                )}
              </div>
            </div>
            {/* View All Links */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
              <Link
                to="/academics/admissions"
                className="w-full sm:w-auto text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                View Admissions →
              </Link>
              <Link
                to="/events"
                className="w-full sm:w-auto text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                View All Events →
              </Link>
            </div>
          </section>
        )}

       {activeTab === "lifeDept" && (
  <section className="animate-fadeIn">
    <h1 className="text-2xl md:text-3xl font-extrabold text-blue-800 mb-8 text-center bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
      Life @ BT IITH
    </h1>
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 border border-white/30">
      <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">
        {lifeAtDeptImages.map((image, index) => (
          <div key={index} className="group relative break-inside-avoid cursor-pointer" onClick={() => setSelectedImageIndex(index)}>
            <img
              src={image.src}
              alt={`Life at Department - Image ${index + 1}`}
              className="w-full h-auto object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
              <p className="text-white text-sm font-bold">View Image</p>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
        )}
      </div>

      {/* Image Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-50"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : lifeAtDeptImages.length - 1));
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all z-50"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex((prev) => (prev < lifeAtDeptImages.length - 1 ? prev + 1 : 0));
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all z-50"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="relative max-w-4xl max-h-[90vh] p-4">
            <img
              src={lifeAtDeptImages[selectedImageIndex].src}
              alt={`Life at Department - Image ${selectedImageIndex + 1}`}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
