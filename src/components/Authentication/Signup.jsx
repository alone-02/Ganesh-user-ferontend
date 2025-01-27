import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import "./signup.css";
const apiUrl = import.meta.env.VITE_BACK_END_URL;

function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function validate() {
    let nameError = "";
    let emailError = "";
    let phoneError = "";
    let passwordError = "";
    let confirmPasswordError = "";

    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!signUpData.name.trim()) {
      nameError = "Name is required.";
    }

    if (!signUpData.email || !emailRegex.test(signUpData.email)) {
      emailError = "Please enter a valid email address.";
    }

    if (!signUpData.phone || !phoneRegex.test(signUpData.phone)) {
      phoneError = "Please enter a valid 10-digit phone number.";
    }

    if (!signUpData.password || signUpData.password.length < 6) {
      passwordError = "Password must be at least 6 characters long.";
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      confirmPasswordError = "Passwords do not match.";
    }

    if (nameError || emailError || phoneError || passwordError || confirmPasswordError) {
      setErrors({
        name: nameError,
        email: emailError,
        phone: phoneError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return false;
    }

    return true;
  }

  const signup = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/api/users/signup`, signUpData);

      if (response.status === 201) {
        console.log(response.data);
        alert(response.data.message);
        navigate("/login");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
      console.error("Error ", err.response);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSignUpData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign up for an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" method="post" onSubmit={signup}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter Name"
                value={signUpData.name}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email Address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Email Address"
                value={signUpData.email}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
              Mobile Number
            </label>
            <div className="mt-2">
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter Mobile No."
                value={signUpData.phone}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter Password"
                value={signUpData.password}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-900">
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={signUpData.confirmPassword}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              className="w-1/3 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              type="reset"
              onClick={resetForm}>
              Cancel
            </button>

            <button
              className="w-1/3 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              type="submit"
              disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

/*

          <textarea
            id="address"
            name="address"
            rows={2}
            className="input_singup"
            placeholder="Enter Address"
            required
            value={signUpData.address}
            onChange={dataInput}
          ></textarea>*/
