import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import { AuthContext } from "../ContextApi/AuthContext";
import AccountDropdown from "./AccountDropdown";
import Sidebar from "./Sidebar";
//import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const { signIn } = useContext(AuthContext);
 // console.log(signIn);

  const isHome = location.pathname === "/";
  const isLogin = location.pathname === "/login";
  // console.log(isLogin);

  const home = () => navigate("/");
  const login = () => navigate("/login");
  const signup = () => navigate("/signup");
  const cart = () => navigate("/cart");

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
    console.log("Dropdown toggled :", !isDropdownOpen);
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleToggle = (event) => {
      if (!event.target.closest(".toggleoption_div")) {
        setDropdownOpen(false);
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleToggle);
    return () => document.removeEventListener("mousedown", handleToggle);
  }, []);

  return (
    <nav className="bg-gray-900">
      <div className="max-w-8xl px-2 sm:px-6 lg:px-4">
        <div className="flex items-center justify-between h-16">
          {/*!isHome &&*/}
          <div className="relative flex items-center">
            <MenuIcon
              onClick={toggleSidebar}
              className="inline-block mr-8 text-white cursor-pointer"
              style={{fontSize:"2.2rem"}}
            />

            {isSidebarOpen && <Sidebar />}
          

          <div className="flex items-center">
            <img className="h-8" src="Logo.webp" alt="Logo" />
            <span className="text-white text-2xl font-semibold ml-2">Ganesh Museum</span>
          </div>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              About Us
            </Link>
            <Link
              to="/gallery"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Gallery
            </Link>
            <Link
              to="/contact"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Contact Us
            </Link>

            <ShoppingCartIcon
              className="text-white hover:text-blue-500 cursor-pointer"
              onClick={cart}
              style={{fontSize:"2.2rem"}}
            />

            {!signIn ? (
              <Link
                to={isLogin ? "/signup" : "/login"}
                className="bg-gray-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium">
                {isLogin ? (
                  <>
                    Sign Up <LogoutIcon />{" "}
                  </>
                ) : (
                  <>
                    Login <LoginIcon />
                  </>
                )}
              </Link>
            ) : (
              <div className="relative">
                <AccountCircleOutlinedIcon
                  onClick={toggleDropdown}
                  className="text-white cursor-pointer text-lg"
                  style={{fontSize:"2.2rem"}}
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md">
                    <AccountDropdown />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}>
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            About Us
          </Link>
          <Link
            to="/gallery"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Gallery
          </Link>
          <Link
            to="/contact"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Contact Us
          </Link>

          {!signIn && (
            <Link
              to="/login"
              className="bg-blue-600 text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
