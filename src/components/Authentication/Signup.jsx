import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignUpData((prevData) => ({ ...prevData, [name]: value }));
  };

  function validate() {
    let firstNameError = "",
      lastNameError = "",
      emailError = "",
      phoneError = "",
      passwordError = "",
      confirmPasswordError = "";
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!signUpData.firstName.trim()) firstNameError = "First name is required.";
    if (!signUpData.lastName.trim()) lastNameError = "Last name is required.";
    if (!signUpData.email || !emailRegex.test(signUpData.email))
      emailError = "Enter a valid email.";
    if (!signUpData.phone || !phoneRegex.test(signUpData.phone))
      phoneError = "Enter a valid 10-digit phone number.";
    if (!signUpData.password || signUpData.password.length < 6)
      passwordError = "Password must be at least 6 characters.";
    if (signUpData.password !== signUpData.confirmPassword)
      confirmPasswordError = "Passwords do not match.";

    if (
      firstNameError ||
      lastNameError ||
      emailError ||
      phoneError ||
      passwordError ||
      confirmPasswordError
    ) {
      setErrors({
        firstName: firstNameError,
        lastName: lastNameError,
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
    if (!validate()) return;
    setLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/api/users/signup`, signUpData);
      if (response.status === 201) {
        alert(response.data.message);
        navigate("/login");
      }
    } catch (err) {
      alert(err.response?.data.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSignUpData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl border border-gray-500/20">
        <h2 className="text-4xl font-bold text-white text-center mb-6 tracking-wide">
          Sign Up
        </h2>

        <form className="space-y-6" onSubmit={signup}>
          {[
            { name: "firstName", placeholder: "First Name", icon: <FaUser /> },
            { name: "lastName", placeholder: "Last Name", icon: <FaUser /> },
            { name: "email", placeholder: "Email Address", icon: <FaEnvelope /> },
            { name: "phone", placeholder: "Mobile Number", icon: <FaPhone /> },
            {
              name: "password",
              placeholder: "Password",
              icon: <FaLock />,
              type: "password",
            },
            {
              name: "confirmPassword",
              placeholder: "Confirm Password",
              icon: <FaLock />,
              type: "password",
            },
          ].map(({ name, placeholder, icon, type = "text" }) => (
            <div key={name} className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 text-lg">
                {icon}
              </span>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={signUpData[name]}
                onChange={handleChange}
                className="w-full pl-12 p-3 bg-gray-900/50 text-white border border-gray-400/30 rounded-lg focus:ring-2 focus:ring-indigo-400 transition duration-300 outline-none focus:border-indigo-400"
              />
              {errors[name] && (
                <p className="text-red-400 text-sm mt-1">{errors[name]}</p>
              )}
            </div>
          ))}

          <div className="flex justify-between items-center">
            <button
              type="reset"
              onClick={resetForm}
              className="w-1/3 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-1/3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300 shadow-md">
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-indigo-400 hover:underline">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
