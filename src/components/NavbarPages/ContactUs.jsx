import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";

const ContactUs = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div className="bg-gray-100 py-10 min-h-screen flex items-center justify-center">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row gap-10">
          {/* Left Side: Contact Details & Google Map */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 mb-6">
              We’d love to hear from you! Whether you have a question, need help, or want
              to give feedback, feel free to get in touch.
            </p>

            {/* Contact Details */}
            <div className="space-y-4 text-gray-700">
              <p className="flex items-center gap-3 font-medium">
                <FaMapMarkerAlt className="text-red-600" />
                Shree Idol Booking, Near Bus Stand, Gadhinglaj, Maharashtra, India
              </p>

              <p className="flex items-center gap-3 font-medium">
                <FaEnvelope className="text-blue-500" />
                support@idolbooking.com
              </p>

              <p className="flex items-center gap-3 font-medium">
                <FaPhoneAlt className="text-green-600" />
                +91-9876543210
              </p>
            </div>

            {/* Google Map Embed - Gadhinglaj Location */}
            <div className="mt-6">
              <iframe
                className="w-full h-56 rounded-lg shadow-md"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.181579681119!2d74.34453427524233!3d16.228718584636008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc0f5dd25b65d0f%3A0x8f5e4d309e680eb3!2sGadhinglaj%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1707450678752"
                allowFullScreen
                loading="lazy"
                title="Gadhinglaj Location"></iframe>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="w-full md:w-1/2">
            <form className="bg-gray-50 shadow-md rounded-lg p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Write your message here..."></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-indigo-700 transition">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
