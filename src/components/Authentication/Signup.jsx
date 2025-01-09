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

    if (
      nameError ||
      emailError ||
      phoneError ||
      passwordError ||
      confirmPasswordError
    ) {
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg"
        method="post"
        onSubmit={signup}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sign Up!
        </h2>

        <input
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter Name"
          name="name"
          
          onChange={handleChange}
          value={signUpData.name}
          required
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Enter Email Address"
          name="email"
          value={signUpData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="tel"
          placeholder="Enter Mobile No."
          name="phone"
          value={signUpData.phone}
          onChange={handleChange}
          required
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        <input
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Enter Password"
          name="password"
          value={signUpData.password}
          onChange={handleChange}
          required
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        <input
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={signUpData.confirmPassword}
          onChange={handleChange}
          required
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}

        <div className="flex justify-between items-center mt-6">
          <button
            className="w-1/3 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            type="reset"
            onClick={resetForm}
          >
            Cancel
          </button>

          <button
            className="w-1/3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </form>
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
