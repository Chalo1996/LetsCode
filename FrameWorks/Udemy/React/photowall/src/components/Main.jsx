import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Title from "./Title";
import PhotoWall from "./PhotoWall";
import AddPhoto from "./AddPhoto";
import { removePost, addComment } from "../redux/actions";
import Single from "./Single";

function Main({ posts, comments }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(removePost(id));
  };

  const handleAddComment = (comment, postId) => {
    dispatch(addComment(comment, postId));
  };

  return (
    <>
      <Title />
      <Routes>
        <Route
          path='/'
          element={
            <PhotoWall
              comments={comments}
              posts={posts}
              onDelete={handleDelete}
            />
          }
        />
        <Route path='/AddPhoto' element={<AddPhoto />} />
        <Route
          path='/single/:id'
          element={
            <Single
              posts={posts}
              comments={comments}
              onAddComment={handleAddComment}
              onDelete={handleDelete}
            />
          }
        />
      </Routes>
    </>
  );
}

export default Main;
