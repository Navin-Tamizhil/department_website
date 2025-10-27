// src/pages/Announcements/Admissions.jsx
import React from "react";
import { admissions } from "./admissionData";
import { CalendarDays, ExternalLink } from "lucide-react";


export default function Admissions() {
  return (
    <div className="space-y-16 px-6 md:px-12 py-8">

      {/* Admissions Section */}
     <section>
             <h2 className="text-3xl font-bold text-indigo-700 border-b-4 border-indigo-600 pb-3 mb-8">
               Admissions
             </h2>
             <div className="space-y-6">
               {admissions.map((item) => (
                 <div
                   key={item.id}
                   className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition"
                 >
                   <div className="flex flex-col gap-3">
                     {/* Title + Date */}
                     <div>
                       <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                         {item.title}
                             {item.isNew && (
                               <span
                                 className="
                                   px-3 py-1 
                                   rounded-full 
                                   font-bold text-white text-xs 
                                   bg-gradient-to-r from-pink-500 via-yellow-400 to-red-600 
                                   animate-glowPulse 
                                   inline-flex items-center gap-1
                                   select-none
                                 "
                                 style={{ animation: "glowPulse 2.5s ease-in-out infinite" }}
                               >
                                 <svg
                                   xmlns="http://www.w3.org/2000/svg"
                                   className="h-4 w-4 animate-bounce"
                                   fill="none"
                                   viewBox="0 0 24 24"
                                   stroke="currentColor"
                                   strokeWidth={2}
                                 >
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                 </svg>
                                 OPEN
                               </span>
                             )}
     
                       
                       </h3>
                       <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                         <CalendarDays className="w-4 h-4 text-gray-400" />
                         {item.date}
                       </p>
                     </div>
     
                     {/* Links (Brochure, Results, etc.) */}
                     {item.links && item.links.length > 0 && (
                       <div className="flex flex-wrap gap-3 mt-2">
                         {item.links.map((lnk, idx) => (
                           <a
                             key={idx}
                             href={lnk.brouchere}  // changed from lnk.url to lnk.brouchere
                             target="_blank"
                             rel="noopener noreferrer"
                             className="flex items-center gap-1 px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg hover:bg-indigo-100 hover:text-indigo-900 text-sm font-medium transition"
                           >
                             {lnk.label}
                             <ExternalLink className="w-4 h-4" />
                           </a>
                         ))}
                       </div>
                     )}
                   </div>
                 </div>
               ))}
             </div>
           </section>

      
    </div>
  );
}