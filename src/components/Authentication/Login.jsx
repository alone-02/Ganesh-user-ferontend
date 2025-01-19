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

  useEffect (() => {
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
    } finally {
      setLoadingButton(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <form
          method="post"
          action="./login"
          onSubmit={login}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Log In</h2>
          <div className="mb-4">
            <input
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              name="email"
              placeholder="Enter Email"
              value={loginData.email}
              onChange={dataInput}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <input
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="password"
              placeholder="Enter Password"
              value={loginData.password}
              onChange={dataInput}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <Link
            to="/signup"
            className="block text-blue-500 text-sm mb-4 text-center hover:underline">
            Don't have an account? Sign up
          </Link>

          <button
            className={`w-full p-3 rounded-md text-white ${
              loadingButton ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
            type="submit"
            disabled={loadingButton}>
            {loadingButton ? "Logging In" : "Log In"}
          </button>
        </form>
      )}
    </div>
  );
}

export default Login;
