import React from "react";
import Order from "./Order";
const Footer = () => {
  const hour = new Date().getHours();
  const openHour = 0;
  const closeHour = 22;

  const isOpen = hour >= openHour && hour <= closeHour;

  console.log(isOpen);

  return (
    <footer className='footer'>
      {isOpen ? (
        <Order closeHour={closeHour}/>
      ) : (
        <p>Closed!</p>
      )}
    </footer>
  );
};

export default Footer;
