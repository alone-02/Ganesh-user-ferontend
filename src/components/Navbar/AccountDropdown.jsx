import React, { useContext } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { AuthContext } from "../ContextApi/AuthContext";
//import "./Dropdown.css";
//import "./heading.css";

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
    <div className="relative">
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 toggleoption_div">
        <Link
          to="/profile"
          className="block px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white rounded-t-md"
        >
          Profile
        </Link>
        <Link
          to="/orders"
          className="block px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white"
        >
          Orders
        </Link>
        <Link
          to="/login"
          className="block px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white rounded-b-md"
          onClick={handleLogout}
        >
          Log Out
        </Link>
      </div>
    </div>
  );
}

export default AccountDropdown;
