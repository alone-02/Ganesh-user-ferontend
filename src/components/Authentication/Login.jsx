import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../ContextApi/AuthContext";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";
import PopupDialog from "./PopupDialog";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function Login() {
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [popup, setPopup] = useState({ open: false, message: "", type: "" });

  const navigate = useNavigate();
  const { setSignIn } = useContext(AuthContext);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  function dataInput(event) {
    const { name, value } = event.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  }

  function validate() {
    let emailError = "";
    let passwordError = "";

    const emailRegex = /\S+@\S+\.\S+/;

    if (!loginData.email || !emailRegex.test(loginData.email)) {
      emailError = "Please enter a valid email address.";
    }

    if (!loginData.password || loginData.password.length < 6) {
      passwordError = "Password must be at least 6 characters long.";
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return false;
    }

    setErrors({ email: "", password: "" });
    return true;
  }

  const login = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setLoadingButton(true);
    setLoading(true);

    try {
      const response = await axios.post(
        `${apiUrl}/api/users/login/authenticate`,
        loginData
      );

      if (response.status === 200) {
        setPopup({ open: true, message: "Login successful!", type: "success" });

        const { token, userId } = response.data;
        Cookies.set("authToken", token, { secure: true, sameSite: "Strict" });
        Cookies.set("userId", userId, { secure: true, sameSite: "Strict" });

        if (!Cookies.get("userId") || !Cookies.get("authToken")) {
          setPopup({
            open: true,
            message: "Something went wrong. Try again!",
            type: "error",
          });
          return;
        }

        setSignIn(true);
        setTimeout(() => navigate("/explore"), 1500);
      }
    } catch (err) {
      setPopup({
        open: true,
        message: err.response?.data?.message || "Something went wrong. Try again!",
        type: "error",
      });
    } finally {
      setLoading(false);
      setLoadingButton(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-600 to-blue-400">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white/10 backdrop-blur-lg shadow-lg rounded-lg p-8 max-w-md w-full text-white">
          <h2 className="text-3xl font-bold text-center mb-6">Sign in to your account</h2>

          <form onSubmit={login} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white">
                Email address
              </label>
              <input
                name="email"
                type="email"
                value={loginData.email}
                onChange={dataInput}
                required
                autoComplete="email"
                className="w-full mt-2 p-3 rounded-lg bg-white/20 backdrop-blur-md text-white border border-white/30 placeholder-gray-300 focus:ring-2 focus:ring-blue-300 outline-none"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white">Password</label>
              <input
                name="password"
                type="password"
                value={loginData.password}
                onChange={dataInput}
                required
                autoComplete="current-password"
                className="w-full mt-2 p-3 rounded-lg bg-white/20 backdrop-blur-md text-white border border-white/30 placeholder-gray-300 focus:ring-2 focus:ring-blue-300 outline-none"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="text-sm text-center">
              <Link to="/forgot_password" className="text-blue-200 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition-all duration-200 font-semibold text-white shadow-md disabled:opacity-50"
              disabled={loadingButton}>
              {loadingButton ? "Logging In..." : "Log In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-200 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      )}

      {popup.open && (
        <PopupDialog
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup({ ...popup, open: false })}
        />
      )}
    </div>
  );
}

export default Login;
