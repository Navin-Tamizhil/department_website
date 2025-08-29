const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Department Info */}
        <div>
          <h2 className="text-lg font-semibold text-white">Department of Biotechnology</h2>
          <p className="text-sm mt-2">
            Indian Institute of Technology Hyderabad <br />
            Excellence in Research, Innovation & Teaching.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white">Connect With Us</h2>
          <div className="flex justify-center md:justify-start space-x-6 mt-3">
            <a href="#" className="hover:text-indigo-400 transition">LinkedIn</a>
            <a href="#" className="hover:text-indigo-400 transition">Twitter</a>
            <a href="#" className="hover:text-indigo-400 transition">Facebook</a>
          </div>
        </div>

        {/* Alumni */}
        <div>
          <h2 className="text-lg font-semibold text-white">Notable Alumni</h2>
          <ul className="mt-3 space-y-1 text-sm">
            <li><a href="#" className="hover:text-indigo-400"></a></li>
            <li><a href="#" className="hover:text-indigo-400"></a></li>
            <li><a href="#" className="hover:text-indigo-400"></a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Department of Biotechnology, IIT Hyderabad. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
