import React, { useContext, useState } from "react";
import { IdolContext } from "../ContextApi/IdolContext";
import { useNavigate } from "react-router-dom";
//import "./content.css"

function IdolList({ id, thumbnail, title, price }) {
  const { setIdolId, setIdolList } = useContext(IdolContext);

  const navigate = useNavigate();

  const feature = () => {
    setIdolId({
      id: id,
      title: title,
      thumbnail: thumbnail,
      price: price,
    });
    navigate(`/idoldetails`);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <div className="relative">
        <img
          src={thumbnail}
          alt="thumbnail"
          className="w-full h-48 object-cover cursor-pointer"
          onClick={() => feature(id)}
        />
      </div>

      <div className="p-4 flex flex-col space-y-3">
        <h3
          onClick={feature}
          className="text-lg font-bold text-gray-800 cursor-pointer hover:text-blue-600"
        >
          {title}
        </h3>
        <p className="text-gray-600">Price: ₹{price}</p>
        <button
          onClick={feature}
          className="py-2 px-4 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
        >
          View Details &gt;&gt;
        </button>
      </div>
    </div>
  );
}

export default IdolList;
