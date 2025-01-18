import React, { useState } from "react";

function SigninPopUp() {
  const [showPopup, setShowPopup] = useState(true);

  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 text-center">
        <h2 className="text-2xl font-semibold text-green-600">Sign-In Successful!</h2>
        <p className="mt-2 text-gray-600">
          Welcome back! You have successfully signed in.
        </p>
        <button
          onClick={handleClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition duration-200">
          Close
        </button>
      </div>
    </div>
  );
}

export default SigninPopUp;
