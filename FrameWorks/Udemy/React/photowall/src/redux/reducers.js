import { combineReducers } from "redux";
import data from "../assets/data";

const postReducer = (state = data, action) => {
  switch (action.type) {
    case "REMOVE_POST":
      return state.filter((post) => post.id !== action.id);
    // return [...state.slice(0, action.id), ...state.slice(action.id + 1)]; // Other way

    case "ADD_POST":
      return [...state, action.post];

    default:
      return state;
  }
};

const commentReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_COMMENT":
      if (!state[action.postId]) {
        return {
          ...state,
          [action.postId]: [action.comment],
        };
      } else {
        // console.log("Comments", state);
        return {
          ...state,
          [action.postId]: [...state[action.postId], action.comment],
        };
      }

    default:
      return state;
  }
};

const rootReducer = combineReducers({ postReducer, commentReducer });

export default rootReducer;
