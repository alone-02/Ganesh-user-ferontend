import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import axios from "axios";
import OrderItems from "./OrderItems";
import { Dialog } from "@mui/material";
import NoOrder from "./NoOrder";
const apiUrl = import.meta.env.VITE_BACK_END_URL;

function Order() {
  const [orderDetails, setOrderDetails] = useState([]);

  const userId = Cookies.get("userId");
  const authToken = Cookies.get("authToken");

  if (!userId || !authToken) {
    console.error("User is not authenticated. Missing token or userId.");
    return <Dialog open={true}>User not authenticated</Dialog>;
  }

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(`${apiUrl}/api/products/orders/fetch_orders/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          credentials: "include",
        });

        if (response.status === 200) {
          setOrderDetails(response.data);
          console.log(response.data);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    }

    fetchOrders();
  }, [userId, authToken]);

  if (orderDetails.length === 0) {
    return <NoOrder />;
  }

  const shippingCharge = 10.0;
  const taxCharge = 5.0;

  const calculateTotal = (subtotal) => {
    return subtotal + shippingCharge + taxCharge;
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Your Orders</h2>

        {orderDetails.map((order) => (
          <div key={order._id} className="mb-8 border-b pb-4">
            <div className="mb-4">
              <p className="text-sm text-gray-500">
                Order number {order._id} &middot;{" "}
                {new Date(order.orderDate).toLocaleDateString()}
              </p>
            </div>

            {order.orderItems.map((item) => (
              <OrderItems
                key={item._id}
                id={item._id}
                title={item.product.title}
                thumbnail={item.product.thumbnail.image_url}
                price={item.product.price}
                quantity={item.quantity}
                shipAddress={order.shipAddress}
              />
            ))}

            <div className="grid grid-cols-3 gap-6 mt-6">
              <div>
                <h4 className="font-semibold text-sm">Shipping Address</h4>
                <p className="text-sm text-gray-700">{order.shipAddress}</p>
                <p className="text-sm text-gray-700">{order.city}</p>
                <p className="text-sm text-gray-700">{order.country}</p>
              </div>

              <div>
                <h4 className="font-semibold text-sm">Payment Information</h4>
                <p className="text-sm text-gray-700">Visa ending with 4242</p>
                <p className="text-sm text-gray-700">Expires 02/24</p>
              </div>

              <div>
                <h4 className="font-semibold text-sm">Order Summary</h4>
                <div className="flex justify-between text-sm text-gray-700">
                  <p>Subtotal</p>
                  <p>₹ {order.totalPrice}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <p>Shipping</p>
                  <p>₹ {shippingCharge}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <p>Tax</p>
                  <p>₹ {taxCharge}</p>
                </div>
                <div className="flex justify-between font-semibold text-gray-900 mt-2">
                  <p>Order Total</p>
                  <p>₹ {calculateTotal(order.totalPrice)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
