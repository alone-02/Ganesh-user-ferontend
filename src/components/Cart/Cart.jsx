import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ErrorPage from "../404ErrorPage/ErrorPage";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";
import EmptyCart from "./EmptyCart";
const apiUrl = import.meta.env.VITE_BACK_END_URL;

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});

  const userId = Cookies.get("userId");
  const authToken = Cookies.get("authToken");

  if (!userId || !authToken) {
    console.error("User is not authenticated. Missing token or userId.");
    return <ErrorPage />;
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await axios.get(`${apiUrl}/api/products/cart/${userId}`, {
          headers: { Authorization: `Bearer ${authToken}` },
          credentials: "include",
        });

        if (response.status === 200) {
          console.log(response.data);
          setCart(response.data);

          const initialQuantities = {};
          response.data.cartItems.forEach((item) => {
            initialQuantities[item._id] = item.quantity;
          });
          setQuantities(initialQuantities);
        }
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    }
    fetchCart();
  }, []);

  const updateQuantity = async (id, action) => {
    try {
      const newQuantity =
        action === "increment" ? quantities[id] + 1 : Math.max(quantities[id] - 1, 1);

      setQuantities((prev) => ({ ...prev, [id]: newQuantity }));

      setCart((prevCart) => {
        const updatedCartItems = prevCart.cartItems.map((item) =>
          item._id === id ? { ...item, quantity: newQuantity } : item
        );

        const newTotalPrice = updatedCartItems.reduce(
          (acc, item) => acc + item.quantity * item.product.price,
          0
        );

        return { ...prevCart, cartItems: updatedCartItems, totalPrice: newTotalPrice };
      });

      await axios.put(
        `${apiUrl}/api/products/cart/update`,
        { userId, productId: id, action },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
    } catch (error) {
      console.error("Error updating quantity:", error.response?.data || error.message);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/products/cart/remove/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setCart((prevCart) => ({
        ...prevCart,
        cartItems: prevCart.cartItems.filter((item) => item._id !== id),
      }));
    } catch (error) {
      console.error("Error removing item:", error.response?.data || error.message);
    }
  };

  if (!cart) return <EmptyCart />;
  if (cart.cartItems.length === 0) return <EmptyCart />;

  const shippingCharge = 10.0;
  const taxCharge = 5.0;
  const calculateTotal = (subtotal) => subtotal + shippingCharge + taxCharge;

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-semibold border-b pb-4 mb-6">Shopping Cart</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 rounded-lg">
              {cart.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between border-b pb-4 mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.thumbnail.image_url}
                      alt={item.product.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="ml-4">
                      <h2 className="font-medium text-gray-700">{item.product.title}</h2>
                      <p className="text-sm text-gray-500">{"Orange"}</p>
                      <p className="text-sm text-gray-500">{"2 ft"}</p>
                      <p className="text-sm text-green-600">{"In stock"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center border rounded-md">
                      <button
                        className="px-3 py-1 text-gray-700"
                        onClick={() => updateQuantity(item._id, "decrement")}>
                        -
                      </button>
                      <span className="px-4 py-1">{quantities[item._id]}</span>
                      <button
                        className="px-3 py-1 text-gray-700"
                        onClick={() => updateQuantity(item._id, "increment")}>
                        +
                      </button>
                    </div>

                    <p className="text-gray-700 font-medium">₹ {item.product.price}</p>

                    <DeleteRoundedIcon
                      onClick={() => removeItem(item._id)}
                      className="ml-4 text-red-500 hover:text-red-700 cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="flex justify-between py-2 text-gray-700">
                <p>Subtotal</p>
                <p>₹{cart.totalPrice}</p>
              </div>
              <div className="flex justify-between py-2 text-gray-700">
                <p>
                  Shipping estimate
                  <span className="ml-1 text-gray-400 cursor-pointer" title="Flat rate">
                    ?
                  </span>
                </p>
                <p>₹{shippingCharge.toFixed(2)}</p>
              </div>
              <div className="flex justify-between py-2 text-gray-700">
                <p>
                  Tax estimate
                  <span className="ml-1 text-gray-400 cursor-pointer" title="8.4%">
                    ?
                  </span>
                </p>
                <p>₹{taxCharge.toFixed(2)}</p>
              </div>
              <div className="flex justify-between py-2 font-bold text-gray-900">
                <p>Order Total</p>
                <p>₹ {calculateTotal(cart.totalPrice)}</p>
              </div>
              <button
                onClick={() => navigate("/address")}
                className="w-full bg-indigo-600 text-white py-2 rounded-md mt-4 hover:bg-indigo-700">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
