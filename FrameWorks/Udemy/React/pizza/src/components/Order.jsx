import React from "react";

const Order = ({ closeHour }) => {
  return (
    <div className='order'>
      <p>
        It is {new Date().toLocaleTimeString()} And We are available until{" "}
        {closeHour}:00 open!
      </p>
      <button className='btn'>Order</button>
    </div>
  );
};

export default Order;
