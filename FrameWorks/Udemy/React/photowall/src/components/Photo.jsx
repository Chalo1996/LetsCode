import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Photo({ post, onDelete, comments }) {
  const navigate = useNavigate();
  const id = Number(post.id);

  return (
    <figure className='figure'>
      <Link to={`/single/${post.id}`}>
        <img className='photo' src={post.imageLink} alt={post.description} />
      </Link>

      <figcaption>
        <p>{post.description}</p>
      </figcaption>
      <div className='button-container'>
        <button
          className='button'
          onClick={() => {
            onDelete(post.id);
            navigate("/");
          }}
        >
          Remove
        </button>
        <Link className='button' to={`/single/${post.id}`}>
          <div className='comment-count'>
            <div className='speech-bubble'></div>
            {comments[id] ? comments[id].length : 0}
          </div>
        </Link>
      </div>
    </figure>
  );
}

export default Photo;
