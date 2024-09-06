import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../db/config";

export const addPostToDB = (post) => {
  return async (dispatch) => {
    try {
      const postRef = doc(db, "posts", post.id.toString());
      await setDoc(postRef, post);
      console.log("Post added to the database");
      dispatch(addPost(post));
    } catch (error) {
      console.error("Error adding post to database: ", error);
    }
  };
};

export const uploadImageToStorage = (file) => {
  return async (dispatch) => {
    try {
      const storageRef = ref(storage, `images/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image to storage: ", error);
      throw error;
    }
  };
};

// Remove action
export const removePost = (id) => {
  return {
    type: "REMOVE_POST",
    id,
  };
};

// Add action
export const addPost = (post) => {
  return {
    type: "ADD_POST",
    post,
  };
};

// Add comment
export const addComment = (comment, postId) => {
  return {
    type: "ADD_COMMENT",
    comment,
    postId,
  };
};
