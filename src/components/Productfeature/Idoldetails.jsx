import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { IdolContext } from "../ContextApi/IdolContext";
import { Spinner } from "reactstrap"; // Importing a spinner component
const apiUrl = import.meta.env.VITE_BACK_END_URL;

function Idoldetails() {
  const navigate = useNavigate();
  const { pid } = useParams();
  const { idolList } = useContext(IdolContext);
  const [idol, setIdol] = useState(null);

  const userId = Cookies.get("userId");
  const authToken = Cookies.get("authToken");

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/products/${pid}`);
        const { id, title, thumbnail, price } = response.data;

        setIdol({
          id: id,
          title: title,
          thumbnail: thumbnail.image_url,
          price: price,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchAddress();
  }, [pid]);

  if (!idol) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner color="primary" /> {/* Using spinner for loading state */}
      </div>
    );
  }

  const { id, title, thumbnail, price } = idol;

  const addToCart = async (productId) => {
    try {
      if (!userId || !authToken) {
        alert("Please Sign In");
        navigate(`/login`);
        return;
      }

      const response = await axios.post(
        `${apiUrl}/api/products/cart/add_to_cart`,
        {
          cartItem: { productId: productId, quantity: 1 },
          user: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        alert(response.data.message);
      }
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  const addToOrder = async (productId) => {
    navigate(`/address/${productId}`);
  };

  const featureIdol = (id) => {
    navigate(`/idoldetails/${id}`);
  };

  return (
    <>
      <div className="flex flex-col items-center space-y-6 px-4 py-6 bg-gray-100">
        {/* Idol Details Section */}
        <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden max-w-4xl">
          <img src={thumbnail} alt={title} className="w-full md:w-1/2 object-cover" />
          <div className="p-6 flex flex-col space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <p className="text-lg text-gray-600">Price: ₹ {price}</p>
            <div className="flex space-x-4">
              <button
                onClick={() => addToOrder(id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Book Now
              </button>
              <button
                onClick={() => addToCart(id)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Similar Idols Slider */}
        <div className="w-full max-w-6xl max-h-6xl px-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Similar Idols</h2>
          <div className="flex overflow-x-auto space-x-6">
            {idolList.map((idol) => (
              <div
                key={idol._id}
                className="flex-shrink-0 w-60 bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
                <img
                  src={idol.thumbnail.image_url}
                  alt="thumbnail"
                  onClick={() => featureIdol(idol.id)}
                  className="w-full h-60 object-cover cursor-pointer"
                />
                <div className="p-4 flex flex-col space-y-2 text-center">
                  <h3
                    onClick={() => featureIdol(idol.id)}
                    className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-blue-600">
                    {idol.title}
                  </h3>
                  <p className="text-gray-600 text-sm">Price: ₹{idol.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Idoldetails;
