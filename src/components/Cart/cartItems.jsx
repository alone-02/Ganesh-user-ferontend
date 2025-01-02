import React, { useState } from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

function CartItems({ id, title, thumbnail, price, quantity }) {
  const [cartQuantity, setCartQuantity] = useState(quantity);

  

  const updateQuantity = (event) => {
    console.log(event.target.name, " , ", event.target.value);
    const { name, value } = event.target;
    if(cartQuantity)
    name === "plus"
      ? setCartQuantity(cartQuantity + 1)
      : setCartQuantity(cartQuantity - 1);
  };

  return (
    <div key={id} className="flex items-center justify-between border-b pb-4 mb-6">
      <div className="flex items-center gap-4">
        <img src={thumbnail} alt={title} className="w-20 h-20 object-cover rounded-lg" />

        <div className="ml-4">
          <h2 className="font-medium text-gray-700">{title}</h2>
          <p className="text-sm text-gray-500">{"Orange"}</p>
          <p className="text-sm text-gray-500">{"2 ft"}</p>
          <p
            className={`text-sm ${
              "In stock" === "In stock" ? "text-green-600" : "text-gray-600"
            }`}>
            {"In stock"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center border rounded-md">
          <button
            className="px-3 py-1 text-gray-700"
            name="minus"
            onClick={updateQuantity}>
            -
          </button>
          <span className="px-4 py-1" onClick={updateQuantity}>
            {cartQuantity}
          </span>
          <button
            className="px-3 py-1 text-gray-700"
            name="plus"
            onClick={updateQuantity}>
            +
          </button>
        </div>

        <p className="text-gray-700 font-medium">₹ {price}</p>

        <DeleteRoundedIcon
          onClick={() => removeItem(id)}
          className="ml-4 text-red-500 hover:text-red-700"
        />
      </div>
    </div>
  );
}

export default CartItems;
