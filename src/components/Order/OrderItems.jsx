function OrderItems({id,title, thumbnail,price,status,shipAddress, city,country,phone,}) {
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
          <p className="text-sm text-gray-700">
            You awake in a new, mysterious land. Mist hangs low along the distant
            mountains. What does it mean?
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 border-b pb-6 mb-6">
        <div>
          <h4 className="font-semibold text-sm">Delivery address</h4>
          <p className="text-sm text-gray-700">{shipAddress}</p>
            <p className="text-sm text-gray-700">{city}</p>
            <p className="text-sm text-gray-700">{country}</p>
        
        </div>
        <div>
          <h4 className="font-semibold text-sm">Shipping updates</h4>
          <p className="text-sm text-gray-700">f•••@example.com</p>
          <p className="text-sm text-gray-700">+91 {phone}</p>
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Edit
          </a>
        </div>
      </div>

     
    </>
  );
}

export default OrderItems;