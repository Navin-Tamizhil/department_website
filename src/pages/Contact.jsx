export default function Contact() {
  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white max-w-5xl w-full rounded-xl shadow-lg p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left column: Address + Contact Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-8 text-center md:text-left drop-shadow-sm">
            Contact Us
          </h1>

          {/* Address */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b border-indigo-300 pb-2">
              Address
            </h2>
            <address className="not-italic text-gray-700 leading-relaxed space-y-1 text-lg">
              <p>BT113, 1st Floor, </p>
              <p>Department of Biotechnology,</p>
              <p>BTBM Building,</p>
              <p>Indian Institute of Technology Hyderabad,</p>
              <p>Kandi, Sangareddy, Telangana – 502284</p>
              <p>India</p>
            </address>
          </div>

          {/* Email */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b border-indigo-300 pb-2">
              Email
            </h2>
            <p className="text-gray-700 text-lg space-y-2">
                      <a
                href="mailto:office@bt.iith.ac.in"
                className="inline-flex items-center gap-2 text-indigo-600 hover:underline"
              >
                <span>📧</span> office@bt.iith.ac.in
              </a>
            </p>
          </div>

          {/* Phone */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b border-indigo-300 pb-2">
              Phone
            </h2>
            <p className="text-gray-700 text-lg flex items-center gap-2">
              <span>📞</span> 040 23016150
            </p>
          </div>
        </div>

        {/* Right column: Google Maps iframe */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center md:text-left border-b border-indigo-300 pb-2">
            Location
          </h2>
              <iframe
  title="IIT Hyderabad Location"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d799.5218500623776!2d78.12352169662394!3d17.593791507251414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbf748fc9a57bd%3A0x3e768972fc2b6e10!2sBME-BT%20Academic%20Block!5e0!3m2!1sen!2sin!4v1761541980647!5m2!1sen!2sin"
  width="100%"
  height="350"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

        </div>
      </div>
    </section>
  );
}
