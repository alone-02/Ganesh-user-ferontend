import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import LoadingSpinner from "../404ErrorPage/LoadingSpinner";

const AboutUs = () => {
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
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">About Us</h1>
          <p className="text-lg text-gray-600 mb-4 text-justify">
            Welcome to <span className="font-bold">Ganesh Museum</span>, your one-stop
            destination for exquisite Ganesh idols crafted with devotion and artistry. We
            believe that Lord Ganesha, the harbinger of good fortune and remover of
            obstacles, deserves a special place in your home and heart.
          </p>
          <p className="text-lg text-gray-600 mb-4 text-justify">
            Our collection features a diverse range of Ganesh idols made from eco-friendly
            materials, intricately designed to cater to all preferences, whether you seek
            traditional sculptures or contemporary designs. Each idol is a masterpiece,
            symbolizing faith, positivity, and cultural heritage.
          </p>
          <p className="text-lg text-gray-600 mb-4 text-justify">
            At <span className="font-bold">Ganesh Museum</span>, customer satisfaction is
            our priority. We ensure quality craftsmanship, secure packaging, and timely
            delivery to make your shopping experience seamless and joyful. Whether it’s
            for Ganesh Chaturthi, home decor, or gifting, we are here to make your
            celebrations truly divine.
          </p>
          <p className="text-lg text-gray-600 text-center mt-6">
            Thank you for choosing us as a part of your spiritual journey. Let's celebrate
            faith and artistry together!
          </p>
          <div className="text-center mt-8">
            <Link
              to="/contact_us"
              className="inline-block bg-indigo-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-indigo-700 transition">
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUs;
