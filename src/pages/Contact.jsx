export default function Contact() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      {/* Department Address */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Address</h2>
        <p className="text-gray-700">
          Department of Biotechnology<br />
          Indian Institute of Technology Hyderabad <br />
          Kandi, Sangareddy, Telangana – 502284 <br />
          India
        </p>
      </div>

  
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Email</h2>
        <p className="text-gray-700">
          📧{" "}
          <a
            href="mailto:hod_xyz@iith.ac.in"
            className="text-blue-600 hover:underline"
          >
            head@bt.iith.ac.in
          </a> <br/>
          📧{" "}
              <a
            href="mailto:hod_xyz@iith.ac.in"
            className="text-blue-600 hover:underline"
          >
            office@bt.iith.ac.in
          </a>
        </p>
      </div>

      {/* Phone Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Phone</h2>
        <p className="text-gray-700">📞 040 23016150</p>
      </div>

      {/* Google Maps Link */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Location</h2>
        <a
          href="https://maps.app.goo.gl/Ct8JZa1xgKULzFss9?g_st=awb"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          📍 View on Google Maps
        </a>
      </div>
    </div>
  );
}
