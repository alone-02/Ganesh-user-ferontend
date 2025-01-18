import React, { useEffect, useState } from "react";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";

const ContactUs = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div className="bg-gray-100 py-10">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 text-center mb-8">
            We’d love to hear from you! Whether you have a question, need assistance, or
            want to share your feedback, feel free to get in touch with us.
          </p>
          <form className="bg-white shadow-md rounded-lg p-6 space-y-4">
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
          <div className="mt-8 text-center text-gray-600">
            <p>Alternatively, you can reach us at:</p>
            <p className="font-medium">Email: support@example.com</p>
            <p className="font-medium">Phone: +91-1234567890</p>
            <p>Follow us on social media for updates and offers!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
