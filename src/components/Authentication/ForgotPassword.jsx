import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Key } from "lucide-react";
import AlertBox from "../404ErrorPage/AlertBox";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function ForgotPassword() {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [signUpData, setSignUpData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignUpData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validate = () => {
    let newErrors = {};
    switch (step) {
      case 1:
        if (!signUpData.email.match(/\S+@\S+\.\S+/)) {
          newErrors.email = "Please enter a valid email address.";
        }
        break;
      case 2:
        if (!signUpData.otp) {
          newErrors.otp = "OTP is required.";
        }
        break;
      case 3:
        if (!signUpData.password || signUpData.password.length < 6) {
          newErrors.password = "Password must be at least 6 characters long.";
        }
        if (signUpData.password !== signUpData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match.";
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      switch (step) {
        case 1:
          const response_email = await axios.post(`${apiUrl}/api/users/login/send_otp`, {
            email: signUpData.email,
          });
          setAlert({
            type: "success",
            title: "Successful!",
            message: response_email.data.message,
          });

          setStep(2);
          break;
        case 2:
          const response_OTP = await axios.post(`${apiUrl}/api/users/login/verify_otp`, {
            email: signUpData.email,
            otp: signUpData.otp,
          });
          setAlert({
            type: "success",
            title: "Successful!",
            message: response_OTP.data.message,
          });
          setStep(3);
          break;
        case 3:
          const response_resetPassword = await axios.put(
            `${apiUrl}/api/users/login/resetPassword`,
            {
              email: signUpData.email,
              password: signUpData.password,
            }
          );
          setAlert({
            type: "success",
            title: "Successful!",
            message: response_resetPassword.data.message,
          });
          // alert("Password updated successfully!");
          navigate("/login");
          break;
        default:
          break;
      }
    } catch (err) {
      setAlert({
        type: "error",
        title: "Oops!",
        message: err.response?.data?.message || "Something went wrong. Please try again.",
      });
      // alert(err.response?.data?.message || "Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
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
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          {step === 1 && "Forgot Password"}
          {step === 2 && "Verify OTP"}
          {step === 3 && "Reset Password"}
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {(() => {
            switch (step) {
              case 1:
                return (
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                      size={20}
                    />
                    <input
                      type="email"
                      name="email"
                      value={signUpData.email}
                      onChange={handleChange}
                      placeholder="Enter Email Address"
                      className="w-full pl-12 p-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                );

              case 2:
                return (
                  <div className="relative">
                    <Key
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                      size={20}
                    />
                    <input
                      type="text"
                      name="otp"
                      value={signUpData.otp}
                      onChange={handleChange}
                      placeholder="Enter OTP"
                      className="w-full pl-12 p-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                      required
                    />
                    {errors.otp && (
                      <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
                    )}
                  </div>
                );

              case 3:
                return (
                  <>
                    <div className="relative">
                      <Lock
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                        size={20}
                      />
                      <input
                        type="password"
                        name="password"
                        value={signUpData.password}
                        onChange={handleChange}
                        placeholder="Enter New Password"
                        className="w-full pl-12 p-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                        required
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                      )}
                    </div>

                    <div className="relative">
                      <Lock
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                        size={20}
                      />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={signUpData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm New Password"
                        className="w-full pl-12 p-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                        required
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </>
                );

              default:
                return null;
            }
          })()}

          <div className="flex justify-between items-center mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="w-1/3 bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition-all shadow-md">
                Back
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-1/3 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-3 rounded-lg transition-all shadow-md">
              {loading ? "Processing..." : step === 3 ? "Update" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
