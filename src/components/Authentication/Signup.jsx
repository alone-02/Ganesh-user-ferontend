import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, User, Smartphone, Lock, Key } from "lucide-react";
import AlertBox from "../404ErrorPage/AlertBox";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function Signup() {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});

  const [signUpData, setSignUpData] = useState({
    email: "",
    otp: "",
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignUpData((prevData) => ({ ...prevData, [name]: value }));
  };

  const sendOtp = async (event) => {
    event.preventDefault();
    if (!signUpData.email || !/\S+@\S+\.\S+/.test(signUpData.email)) {
      setErrors({ email: "Enter a valid email." });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/users/signup/send_otp`, {
        email: signUpData.email,
      });
      if (response.status === 200) {
        setOtpSent(true);
        setAlert({
          type: "success",
          title: "Successful!",
          message: response.data.message,
        });
        // alert("OTP sent to your email.");
      }
    } catch (err) {
      setAlert({
        type: "error",
        title: "Oops!",
        message: err.response?.data.message || "Failed to send OTP.",
      });
      //alert(err.response?.data.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (event) => {
    event.preventDefault();
    if (!otp) {
      setErrors({ otp: "Enter OTP." });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/users/signup/verify_otp`, {
        email: signUpData.email,
        otp,
      });
      if (response.status === 200) {
        setStep(2);
        setAlert({
          type: "success",
          title: "Successful!",
          message: response.data.message,
        });
        // alert("OTP verified. Proceed with signup.");
      }
    } catch (err) {
      setAlert({
        type: "error",
        title: "Oops!",
        message: err.response?.data.message || "Invalid OTP.",
      });
      // alert(err.response?.data.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = (event) => {
    event.preventDefault();
    setErrors({});
    let newErrors = {};

    if (step === 2) {
      if (!signUpData.firstName.trim()) newErrors.firstName = "First name is required.";
      if (!signUpData.lastName.trim()) newErrors.lastName = "Last name is required.";
    } else if (step === 3) {
      if (!signUpData.phone || !/^[0-9]{10}$/.test(signUpData.phone)) {
        newErrors.phone = "Enter a valid 10-digit phone number.";
      }
    } else if (step === 4) {
      if (!signUpData.password || signUpData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters.";
      }
      if (signUpData.password !== signUpData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStep(step + 1);
  };

  const signup = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/users/signup`, signUpData);
      if (response.status === 201) {
        setAlert({
          type: "success",
          title: "Successful!",
          message: response.data.message,
        });

        // alert(response.data.message);
        navigate("/login");
      }
    } catch (err) {
      setAlert({
        type: "error",
        title: "Oops!",
        message: err.response?.data.message || "Signup failed.",
      });
      //  alert(err.response?.data.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {alert && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-[1000]">
          <AlertBox
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClick={() => setAlert(null)}
          />
        </div>
      )}
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          {step === 1
            ? "Verify Email"
            : step === 2
            ? "Enter Name"
            : step === 3
            ? "Enter Mobile Number"
            : step === 4
            ? "Set Password"
            : "Sign Up"}
        </h2>

        <form
          className="space-y-5"
          onSubmit={
            step === 1 ? (otpSent ? verifyOtp : sendOtp) : step === 4 ? signup : nextStep
          }>
          {/* Step 1: Email & OTP */}
          {step === 1 && (
            <>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={signUpData.email}
                  onChange={handleChange}
                  className="w-full pl-12 p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {otpSent && (
                <div className="relative">
                  <Key
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full pl-12 p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                  {errors.otp && (
                    <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
                  )}
                </div>
              )}
            </>
          )}

          {/* Step 2: Name */}
          {step === 2 &&
            ["firstName", "lastName"].map((field) => (
              <div key={field} className="relative">
                <User
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={20}
                />
                <input
                  type="text"
                  name={field}
                  placeholder={field === "firstName" ? "First Name" : "Last Name"}
                  value={signUpData[field]}
                  onChange={handleChange}
                  className="w-full pl-12 p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            ))}

          {/* Step 3: Mobile */}
          {step === 3 && (
            <div className="relative">
              <Smartphone
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
              <input
                type="text"
                name="phone"
                placeholder="Mobile Number"
                value={signUpData.phone}
                onChange={handleChange}
                className="w-full pl-12 p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          )}

          {/* Step 4: Password */}
          {step === 4 &&
            ["password", "confirmPassword"].map((field) => (
              <div key={field} className="relative">
                <Lock
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={20}
                />
                <input
                  type="password"
                  name={field}
                  placeholder={field === "password" ? "Password" : "Confirm Password"}
                  value={signUpData[field]}
                  onChange={handleChange}
                  className="w-full pl-12 p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all">
            {loading
              ? step === 1
                ? "Sending OTP..."
                : "Processing..."
              : step === 4
              ? "Sign Up"
              : "Next"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
