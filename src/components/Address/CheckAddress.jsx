import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ErrorPage from "../404ErrorPage/ErrorPage";
const apiUrl = import.meta.env.VITE_BACK_END_URL;

function CheckAddress() {
  const navigate = useNavigate();
  const { pid } = useParams();
  const [loading, setLoading] = useState(false);
  const [addressDetails, setAddressDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const userId = Cookies.get("userId");
  const authToken = Cookies.get("authToken");
  //console.log("id :",userId, "token :",authToken);

  if (!userId || !authToken) {
    console.error("User is not authenticated. Missing token or userId.");
    return <ErrorPage />;
  }

  useEffect(() => {
    async function fetchAddress() {
      try {
        const response = await axios.post(
          `${apiUrl}/api/users/signup/address/${userId}`,

          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            credentials: "include",
          }
        );
        //console.log(response.data);
        if (response.status === 200) {
          if (Object.keys(response.data.address).length === 0) {
            if (!pid) {
              navigate(`/add_address`);
            }
            navigate(`/add_address/${pid}`);
          }
          console.log(Object.keys(response.data.address).length === 0);
          console.log(response.data);
          setAddressDetails(response.data.address);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchAddress();
  }, []);

  const handleEdit = () => {
    if (!pid) {
      console.log("Pid Is NULL");
      return navigate(`/add_address`);
    }
    navigate(`/add_address/${pid}`);
  };

  const handleCancel = () => {
    navigate(`/idoldetails/${pid}`);
  };

  const handleContinue = () => {
    if (!pid) {
      return navigate(`/place_order_cart`);
    }
    navigate(`/place_order/${pid}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-8">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center bg-blue-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Saved Address</h2>
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition duration-200">
            Edit
          </button>
        </div>

        {/* Address Details */}
        <div className="px-6 py-4 space-y-4 text-gray-700">
          <div>
            <span className="block font-semibold text-gray-800">Name:</span>
            <p className="text-gray-600">
              {addressDetails.firstName + " " + addressDetails.lastName}
            </p>
          </div>
          <div>
            <span className="block font-semibold text-gray-800">Email:</span>
            <p className="text-gray-600">{addressDetails.email}</p>
          </div>
          <div>
            <span className="block font-semibold text-gray-800">Phone:</span>
            <p className="text-gray-600">{addressDetails.phone}</p>
          </div>
          <div>
            <span className="block font-semibold text-gray-800">Street:</span>
            <p className="text-gray-600">{addressDetails.address1}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="block font-semibold text-gray-800">City:</span>
              <p className="text-gray-600">{addressDetails.city}</p>
            </div>
            <div>
              <span className="block font-semibold text-gray-800">State:</span>
              <p className="text-gray-600">{addressDetails.state}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="block font-semibold text-gray-800">Postal Code:</span>
              <p className="text-gray-600">{addressDetails.zip}</p>
            </div>
            <div>
              <span className="block font-semibold text-gray-800">Country:</span>
              <p className="text-gray-600">{addressDetails.country}</p>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-4 bg-gray-100 px-6 py-4 border-t border-gray-200">
          <button
            type="reset"
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-red-500 hover:text-white transition duration-200">
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            onClick={handleContinue}
            className={`px-6 py-2 text-sm font-medium rounded-md shadow-sm transition duration-200 ${
              loading
                ? "bg-blue-400 text-gray-200 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}>
            {!loading ? "Submit" : "Saving..."}
          </button>
        </div>
      </div>
    </div>
  );
}
export default CheckAddress;
