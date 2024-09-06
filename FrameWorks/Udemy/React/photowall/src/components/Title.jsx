import React from "react";
import { Link } from "react-router-dom";

function Title() {
  return (
    <div>
      <Link to={"/"}>
        <h1 className='title'>Photowall</h1>
      </Link>
    </div>
  );
}

export default Title;
