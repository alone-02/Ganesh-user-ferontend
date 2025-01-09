import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ErrorPage from "../404ErrorPage/ErrorPage";
const apiUrl = import.meta.env.VITE_BACK_END_URL;

function UserProfile() {
  const [profile, setProfile] = useState(null);

  const userId = Cookies.get("userId");
  const authToken = Cookies.get("authToken");

  if (!userId || !authToken) {
    console.error("User is not authenticated. Missing token or userId.");
    return <ErrorPage />;
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/users/login/userlist/${userId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.status === 200) {
          setProfile(response.data);
        }
        //console.log(response.data.name);
        //console.log(profile.user_name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    console.error("User is not authenticated. Missing token or userId.");
    return <ErrorPage />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md w-80 p-6 text-center">
        <img
          className="w-24 h-24 rounded-full mx-auto"
          src="https://via.placeholder.com/150"
          alt="Profile"
        />
        <h2 className="text-xl font-semibold text-gray-800 mt-4">{profile.user_name}</h2>
        <h2 className="text-xl font-semibold text-gray-800 mt-4">{profile.email}</h2>
        <h2 className="text-xl font-semibold text-gray-800 mt-4">{profile.phone}</h2>
      </div>
    </div>
  );
}

export default UserProfile;
