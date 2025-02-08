function OrderItems({
  id,
  title,
  thumbnail,
  price,
  shipAddress,
  status,
  country,
  phone,
  reachDescription,
}) {
  //console.log(shipAddress.email);
  return (
    <>
      <div className="flex items-center gap-6 mb-8">
        <img
          className="w-32 h-32 object-cover rounded-lg"
          src={thumbnail}
          alt="Product"
        />
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500 mb-2">₹ {price}</p>
          <p className="text-sm text-gray-700">{reachDescription}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 border-b pb-6 mb-6">
        <div>
          <h4 className="font-semibold text-sm">Delivery address</h4>
          <p className="text-sm text-gray-700">{shipAddress.address1}</p>
          <p className="text-sm text-gray-700">{shipAddress.city}</p>
          <p className="text-sm text-gray-700">{shipAddress.state}</p>
          <p className="text-sm text-gray-700">{shipAddress.zip}</p>
          <p className="text-sm text-gray-700">{shipAddress.country}</p>
        </div>
        <div>
          <h4 className="font-semibold text-sm">Shipping updates</h4>
          <p className="text-sm text-gray-700">{shipAddress.email}</p>
          <p className="text-sm text-gray-700">+91 {shipAddress.phone}</p>
        </div>
      </div>
    </>
  );
}

export default OrderItems;
