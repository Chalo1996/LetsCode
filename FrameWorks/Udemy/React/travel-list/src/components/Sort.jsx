import React, { useState } from "react";

function Sort({ sortValue, onSortItems, onClearList }) {
  return (
    <div>
      <div className='actions'>
        <select name='' id='' value={sortValue} onChange={onSortItems}>
          <option value='input'>Sort By input order</option>
          <option value='description'>Sort by description order</option>
          <option value='packed'>Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}

export default Sort;
