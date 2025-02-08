import React, { useContext } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { AuthContext } from "../ContextApi/AuthContext";
//import "./Dropdown.css";
//import "./heading.css";
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { BsBoxSeam } from "react-icons/bs";
import { MdPersonAdd } from "react-icons/md";

function AccountDropdown() {
  const { setSignIn } = useContext(AuthContext);

  const handleLogout = () => {
    try {
      Cookies.remove("authToken");
      Cookies.remove("userId");
      setSignIn(false);
    } catch (err) {
      console.error("Error logging out: ", err);
    }
  };

  return (
    <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-fade-in">
      <ul className="py-2">
        <li>
          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition duration-200">
            <FaUserCircle size={20} className="text-blue-600" />
            Profile
          </Link>
        </li>
        <li>
          <Link
            to="/orders"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition duration-200">
            <BsBoxSeam size={20} className="text-green-600" />
            Orders
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-100 transition duration-200">
            <IoMdLogOut size={20} />
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
}

export default AccountDropdown;
