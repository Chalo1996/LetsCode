import React from "react";
import { useParams } from "react-router-dom";
import Photo from "./Photo";
import Comments from "./Comments";

function Single({ posts, comments, onAddComment, onDelete }) {
  const { id } = useParams();
  const post = posts.find((post) => post.id === Number(id));
  return (
    <div className='single-photo'>
      <Photo post={post} onDelete={onDelete} comments={comments} />
      <Comments comments={comments[id]} id={id} onAddComment={onAddComment} />
    </div>
  );
}

export default Single;
