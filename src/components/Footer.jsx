export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        
      
        <div>
          <h5 className="text-lg font-semibold text-white">Quick Links</h5>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="https://iith.ac.in/gian/" target="_blank" className="hover:text-indigo-400">GIAN</a></li>
            <li><a href="https://library.iith.ac.in/" target="_blank" className="hover:text-indigo-400">Library</a></li>
            <li><a href="https://iith.ac.in/computer-centre/" className="hover:text-indigo-400">Computer Centre</a></li>
           </ul>
        </div>

     
        <div>
          <h5 className="text-lg font-semibold text-white">Quick Links</h5>
          <ul className="mt-3 space-y-2 text-sm">
             <li><a href="https://www.iith.ac.in/bus_schedule/" className="hover:text-indigo-400">Bus Schedule</a></li>
            <li><a href="https://hospital.iith.ac.in/" target="_blank" className="hover:text-indigo-400">Medical Facilities</a></li>
            <li><a href="https://iith.ac.in/about/aboutiith/#reach" className="hover:text-indigo-400">Getting Here</a></li>
            <li><a href="https://cins.iith.ac.in/" target="_blank" className="hover:text-indigo-400">Campus Navigation</a></li>
          </ul>
        </div>


        <div>
          <h5 className="text-lg font-semibold text-white">Quick Links</h5>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="https://intranet.iith.ac.in" target="_blank" className="hover:text-indigo-400">Intranet</a></li>
            <li><a href="/emergency_contacts/" className="hover:text-indigo-400">Emergency Contacts</a></li>
             <li><a title="" href="/https://iith.ac.in/statutory-bodies/">Statutory Bodies (IBSC, IAEC &amp; IEC)</a></li>
          </ul>
        </div>
      </div>

      {/* Social & Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-sm text-gray-500">
        <div className="flex justify-between items-center flex-col md:flex-row">
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="https://www.facebook.com/iithyderabad/" target="_blank" className="hover:text-indigo-400">Facebook</a>
          </div>
        </div>
    \      </div>


      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Department of Biotechnology, IIT Hyderabad. All Rights Reserved.
      </div>
    </footer>
  );
};

