import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../ContextApi/AuthContext";
import Dialog from "../404ErrorPage/Dialog";
import SigninPopUp from "../404ErrorPage/SigninPopUp";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";
const apiUrl = import.meta.env.VITE_BACK_END_URL;
//import "./login.css";
//import LoginIcon from "@mui/icons-material/Login";

function Login() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);
  const navigate = useNavigate();

  const { signIn, setSignIn } = useContext(AuthContext);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loadingButton, setLoadingButton] = useState(false);

  function dataInput(event) {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

    if (!validate()) {
      return;
    }
    //console.log("Login");
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/users/login/authenticate`,
        loginData
      );

      if (response.status === 200) {
        // console.log("User Found");
        alert(response.data.message);

        const { token, userId } = response.data;

        //console.log(userId);
        Cookies.set("authToken", token, { secure: true, sameSite: "Strict" });
        Cookies.set("userId", userId, { secure: true, sameSite: "Strict" });

        const userIdCookie = Cookies.get("userId");
        const authTokenCookie = Cookies.get("authToken");
        //console.log(userId);

        if (!userIdCookie || !authTokenCookie) {
          console.error("User is not authenticated. Missing token or userId.");
          alert("Something went wrong. Please try again.");
        }

        setSignIn(true);
        navigate("/explore");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
      console.error("Error ", err.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="./login" onSubmit={login} method="POST" className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={loginData.email}
                    onChange={dataInput}
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      to="/forgot_password"
                      className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={dataInput}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  disabled={loadingButton}>
                  {loadingButton ? "Logging In" : "Log In"}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Don't have an account?
              <Link
                to="/signup"
                className="block text-blue-500 text-sm mb-4 text-center hover:underline">
                Sign up
              </Link>
            </p>
          </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
