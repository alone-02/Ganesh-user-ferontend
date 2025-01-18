import React from "react";
import { useNavigate } from "react-router-dom";

function NoOrder() {
  const navigate = useNavigate();
  const handleClick = () => {
    // Navigate to the homepage or products page
    navigate("/explore"); // Replace with your desired route
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">No Orders Placed Yet!</h1>

        <button
          onClick={handleClick}
          className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition duration-200">
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default NoOrder;
