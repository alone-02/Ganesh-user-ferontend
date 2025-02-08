import React, { useContext, useEffect, useState } from "react";
import IdolCard from "./IdolCard";
import { IdolContext } from "../ContextApi/IdolContext";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";

function IdolCardsList() {
  const { idolList } = useContext(IdolContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a minimum loading time
    const timer = setTimeout(() => {
      if (idolList && idolList.length > 0) {
        setLoading(false);
      }
    }, 3000); // Ensures loading for at least 3 seconds

    // Cleanup timeout on component unmount
    return () => clearTimeout(timer);
  }, [idolList]);

  return (
    <div className="bg-white">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {idolList?.map((idol) => (
              <IdolCard
                key={idol._id}
                id={idol._id}
                title={idol.title}
                thumbnail={idol.thumbnail?.image_url}
                category={idol.category.name}
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
