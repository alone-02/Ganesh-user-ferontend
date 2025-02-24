import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../ContextApi/AuthContext";
import AccountDropdown from "./AccountDropdown";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useContext(AuthContext);

  const isLogin = location.pathname === "/login";
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    navigate("/explore");
  };

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center cursor-pointer" onClick={handleClick}>
            <img className="h-10" src="Logo.webp" alt="Logo" />
            <span className="text-xl font-bold ml-3">Ganesh Museum</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-400">
              Home
            </Link>
            <Link to="/about_us" className="hover:text-blue-400">
              About Us
            </Link>
            <Link to="/contact_us" className="hover:text-blue-400">
              Contact Us
            </Link>
            <ShoppingCartIcon
              className="cursor-pointer hover:text-blue-400"
              onClick={() => navigate("/cart")}
            />

            {!signIn ? (
              <Link
                to={isLogin ? "/signup" : "/login"}
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                {isLogin ? "Sign Up" : "Login"}
              </Link>
            ) : (
              <div ref={dropdownRef} className="relative">
                <AccountCircleOutlinedIcon
                  className="cursor-pointer"
                  onClick={toggleDropdown}
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-md">
                    <AccountDropdown />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <ShoppingCartIcon
              className="cursor-pointer mr-4"
              onClick={() => navigate("/cart")}
            />
            <AccountCircleOutlinedIcon
              className="cursor-pointer mr-4"
              onClick={() => navigate("/profile")}
            />
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md hover:bg-gray-700">
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 p-4 space-y-2">
          <Link to="/" className="block hover:text-blue-400">
            Home
          </Link>
          <Link to="/about_us" className="block hover:text-blue-400">
            About Us
          </Link>
          <Link to="/contact_us" className="block hover:text-blue-400">
            Contact Us
          </Link>
          {!signIn && (
            <Link
              to="/login"
              className="block bg-blue-600 text-center py-2 rounded hover:bg-blue-700">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
