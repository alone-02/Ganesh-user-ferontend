import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import OrderItems from "./OrderItems";
import Dialog from "../404ErrorPage/Dialog";
import ErrorPage from "../404ErrorPage/ErrorPage";

function AddAddress() {
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
        console.log(response.data);
        if (response.status === 200) {
          if (!response.data.address) {
          }
          setAddressDetails(response.data.address);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchAddress();
  }, []);

 

  const handleChange = (event) => {
    //console.log(event.target.name, " , ",event.target.value);
    const { name, value } = event.target;
    console.log(value);

    setAddressDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateAddress = () => {
    let fNameError = "";
    let lNameError = "";
    let emailError = "";
    let phoneError = "";
    let address1Error = "";
    let cityError = "";
    let stateError = "";
    let zipError = "";
    let countryError = "";

    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^[0-9]{10}$/;
    console.log("trim", !addressDetails.firstName.trim());
    if (!addressDetails.firstName) {
      fNameError = "Please Enter your First Name.";
    }

    if (!addressDetails.lastName) {
      lNameError = "Please Enter your Last Name.";
    }

    if (!addressDetails.email || !emailRegex.test(addressDetails.email)) {
      emailError = "Please enter a valid email address.";
    }

    if (!addressDetails.phone || !phoneRegex.test(addressDetails.phone)) {
      phoneError = "Please enter a valid 10-digit phone number.";
    }

    if (!addressDetails.address1) {
      address1Error = "Please Enter your Address Line1.";
    }

    if (!addressDetails.city) {
      cityError = "Please Enter your City Name.";
    }

    if (!addressDetails.state) {
      stateError = "Please Enter your State Name.";
    }

    if (!addressDetails.zip) {
      zipError = "Please Enter your zip code.";
    }

    //if (!addressDetails.country) {
    //countryError = "Please select Country Name.";
    //}

    if (
      fNameError ||
      lNameError ||
      emailError ||
      phoneError ||
      address1Error ||
      cityError ||
      stateError ||
      zipError ||
      countryError
    ) {
      setErrors({
        fName: fNameError,
        lName: lNameError,
        email: emailError,
        phone: phoneError,
        address1: address1Error,
        city: cityError,
        state: stateError,
        zip: zipError,
        country: countryError,
      });
      return false;
    }
    return true;
  };

  const addAddress = async (event) => {
    event.preventDefault();
    //console.log("1",event);
    if (!validateAddress()) {
      return;
    }
    console.log("1", addressDetails);
    setLoading(!loading);
    try {
      const response = await axios.post(`/api/users/signup/add_address/${userId}`, {
        addressDetails,
        header: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log(response.data);
      if (response.status == 200) {
        alert("Address Added Successfully");
        navigate(`/place_order/${pid}`);
        return;
      }
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setAddressDetails({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address1: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    });
    setErrors({});
  };

  return (
    <div className="bg-white px-4">
      <div className="bg-white border border-gray-300 rounded-lg py-20 ">
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Address Information
          </h2>
          <p className="text-gray-600 mb-6">
            Use a permanent address where you can receive order.
          </p>
          <form className="space-y-6" method="post" onSubmit={addAddress}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  onChange={handleChange}
                  value={addressDetails.firstName}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {error.fName && (
                  <p className=" mx-auto text-red-500 text-sm">{error.fName}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={handleChange}
                  value={addressDetails.lastName}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {error.lName && (
                  <p className=" mx-auto text-red-500 text-sm">{error.lName}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={addressDetails.email}
                className="mt-1 block w-full max-w-sm border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {error.email && (
                <p className=" mx-auto text-red-500 text-sm">{error.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone No.
              </label>
              <input
                type="phone"
                id="phone"
                name="phone"
                onChange={handleChange}
                value={addressDetails.phone}
                className="mt-1 block w-full max-w-sm border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {error.phone && (
                <p className=" mx-auto text-red-500 text-sm">{error.phone}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="addressLine1"
                className="block text-sm font-medium text-gray-700">
                Address Line 1
              </label>
              <input
                type="text"
                id="address1"
                name="address1"
                onChange={handleChange}
                value={addressDetails.address1}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {error.address1 && (
                <p className=" mx-auto text-red-500 text-sm">{error.address1}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="addressLine2"
                className="block text-sm font-medium text-gray-700">
                Address Line 2 (optional)
              </label>
              <input
                type="text"
                id="address2"
                name="address2"
                onChange={handleChange}
                value={addressDetails.address2}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                onChange={handleChange}
                value={addressDetails.city}
                className="mt-1 block w-full max-w-sm border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {error.city && (
                <p className=" mx-auto text-red-500 text-sm">{error.city}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700">
                  State / Province
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  onChange={handleChange}
                  value={addressDetails.state}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {error.state && (
                  <p className=" mx-auto text-red-500 text-sm">{error.state}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-medium text-gray-700">
                  ZIP / Postal code
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  onChange={handleChange}
                  value={addressDetails.zip}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {error.zip && (
                  <p className=" mx-auto text-red-500 text-sm">{error.zip}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <select
                id="country"
                name="country"
                onChange={handleChange}
                value={addressDetails.country}
                className="mt-1 block w-full max-w-sm border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="" disabled>
                  Select Country
                </option>
                <option value="India">India</option>
              </select>
              {error.country && (
                <p className=" mx-auto text-red-500 text-sm">{error.country}</p>
              )}
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
                className="w-2xl py-2 px-6 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                {!loading ? "Submit" : "Saving..."}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
