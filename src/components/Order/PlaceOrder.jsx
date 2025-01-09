import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const PlaceOrder = () => {
  const { pid } = useParams();
  const [cartItems, setCartItems] = useState();

  const [idol, setIdol] = useState(null);

  const userId = Cookies.get("userId");
  const authToken = Cookies.get("authToken");
  //console.log("id :",userId, "token :",authToken);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(`https://ganesh-ecom-back-end.onrender.com/api/products/${pid}`);

        const { id, title, thumbnail, price } = response.data;
        //console.log(title);
        setIdol({
          id: id,
          title: title,
          thumbnail: thumbnail.image_url,
          price: price,
        });
        //console.log(idol);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAddress();
  }, [pid]);

  if (!idol) {
    return <p>Loading idol details...</p>;
  }

  const { id, title, thumbnail, price } = idol;

  const placeToOrder = async (productId) => {
    try {
      const response = await axios.post(
        `https://ganesh-ecom-back-end.onrender.com/api/products/orders/place_order`,
        {
          orderItem: [{ productId: productId, quantity: 1 }],
          user: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        alert(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //console.log(idolId);
  const shipping = 5.0;
  const taxes = 5.52;

  const total = price + shipping + taxes;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="space-y-4">
        <div key={id} className="flex items-center border rounded-lg p-4 shadow-sm">
          <img src={thumbnail} alt={title} className="w-16 h-16 object-cover rounded" />
          <div className="ml-4 flex-1">
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-gray-600">
              {"orange"} • {"2ft"}
            </p>
            <p className="text-sm font-medium">${price}</p>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={2}
              onChange={(e) => handleQuantityChange(idol.id, e.target.value)}
              className="border rounded p-1">
              {[1, 2, 3, 4, 5].map((qty) => (
                <option key={qty} value={qty}>
                  {qty}
                </option>
              ))}
            </select>
            <button
              onClick={() => handleRemoveItem(id)}
              className="text-red-500 hover:text-red-700">
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>${price}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Taxes</span>
          <span>${taxes.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>

      <button
        onClick={() => placeToOrder(id)}
        className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700">
        Confirm order
      </button>
    </div>
  );
};

export default PlaceOrder;
