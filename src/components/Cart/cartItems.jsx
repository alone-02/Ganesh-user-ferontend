import React from "react";

function CartItems({ id, title, thumbnail, price, quantity }) {
  
  const handleQuantityChange = (index, quantity) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = quantity;
    setItems(updatedItems);
  };

  return (
    <>
      <div key={id} className="border rounded-md p-4">
        <div className="flex items-center">
          <img
            src={thumbnail}
            alt={title}
            className="w-24 h-24 object-contain mr-4"
          />
          <div>
            <h2 className="text-lg font-medium">{title}</h2>
            <p className="text-gray-500">{"orange"}</p>
            <p className="text-gray-500">Size: {"2 ft"}</p>
            <p className="text- gray-500">Price: ${price}</p>
            <p className="text-gray-500">
              Quantity:
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  handleQuantityChange(index, parseInt(e.target.value))
                }
                className="border rounded w-16 text-center"
                min="1"
              />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItems;
