import React, { useContext } from "react";
import IdolList from "./IdolList";
import { IdolContext } from "../ContextApi/IdolContext";

function Content() {
  const { idolList, setIdolList } = useContext(IdolContext);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {idolList.map((idol) => (
        <IdolList
          key={idol._id}
          id={idol._id}
          title={idol.title}
          thumbnail={idol.thumbnail.image_url}
          price={idol.price}
        />
      ))}
    </div>
  );
}

export default Content;
