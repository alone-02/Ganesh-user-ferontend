import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [selectedPrices, setSelectedPrices] = useState({
    low: false,
    medium: false,
    high: false,
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const userId = Cookies.get("userId");
  const authToken = Cookies.get("authToken");

  useEffect(() => {
    if (!userId || !authToken) {
      console.error("User is not authenticated. Missing token or userId.");
      return;
    }

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/products/category/fetch`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (response.status === 200) {
          setCategories(response.data);
          // Initialize category checkboxes state
          const initialCategoryState = response.data.reduce((acc, cat) => {
            acc[cat.id] = false;
            return acc;
          }, {});
          setSelectedCategories(initialCategoryState);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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

            {/* Filter by Categories */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Categories</h3>
              <div className="space-y-2 mt-4">
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    selectedCategory === "All"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-700"
                  }`}>
                  All
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      selectedCategory === cat.id
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-700"
                    }`}>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Customized Idol Link */}
            <Link
              to="/custom"
              className="block text-center py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Customized Idol
            </Link>
          </div>
        </div>
      )}

      {/* Sidebar Toggle Button */}
      {!isSidebarOpen && (
        <button
          className="fixed top-4 left-4 bg-blue-600 text-white p-2 rounded-md shadow-lg hover:bg-blue-700"
          onClick={() => setSidebarOpen(true)}>
          ☰ Open Sidebar
        </button>
      )}
    </>
  );
}

export default Sidebar;
