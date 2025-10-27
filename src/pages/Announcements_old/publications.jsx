import React, { useState, useEffect } from 'react';
import { ChevronRight, Calendar, FileText, Users, BookOpen, Menu, X, ExternalLink, ArrowUp } from 'lucide-react';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('news');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const newsItems = [
    { id: 1, title: "", advt: "", isNew: true },
    { id: 2, title: "", isNew: true },
    { id: 3, title: "", advt: "", isNew: true },
   
  ];

  const events = [
    { id: 1, title: "", subtitle: "", date: "", isNew: true },
    { id: 2, title: "", subtitle: "", date:"", isNew: true },
    { id: 3, title: "", subtitle: "", date: "", isNew: true },
  
  ];

  const publications = [
    { 
      id: 1, 
      authors: "", 
      title: "",
      journal: "", 
      year: "",
      doi: ""
    },
    { 
      id: 2, 
      authors: "", 
      title: "",
      journal: "", 
      year: "",
      doi: ""
    },

  ];

export default function Achievements() {
  return (
    <div className="p-6">
      {/* Main Content Tabs */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 bg-white rounded-2xl p-2 shadow-lg">
            {['news', 'events', 'publications'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[500px]">
            {activeTab === 'news' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Latest News & Recruitment</h3>
                {newsItems.map(item => (
                  <div key={item.id} className="group p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 border border-gray-100 hover:border-blue-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h4>
                        {item.advt && (
                          <p className="text-sm text-blue-600 mt-1">{item.advt}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {item.isNew && (
                          <span className="px-2 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full animate-pulse">
                            NEW
                          </span>
                        )}
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                ))}
                <button className="mt-4 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  View All Announcements
                </button>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Upcoming Events</h3>
                {events.map(event => (
                  <div key={event.id} className="group p-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 border border-gray-100 hover:border-purple-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                          {event.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{event.subtitle}</p>
                        {event.date && (
                          <p className="text-sm text-purple-600 mt-2 font-medium">{event.date}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {event.isNew && (
                          <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs rounded-full animate-pulse">
                            NEW
                          </span>
                        )}
                        <Calendar className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                      </div>
                    </div>
                  </div>
                ))}
                <button className="mt-4 w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  View All Events
                </button>
              </div>
            )}

            {activeTab === 'publications' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Recent Publications</h3>
                {publications.map(pub => (
                  <div key={pub.id} className="group p-4 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300 border border-gray-100 hover:border-green-200">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">{pub.authors}</p>
                      <h4 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                        {pub.title}
                      </h4>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 italic">{pub.journal}, {pub.year}</p>
                        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                          DOI <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="mt-4 w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  View All Publications
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}