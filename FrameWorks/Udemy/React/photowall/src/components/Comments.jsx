import React from "react";

function Comments({ comments, id, onAddComment }) {
  const handleSumbit = (comment, postId) => {
    onAddComment(comment, postId);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const comment = e.target.elements.comment.value;
    const postId = id;

    if (comment) {
      handleSumbit(comment, postId);
      e.target.elements.comment.value = "";
    } else {
      return;
    }
  };

  const commentsArr = comments || [];

  return (
    <div className='comment'>
      {commentsArr.map((comment, index) => (
        <p style={{ color: "black" }} key={index}>
          {comment}
        </p>
      ))}
      <form className='comment-form' onSubmit={onSubmit}>
        <input type='text' placeholder='comment' name='comment' />
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
}

export default Comments;
