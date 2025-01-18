import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const apiUrl = "http://localhost:5000"; // Replace with your API base URL

function CustomForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState({
    suggestion: "",
    photo: null,
  });

  const userId = Cookies.get("userId");
  const authToken = Cookies.get("authToken");

  if (!userId || !authToken) {
    navigate("/login"); // Redirect to login page
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSuggestions((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSuggestion = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("suggestion", suggestions.suggestion);
    if (suggestions.photo) {
      formData.append("photo", suggestions.photo);
    }

    try {
      const response = await axios.post(
        `${apiUrl}/api/users/signup/add_suggestion/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
          credentials: "include",
        }
      );
      if (response.status === 200) {
        alert("Suggestion Added Successfully");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSuggestions({
      suggestion: "",
      photo: null,
    });
    document.getElementById("photo").value = null;
  };

  return (
    <div className="bg-white px-4">
      <div className="bg-white border border-gray-300 py-20">
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Add Suggestion
          </h2>
          <form className="space-y-6" onSubmit={addSuggestion}>
            {/* Textarea for Suggestion */}
            <div>
              <label
                htmlFor="suggestion"
                className="block text-sm font-medium text-gray-700"
              >
                Suggestion
              </label>
              <textarea
                id="suggestion"
                name="suggestion"
                rows="5"
                onChange={handleChange}
                value={suggestions.suggestion}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your suggestion here..."
              ></textarea>
            </div>

            {/* File Upload for Photo */}
            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700"
              >
                Photo (optional)
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={(e) =>
                  setSuggestions((prev) => ({ ...prev, photo: e.target.files[0] }))
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-end justify-end space-x-5">
              <button
                type="reset"
                onClick={handleCancel}
                className="py-2 px-6 bg-gray-100 text-black rounded-md hover:bg-red-500 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                {loading ? "Saving..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomForm;
