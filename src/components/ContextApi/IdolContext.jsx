import axios from "axios";
import React, { useState, createContext } from "react";
import { useEffect } from "react";
const IdolContext = createContext();

function IdolProvider({ children }) {
  const [idolList, setIdolList] = useState([]);
  const [idolId, setIdolId] = useState({
    id: "",
    title: "",
    thumbnail: "",
    price: "",
  });

  useEffect(() => {
    const fetchIdol = async () => {
      try {
        const response = await axios.get("/api/products");
        const result = response.data;
        setIdolList(result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchIdol();
  }, []);

  return (
    <IdolContext.Provider value={{ idolList, setIdolList, idolId, setIdolId }}>
      {children}
    </IdolContext.Provider>
  );
}

export { IdolContext, IdolProvider };
