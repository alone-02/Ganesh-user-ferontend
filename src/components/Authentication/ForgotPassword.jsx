import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [signUpData, setSignUpData] = useState({
    email: "",
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
    let emailError = "";
    let passwordError = "";
    let confirmPasswordError = "";

    const emailRegex = /\S+@\S+\.\S+/;

    if (!signUpData.email || !emailRegex.test(signUpData.email)) {
      emailError = "Please enter a valid email address.";
    }
    if (!signUpData.password || signUpData.password.length < 6) {
      passwordError = "Password must be at least 6 characters long.";
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      confirmPasswordError = "Passwords do not match.";
    }

    if (emailError || passwordError || confirmPasswordError) {
      setErrors({
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return false;
    }

    return true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;
    setLoading(true);

    const { email, password } = signUpData;
    const payload = { email, password };

    try {
      console.log("Request payload:", payload);
      const response = await axios.put(
        `${apiUrl}/api/users/login/resetPassword`,
        payload
      );

      console.log("Server response:", response);
      if (response.status === 200) {
        alert("Password updated successfully!");
        navigate("/login");
      }
    } catch (err) {
      console.error("Error occurred:", err);
      const errorMessage =
        err.response?.data?.message || "Something went wrong. Please try again.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSignUpData({
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Reset Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter Email Address"
              value={signUpData.email}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              New Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter New Password"
              value={signUpData.password}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              required
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-900">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm New Password"
              value={signUpData.confirmPassword}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="reset"
              onClick={resetForm}
              className="w-1/3 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-1/3 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
