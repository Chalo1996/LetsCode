import React, {useState} from "react";
import { v4 as uuidv4 } from "uuid";

function Form({onAddItem}) {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const newItem = { description, quantity, packed: false, id: uuidv4() };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) return;

    onAddItem(newItem);
  };

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your 😎 trip?</h3>
      <select
        name='item'
        id='item'
        value={quantity}
        onChange={handleQuantityChange}
      >
        {Array.from({ length: 20 }, (_, index) => index + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type='text'
        placeholder='Item...'
        value={description}
        onChange={handleDescription}
      />
      <button>Add</button>
    </form>
  );
}

export default Form;
