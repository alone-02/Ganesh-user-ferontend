import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

const PlaceOrder = () => {
  const { pid } = useParams();
  const navigate = useNavigate();

  const [idol, setIdol] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false); // State for button loading

  const userId = Cookies.get("userId");
  const authToken = Cookies.get("authToken");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/products/${pid}`);
        const { id, title, thumbnail, price } = response.data;

        setIdol({
          id,
          title,
          thumbnail: thumbnail.image_url,
          price,
        });
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [pid]);

  const checkoutPayment = async (productId) => {
    setOrderLoading(true); // Start loading

    try {
      const response = await axios.post(
        `${apiUrl}/api/products/orders/place_order`,
        {
          orderItem: [{ productId, quantity }],
          user: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          credentials: "include",
        }
      );

      if (response.status === 200) {
        alert("Payment Successful! Order placed.");
        navigate(`/orders`);
      }
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order. Please try again.");
    } finally {
      setOrderLoading(false); // Stop loading
    }
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(Number(newQuantity));
  };

  const shipping = 5.0;
  const taxes = 5.52;
  const total = idol ? idol.price * quantity + shipping + taxes : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500 text-lg">Loading idol details...</p>
      </div>
    );
  }

  if (error || !idol) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-500 text-lg">
          Failed to load idol details. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

        {/* Product Details */}
        <div className="flex items-center space-x-6 border-b pb-4 mb-4">
          <img
            src={idol.thumbnail}
            alt={idol.title}
            className="w-24 h-24 object-cover rounded-lg shadow"
          />
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-700">{idol.title}</h3>
            <p className="text-sm text-gray-500">Price: ₹{idol.price}</p>
            <div className="flex items-center mt-2 space-x-2">
              <span className="text-sm text-gray-600">Quantity:</span>
              <select
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                className="border rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {[1, 2, 3, 4, 5].map((qty) => (
                  <option key={qty} value={qty}>
                    {qty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Pricing Details */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">₹{(idol.price * quantity).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">₹{shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Taxes</span>
            <span className="font-medium">₹{taxes.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-4">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold">₹{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Buttons */}
        <button
          onClick={() => checkoutPayment(idol.id)}
          disabled={orderLoading}
          className={`w-full py-2 rounded-lg mt-6 text-lg font-medium transition ${
            orderLoading
              ? "bg-blue-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}>
          {orderLoading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              Placing Order...
            </div>
          ) : (
            "Confirm Order"
          )}
        </button>

        <button
          onClick={() => navigate(-1)}
          className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg mt-4 text-lg font-medium hover:bg-gray-200 transition">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
