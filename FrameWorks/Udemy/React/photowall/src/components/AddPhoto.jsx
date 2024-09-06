import React from "react";
import { useNavigate } from "react-router-dom";
import { addPost, uploadImageToStorage, addPostToDB } from "../redux/actions";
import { useDispatch } from "react-redux";

function AddPhoto() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const imageLink = e.target.elements.link.value;
    const description = e.target.elements.description.value;
    const post = { id: Number(new Date()), imageLink, description };

    if (imageLink && description) {
      dispatch(addPostToDB(post));
      dispatch(addPost(post))
      navigate("/");
    }
  };

  return (
    <div>
      <div className='form'>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='link' name='link' />
          <input type='text' placeholder='Description' name='description' />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddPhoto;
