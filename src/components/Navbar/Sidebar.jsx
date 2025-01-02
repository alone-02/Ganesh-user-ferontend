import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <div className="fixed top-10 my-6 left-0 w-64 h-full bg-gray-800 text-white shadow-lg z-50">
        <div className="flex flex-col p-4 space-y-4">
          <Link
            to="/account"
            className="py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-600"
          >
            Categories
          </Link>
          <Link
            to="/price"
            className="py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-600"
          >
            Price
          </Link>
          <Link
            to="/reviews"
            className="py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-600"
          >
            Reviews
          </Link>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
