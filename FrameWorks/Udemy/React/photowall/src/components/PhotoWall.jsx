import React from "react";
import { Link } from "react-router-dom";
import Photo from "./Photo";

function PhotoWall({ posts, onDelete, comments }) {

  return (
    <div>
      <Link className='addIcon' to='/AddPhoto'></Link>
      <div className='photoGrid'>
        {posts
          .sort((firstPost, secondPost) => secondPost.id - firstPost.id)
          .map((post) => (
            <Photo
              key={post.id}
              comments={comments}
              post={post}
              onDelete={onDelete}
            />
          ))}
      </div>
    </div>
  );
}

export default PhotoWall;
