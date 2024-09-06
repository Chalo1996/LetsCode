import { connect } from "react-redux";
import Main from "./Main";

const mapStateToProps = (state) => {
  return {
    posts: state.postReducer,
    comments: state.commentReducer,
  };
};

export const Index = connect(mapStateToProps)(Main);
