import React from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col items-center bg-white p-10 rounded-lg shadow-lg">
        <ShoppingCartOutlinedIcon
          className="text-gray-400"
          style={{ fontSize: "100px" }}
        />

        <h2 className="text-2xl font-semibold text-gray-700 mt-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mt-2 text-center">
          Looks like you haven’t added anything to your cart yet.
        </p>

        <button
          onClick={() => navigate("/explore")}
          className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;
