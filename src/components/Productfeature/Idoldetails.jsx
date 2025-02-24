import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { IdolContext } from "../ContextApi/IdolContext";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";
import { ShoppingCart, Heart, Minus, Plus } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import AlertBox from "../404ErrorPage/AlertBox";
import ErrorPage from "../404ErrorPage/ErrorPage";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function Idoldetails() {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const { pid } = useParams();
  const { idolList } = useContext(IdolContext);
  const [idol, setIdol] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [imageSrc, setImageSrc] = useState("");

  const userId = Cookies.get("userId");
  const authToken = Cookies.get("authToken");

  useEffect(() => {
    const fetchIdolDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/products/${pid}`);
        if (response.status === 200) {
          setIdol(response.data);
        }

        setImageSrc(response.data.thumbnail?.image_url || "fallback-image.jpg");
      } catch (err) {
        console.error("Error fetching idol details:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchIdolDetails();
  }, [pid]);

  const addToCart = async (productId) => {
    if (!userId || !authToken) {
      setAlert({
        type: "error",
        title: "Oops!",
        message: "Please Sign In",
      });
      //alert("Please Sign In");
      return navigate(`/login`);
    }
    try {
      const response = await axios.post(
        `${apiUrl}/api/products/cart/add_to_cart`,
        { cartItem: { productId, quantity }, user: userId },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setAlert({
        type: "success",
        title: "Successful!",
        message: response.data.message,
      });
      // alert(response.data.message);
    } catch (err) {
      setAlert({
        type: "error",
        title: "Oops!",
        message:
          err.response?.data?.message ||
          err.message ||
          "Something went wrong. Try again!",
      });
      console.error("Error adding to cart:", err.response?.data?.message || err.message);
    }
  };

  const buyNow = (productId) => {
    navigate(`/address/${productId}`);
  };

  const featureIdol = (id) => {
    navigate(`/idoldetails/${id}`);
  };

  if (loading) return <LoadingSpinner />;
  if (error || !idol) {
    return <ErrorPage />;
  }

  const { id, title, category, size, reachDisciption, price } = idol;

  return (
    <div className="flex flex-col items-center space-y-6 px-6 py-8 bg-gray-50 min-h-screen">
      {alert && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-[1000]">
          <AlertBox
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClick={() => setAlert(null)}
          />
        </div>
      )}
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg p-8 w-full max-w-6xl">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={imageSrc}
            alt={title}
            className="w-full md:w-96 rounded-lg shadow-md transform hover:scale-105 transition duration-300"
            loading="lazy"
            onError={() => setImageSrc("fallback-image.jpg")}
          />
        </div>

        <div className="w-full md:w-1/2 px-6 space-y-5">
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-500 text-sm">
            {category?.name} | Size: {size}
          </p>

          <div className="flex items-center space-x-3">
            <span className="text-3xl font-semibold text-red-600">₹ {price}</span>
          </div>

          <p className="text-sm text-red-500 font-semibold">Limited Stock Available</p>
          <p className="text-gray-700 leading-relaxed">{reachDisciption}</p>

          <div className="flex items-center space-x-4">
            <span className="font-semibold">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition">
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-6 py-2 text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => buyNow(id)}
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-lg hover:shadow-md transition">
              Buy Now
            </button>
            <button
              onClick={() => addToCart(id)}
              className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
            <button className="p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Similar Idols with Swiper Slider */}
      <div className="w-full max-w-6xl px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">You may also like</h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          navigation
          pagination={{ clickable: true }}>
          {idolList?.map((idol) => (
            <SwiperSlide key={idol.id}>
              <div
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
                onClick={() => featureIdol(idol.id)}>
                <img
                  src={idol.thumbnail?.image_url || "fallback-image.jpg"}
                  alt={idol.title}
                  className="w-full h-80 object-cover cursor-pointer transform hover:scale-105 transition duration-300"
                  loading="lazy"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">{idol.title}</h3>
                  <p className="text-gray-600 text-sm">₹{idol.price}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Idoldetails;
