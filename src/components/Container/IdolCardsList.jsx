import React, { useContext, useEffect, useState } from "react";
import IdolCard from "./IdolCard";
import { IdolContext } from "../ContextApi/IdolContext";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";

function IdolCardsList() {
  const { idolList, setIdolList } = useContext(IdolContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    <div className="bg-white">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-1 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
      )}
    </div>
  );
}

export default IdolCardsList;
