import React, { useState, useEffect, useRef } from "react";
import { Lightbulb, Rocket, Gem } from "lucide-react";
import { AnnouncementsModified } from "./Home_announcements.jsx";
import { EventsModified } from "./Home_events.jsx";

export default function Home() {
  const images = [
    "/images/home_background.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
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
      <section className="relative h-[75vh] overflow-hidden rounded-3xl shadow-lg bg-gray-100 mx-14 my-10 px-10 py-6">
        <img
          src={images[current]}
          alt="Welcome"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 rounded-3xl"
        />

        {current === 0 && (
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-6 animate-fadeIn rounded-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
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
          className="absolute left-6 bottom-6 bg-white/80 hover:bg-white rounded-full p-3 shadow-md"
        >
          ◀
        </button>
        <button
          onClick={() =>
            setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
          }
          className="absolute right-6 bottom-6 bg-white/80 hover:bg-white rounded-full p-3 shadow-md"
        >
          ▶
        </button>
      </section>

      {/* ---------------- Message from HOD ---------------- */}
      <section className="w-full bg-gradient-to-r from-indigo-50 via-white to-purple-50 rounded-3xl ">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-gray-800">
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
               className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover rounded-3xl border-4 border-white shadow-2xl transform group-hover:scale-105 group-hover:rotate-1 transition duration-500"
                  />
            </div>
          </div>

          {/* Right - Message */}
          <div className="lg:col-span-2 text-gray-700 leading-relaxed text-justify space-y-6 px-2">
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
        style={{ margin: "40px 60px", padding: "20px 40px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
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

      {/* ---------------- Status Bar ---------------- */}
      {scrollingPaused && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-yellow-100 border border-yellow-400 rounded-lg px-4 py-2 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="text-sm text-yellow-800">
              Scrolling paused – viewing: <strong>{selectedItem}</strong>
            </span>
            <button
              onClick={resumeScrolling}
              className="px-3 py-1 bg-yellow-500 text-white rounded text-xs font-semibold hover:bg-yellow-600"
            >
              Resume
            </button>
          </div>
        </div>
      )}

      {/* ---------------- Announcements & Events ---------------- */}
      <div className="mx-10 my-10 px-10 py-6">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Announcements */}
          <div>
            <h1 className="text-2xl font-extrabold text-indigo-800 mb-4 text-center">
              Announcements
            </h1>
            <div className="bg-white rounded-2xl shadow-lg p-6 max-h-[500px] overflow-hidden relative">
              <div className={scrollingPaused ? "" : "animate-scroll-slow"}>
                <AnnouncementsModified onItemClick={handleItemClick} />
                <div className="mt-4">
                  <AnnouncementsModified onItemClick={handleItemClick} />
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <a
                href="/announcements"
                className="inline-block bg-indigo-600 text-white font-semibold px-5 py-2 rounded-xl shadow-md hover:bg-indigo-700 transition"
              >
                View All Announcements →
              </a>
            </div>
          </div>

          {/* Events */}
          <div>
            <h1 className="text-2xl font-extrabold text-green-800 mb-4 text-center">
              Events
            </h1>
            <div className="bg-white rounded-2xl shadow-lg p-6 max-h-[500px] overflow-hidden relative">
              <div className={scrollingPaused ? "" : "animate-scroll-fast"}>
                <EventsModified onItemClick={handleItemClick} />
                <div className="mt-4">
                  <EventsModified onItemClick={handleItemClick} />
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <a
                href="/events"
                className="inline-block bg-green-600 text-white font-semibold px-5 py-2 rounded-xl shadow-md hover:bg-green-700 transition"
              >
                View All Events →
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* ---------------- Scroll CSS ---------------- */}
      <style jsx>{`
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
        /* Pause on hover */
        .animate-scroll-slow:hover,
        .animate-scroll-fast:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}