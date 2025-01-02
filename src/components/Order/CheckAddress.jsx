import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import OrderItems from "./OrderItems";
import Dialog from "../404ErrorPage/Dialog";
import ErrorPage from "../404ErrorPage/ErrorPage";

function CheckAddress() {
  const navigate = useNavigate();
  const {pid} = useParams();
  //const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setErrors] = useState({});
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
          `/api/users/signup/address/${userId}`,

          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        //console.log(response.data);
        if (response.status === 200) {
          if (Object.keys(response.data.address).length === 0) {
            navigate("/add_address");
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
    navigate(`/add_address/${pid}`);
  };

  const handleCancel = () => {
    navigate(`/idoldetails/${pid}`);
  };

  const handleContinue = () => {
    navigate(`/place_order/${pid}`);
  };



  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-700">Saved Address</h2>
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Edit
          </button>
        </div>

        {/* Address Details */}
        <div className="space-y-4 text-gray-600">
          <div>
            <span className="font-medium">Name:</span>{" "}
            {addressDetails.firstName + " " + addressDetails.lastName}
          </div>
          <div>
            <span className="font-medium">Email:</span> {addressDetails.email}
          </div>
          <div>
            <span className="font-medium">Phone:</span> {addressDetails.phone}
          </div>
          <div>
            <span className="font-medium">Street:</span> {addressDetails.address1}
          </div>
          <div>
            <span className="font-medium">City:</span> {addressDetails.city}
          </div>
          <div>
            <span className="font-medium">State:</span> {addressDetails.state}
          </div>
          <div>
            <span className="font-medium">Postal Code:</span> {addressDetails.zip}
          </div>
          <div>
            <span className="font-medium">Country:</span> {addressDetails.country}
          </div>
        </div>
      </div>
      <div className="flex items-end justify-end space-x-5 h-16">
        <button
          type="reset"
          onClick={handleCancel}
          className="w-2xl py-2 px-6 bg-gray-100 text-black rounded-md shadow-sm hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          onClick={handleContinue}
          className="w-2xl py-2 px-6 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          {!loading ? "Submit" : "Saving..."}
        </button>
      </div>
    </div>
  );

  /*

    <div className="bg-white px-4">
      <div className="bg-white border border-gray-300 rounded-lg py-20">
        <div className="max-w-2xl mx-auto p-2">
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">Address Details </h2>

          <div className="max-w-2xl border-gray-300 rounded-lg py-2">
            <div></div>
          </div>
        </div>
      </div>
    </div>*/
}
export default CheckAddress;
