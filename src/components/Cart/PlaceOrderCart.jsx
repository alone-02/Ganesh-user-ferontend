import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";
import CartItems from "./cartItems";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

const PlaceOrderCart = () => {
  const { pid } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);

  const [idol, setIdol] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const userId = Cookies.get("userId");
  const authToken = Cookies.get("authToken");

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await axios.get(
          `${apiUrl}/api/products/cart/${userId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            credentials: "include",
          }
        );
        // console.log(response.data);
        if (response.status === 200) {
          setCart(response.data);
          console.log(response.data);
        }

        //console.log("cart",cart.cartItems);
      } catch (err) {
        console.error(err.response.data);
      }
    }
    fetchCart();
  }, []);

  if (!cart) {
    return;
  }

  if (cart.cartItems.length === 0) {
    return <h1>Cart Is Empty</h1>;
  }

  //const [shippingCharge, setShippingCharge] = useState(5.00);
  //const [taxCharge, setTaxCharge] = useState(8.32);

  const shippingCharge = 10.0;
  const taxCharge = 5.0;

  const calculateTotal = (subtotal) => {
    return subtotal + shippingCharge + taxCharge;
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/products/orders/place_order_cart`,
        {
          orderItem: cart.cartItems,
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
        alert(response.data.message);
        navigate(`/orders`);
      }
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };
  ` `;
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold border-b pb-4 mb-6">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 rounded-lg ">
            {cart.cartItems.map((item) => (
              <CartItems
                key={item._id}
                id={item._id}
                title={item.product.title}
                thumbnail={item.product.thumbnail.image_url}
                price={item.product.price}
                quantity={item.quantity}
              />
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
              onClick={handleCheckout}
              className="w-full bg-indigo-600 text-white py-2 rounded-md mt-4 hover:bg-indigo-700">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderCart;
