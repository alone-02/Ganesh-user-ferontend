import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // Track the current step

  const [signUpData, setSignUpData] = useState({
    email: "",
    otp: "",
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
        case 1: // Send OTP
          await axios.post(`${apiUrl}/api/users/login/send_otp`, {
            email: signUpData.email,
          });
          setStep(2);
          break;

        case 2: // Verify OTP
          await axios.post(`${apiUrl}/api/users/login/verify_otp`, {
            email: signUpData.email,
            otp: signUpData.otp,
          });
          setStep(3);
          break;

        case 3: // Reset Password
          await axios.put(`${apiUrl}/api/users/login/resetPassword`, {
            email: signUpData.email,
            password: signUpData.password,
          });
          alert("Password updated successfully!");
          navigate("/login");
          break;

        default:
          break;
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          {step === 1 && "Forgot Password"}
          {step === 2 && "Verify OTP"}
          {step === 3 && "Reset Password"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {(() => {
            switch (step) {
              case 1: // Email Input
                return (
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={signUpData.email}
                      onChange={handleChange}
                      placeholder="Enter Email Address"
                      className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300"
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                );

              case 2: // OTP Input
                return (
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      name="otp"
                      value={signUpData.otp}
                      onChange={handleChange}
                      placeholder="Enter OTP"
                      className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300"
                      required
                    />
                    {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}
                  </div>
                );

              case 3: // Reset Password
                return (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-900">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={signUpData.password}
                        onChange={handleChange}
                        placeholder="Enter New Password"
                        className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300"
                        required
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={signUpData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm New Password"
                        className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300"
                        required
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
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
                className="w-1/3 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                Back
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-1/3 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              {loading ? "Processing..." : step === 3 ? "Update" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
