import React from "react";
import Pizza from "./Pizza";
import pizzaData from "../../data";

const Menu = () => {
  const pizzas = pizzaData;
  // const pizzas = [];
  return (
    <main className='menu'>
      <h2>Our Menu</h2>

      {pizzas.length > 0 ? (
        <>
          <p>
            Authentic Italian Cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>

          <ul className='pizzas'>
            {pizzas.map((pizza, index) => (
              <Pizza key={index} pizzaObj={pizza} />
            ))}
          </ul>
        </>
      ) : (
        <h1>Sorry, we are out of stock!</h1>
      )}
    </main>
  );
};

export default Menu;
