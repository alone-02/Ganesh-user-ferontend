import React from "react";

function PopupDialog({ message, type, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className={`p-6 rounded-lg shadow-lg text-center max-w-sm w-full transition-all duration-300 ${
          type === "success" ? "bg-green-500" : "bg-red-500"
        }`}>
        <p className="text-white text-lg">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-300 transition">
          OK
        </button>
      </div>
    </div>
  );
}

export default PopupDialog;
