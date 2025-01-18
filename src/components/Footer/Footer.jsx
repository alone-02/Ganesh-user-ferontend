import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start space-y-12 md:space-y-0">
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-3xl font-bold">Shree Ganesh Museum</h1>
          <p className="mt-4 text-gray-400 text-center md:text-left">
            Celebrating the heritage and divinity of Lord Ganesha through art and culture.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-16">
          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#home"
                  className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="#about"
                  className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="#services"
                  className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="#contact"
                  className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Resources</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#faq"
                  className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="#support"
                  className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
              aria-label="Facebook"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
              aria-label="Twitter"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} Shree Ganesh Museum. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
