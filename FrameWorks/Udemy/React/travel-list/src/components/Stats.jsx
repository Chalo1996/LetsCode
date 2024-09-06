import React from "react";

function Stats({ items }) {
  if (!items.length) {
    return (
      <p className='stats'>
        <em>Let's start packing🎯!</em>
      </p>
    );
  }
  const numItems = items.length;
  const numOfPackedItems = items.filter((item) => item.packed).length;
  const packedPercentage =
    numOfPackedItems === 0 || numItems === 0
      ? 0
      : Math.round((numOfPackedItems / numItems) * 100);
  let itemString = "";

  itemString = numItems === 1 ? "item" : "items";

  return (
    <footer className='stats'>
      <em>
        {packedPercentage === 100
          ? "You are all packed! Let's go ✈️!"
          : `💼You have ${numItems} ${itemString} on your list, and you already packed
        ${numOfPackedItems} (${packedPercentage}%)`}
      </em>
    </footer>
  );
}

export default Stats;
