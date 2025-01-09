import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { IdolContext } from "../ContextApi/IdolContext";
import IdolCard from "../Container/IdolCard";
const apiUrl = import.meta.env.VITE_BACK_END_URL;
function Idoldetails() {
  const navigate = useNavigate();
  const { pid } = useParams();
  const { idolList } = useContext(IdolContext);
  const [idol, setIdol] = useState(null);

  const userId = Cookies.get("userId");
  const authToken = Cookies.get("authToken");
  //console.log("id :",userId, "token :",authToken);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/products/${pid}`);

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

  const addToCart = async (productId) => {
    try {
      if (!userId || !authToken) {
        console.error("User is not authenticated. Missing token or userId.");
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
          credentials: "include", 
        }
      );

      if (response.status === 200) {
        alert(response.data.message);
      }
      const result = response.data;
      console.log(result);
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  const addToOrder = async (productId) => {
    console.log(productId);
    navigate(`/address/${productId}`);
    //return <PlaceOrder pId={productId}/>;
  };

  return (
    <>
      <div className="flex flex-col items-center space-y-6 px-4 py-6 bg-gray-100">
        <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden max-w-4xlure">
          <img
            src={thumbnail}
            alt={title}
            className="w-full md:w-1/2 object-cover"
            style={{ maxHeight: "500px" }}
          />
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

        <div className="w-full max-w-4xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Similar Idols</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {idolList.map((idol) => (
              <IdolCard
                key={idol._id}
                id={idol._id}
                title={idol.title}
                thumbnail={idol.thumbnail.image_url}
                price={idol.price}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Idoldetails;
