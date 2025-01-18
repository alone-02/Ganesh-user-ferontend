import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [selectedCategories, setSelectedCategories] = useState({
    small: false,
    medium: false,
    large: false,
  });

  const [selectedPrices, setSelectedPrices] = useState({
    low: false,
    medium: false,
    high: false,
  });

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleCategoryChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCategories((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handlePriceChange = (event) => {
    const { name, checked } = event.target;
    setSelectedPrices((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {isSidebarOpen && (
        <div className="fixed top-10 my-6 left-0 w-64 h-full bg-gray-800 text-white shadow-lg z-50">
          <div className="flex flex-col p-4 space-y-4">
            <button
              className="self-end text-gray-400 hover:text-red focus:outline-none"
              onClick={closeSidebar}>
              ✖ Close
            </button>

            <div className="mt-6">
              <h3 className="text-lg font-semibold">Filter by Size</h3>
              <div className="space-y-2 mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="small"
                    checked={selectedCategories.small}
                    onChange={handleCategoryChange}
                    className="mr-2 rounded focus:ring focus:ring-gray-600"
                  />
                  Small
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="medium"
                    checked={selectedCategories.medium}
                    onChange={handleCategoryChange}
                    className="mr-2 rounded focus:ring focus:ring-gray-600"
                  />
                  Medium
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="large"
                    checked={selectedCategories.large}
                    onChange={handleCategoryChange}
                    className="mr-2 rounded focus:ring focus:ring-gray-600"
                  />
                  Large
                </label>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold">Filter by Price</h3>
              <div className="space-y-2 mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="low"
                    checked={selectedPrices.low}
                    onChange={handlePriceChange}
                    className="mr-2 rounded focus:ring focus:ring-gray-600"
                  />
                  Low
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="medium"
                    checked={selectedPrices.medium}
                    onChange={handlePriceChange}
                    className="mr-2 rounded focus:ring focus:ring-gray-600"
                  />
                  Medium
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="high"
                    checked={selectedPrices.high}
                    onChange={handlePriceChange}
                    className="mr-2 rounded focus:ring focus:ring-gray-600"
                  />
                  High
                </label>
              </div>
            </div>
            <Link
              to="/custom"
              className="py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-600">
              Customized Idol
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
