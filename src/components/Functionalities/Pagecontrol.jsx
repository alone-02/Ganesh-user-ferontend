import React, { useState } from "react";
import { Link } from "react-router-dom";
//import "./pagecontrol.css";

function Pagecontrol() {
  let [page, setPage] = useState(1);

  function pageChange(event) {
    event.target.name === "next"
      ? setPage((prev) => prev + 1)
      : setPage((prev) => prev - 1);
    console.log(event.target.name);
  }

  return (
    <div className="pagecontrol">
      <button className="button" name="prev" onClick={() => pageChange(event)} disabled={page === 1}>
        <Link className="prev" to="./page/${page}">Prev</Link>
      </button>

      <Link className="pageLink" to="./page/${page}">{page}</Link>
      
      <button className="button" name="next" onClick={() => pageChange(event)}>
        <Link className="next" to="./page/${page}">Next</Link>
      </button>
    </div>
  );
}

export default Pagecontrol;
