import React, { useContext, useState } from "react";
import { IdolContext } from "../ContextApi/IdolContext";
import { useNavigate } from "react-router-dom";
//import "./content.css"

function IdolCard({ id, thumbnail, title, category, price }) {
  const { setIdolId, setIdolList } = useContext(IdolContext);

  const navigate = useNavigate();

  const feature = () => {
    setIdolId({
      id: id,
      thumbnail: thumbnail,
      title,
      price,
    });
    navigate(`/idoldetails/${id}`);
  };

  return (
    <div className="group relative">
      <div className="border border-gray-300 p-6 hover:shadow-lg transition duration-200 ease-in-out">
        <img
          src={thumbnail}
          alt="thumbnail"
          className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
          onClick={feature}
        />
        <div className="flex flex-col items-center mt-4">
          <h3
            className="font-semibold text-lg mt-4 text-gray-800 hover:text-gray-900 cursor-pointer"
            onClick={feature}>
            {title}
          </h3>

          <p className="mt-2 text-sm text-gray-500">{category}</p>
          <p className="font-bold text-lg text-gray-900">₹ {price}</p>
        </div>
      </div>
    </div>
  );
}

export default IdolCard;
